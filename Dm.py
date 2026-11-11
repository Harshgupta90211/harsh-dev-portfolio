import fitz, os

src = "/mnt/data/FINAL_Gupta_Electricals_Digital_Marketing_Assignment.pdf"
out = "/mnt/data/Gupta_Electricals_Assignment_Dummy_Details_High_Quality.pdf"

doc = fitz.open(src)

def cover_text(page, rect, text, fontsize=9.5, color=(0.12, 0.18, 0.25)):
    # Cover only the old text, then add sharp, selectable vector text.
    page.draw_rect(fitz.Rect(rect), color=None, fill=(1, 1, 1), overlay=True)
    page.insert_textbox(fitz.Rect(rect), text, fontname="helv", fontsize=fontsize,
                        color=color, align=0, overlay=True)

# Cover page: use clearly labelled hypothetical details rather than claiming unknown facts.
p = doc[0]
cover_text(p, (155, 399, 345, 414), "B.Tech CSE — Semester 3, Section A", 9)
cover_text(p, (155, 444, 350, 461), "Ramghat Road, Aligarh, Uttar Pradesh", 9)
cover_text(p, (49, 516, 545, 550),
           "Case-study note: The business details in this assignment are hypothetical examples created for an academic case study. "
           "They should not be treated as verified facts about a real shop.", 8.5)

# Page 2: update the business details table to consistent dummy details.
p = doc[1]
cover_text(p, (255, 198, 475, 223),
           "Electrical goods, LED bulbs, switches, wires, fans and small electrical appliances.", 8.4)
cover_text(p, (255, 240, 490, 257),
           "Ramghat Road, Aligarh, Uttar Pradesh.", 8.5)
cover_text(p, (255, 257, 495, 281),
           "Assumed to have limited online presence for this case study.", 8.4)
cover_text(p, (255, 282, 500, 307),
           "Households, electricians, local contractors and small businesses.", 8.4)
cover_text(p, (255, 308, 490, 325),
           "Assumed limited budget; begin with free tools and low-cost content.", 8.2)

# Replace the intro paragraphs that described unknown details as needing confirmation.
cover_text(p, (50, 69, 545, 107),
           "For this assignment, I have prepared a hypothetical digital marketing plan for Gupta Electricals, a local electrical shop. "
           "For the purpose of this case study, I assume that it sells electrical goods and a few small appliances, and that its online "
           "presence is limited. These assumptions help me show how basic digital marketing could support a local business.", 9.2)
cover_text(p, (50, 109, 545, 145),
           "The shop location, customer groups, products and budget used in this plan are sample details for an academic exercise, not "
           "verified business information. The strategies and evaluation methods can be adapted if real information becomes available.", 9.2)

# Page 3: clearly mark audience descriptions as assumed case-study segments.
p = doc[2]
cover_text(p, (50, 69, 545, 105),
           "For this hypothetical case study, I have selected a few likely customer groups for a local electrical shop. "
           "These are assumed audience segments used to demonstrate how a campaign could be planned.", 9.2)

# Last page: replace evidence instructions that assume real shop access with sample evidence guidance.
p = doc[9]
# Use the original page text blocks to find and cover the final pre-submission note.
for b in p.get_text("blocks"):
    txt = b[4]
    if "Before submission:" in txt:
        rect = fitz.Rect(b[0]-1, b[1]-1, b[2]+2, b[3]+2)
        p.draw_rect(rect, color=None, fill=(1, 1, 1), overlay=True)
        p.insert_textbox(rect,
            "Before submission: Keep the case-study details labelled as assumptions. If required, include clearly labelled sample "
            "screenshots/mock-ups rather than presenting invented data as real. Add your semester and section if your teacher requires them.",
            fontname="helv", fontsize=8.3, color=(0.12, 0.18, 0.25), overlay=True)

# Keep the PDF crisp and selectable; text remains vector text, not page screenshots.
doc.set_metadata({
    "title": "Digital Marketing Assignment - Gupta Electricals (Hypothetical Case Study)",
    "author": "Harsh Kumar",
    "subject": "Track B - Local Business / Hyper-local Strategy"
})
doc.save(out, garbage=4, deflate=True)
doc.close()

# Verify the output exists, page count, and key dummy details.
check = fitz.open(out)
page_count = len(check)
extracted = "\n".join(page.get_text() for page in check)
check.close()
print(f"Created: {out}")
print(f"Pages: {page_count}")
print("Contains dummy location:", "Ramghat Road, Aligarh, Uttar Pradesh" in extracted)
print("Contains case-study note:", "hypothetical" in extracted.lower())
