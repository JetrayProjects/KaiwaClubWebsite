# Chatbot Knowledge Base - Editing Guide

This guide explains how club members can update the chatbot's responses without any coding knowledge.

## 📍 Location

The chatbot's knowledge is stored in:
```
/public/chatbot-knowledge.json
```

## 🎯 How to Edit

### Step 1: Open the File
Navigate to `public/chatbot-knowledge.json` in your code editor or GitHub.

### Step 2: Understand the Structure

The file contains **responses** (what the bot knows) and **default responses** (fallback messages).

Each response has:
- **`id`**: A unique identifier (don't change this)
- **`keywords`**: Words that trigger this response (both English and Japanese)
- **`answer_en`**: The English response
- **`answer_ja`**: The Japanese response

### Step 3: Edit Existing Responses

**Example: Updating the schedule**

Find the schedule response:
```json
{
  "id": "schedule",
  "keywords": ["schedule", "next session", "class", "meeting", "when", "スケジュール", "次の会", "いつ", "授業"],
  "answer_en": "The next session is this Friday at 5 PM in the Student Center.",
  "answer_ja": "次の会は今週の金曜日、午後5時に学生センターで行われます。"
}
```

**To change the meeting time**, simply edit the text:
```json
"answer_en": "The next session is this Tuesday at 6 PM in Room 301.",
"answer_ja": "次の会は今週の火曜日、午後6時に301号室で行われます。"
```

### Step 4: Add New Topics

To add a completely new topic, copy this template and add it to the `responses` array:

```json
{
  "id": "your-topic-id",
  "keywords": ["keyword1", "keyword2", "キーワード1"],
  "answer_en": "Your English answer here.",
  "answer_ja": "日本語の回答をここに入力。"
}
```

**Example: Adding information about dues**

```json
{
  "id": "dues",
  "keywords": ["dues", "fee", "cost", "price", "会費", "料金"],
  "answer_en": "Club membership is $10 per semester. Pay at any meeting!",
  "answer_ja": "クラブの会費は学期ごとに10ドルです。どの会でも支払えます！"
}
```

**Important**: Add a comma after the previous response:
```json
{
  "id": "about",
  ...
}, // ← Don't forget this comma!
{
  "id": "dues",
  ...
}
```

### Step 5: Save and Test

1. **Save the file**
2. **Refresh the website** (the chatbot loads this file on page load)
3. **Test by asking** the chatbot your question

## 🔍 Tips

### Adding Keywords
- Add **variations** of how people might ask (e.g., "when", "schedule", "next meeting")
- Include **both English and Japanese** keywords
- Use **lowercase** for consistency

### Writing Good Responses
- Keep answers **short and clear** (1-2 sentences)
- Include **specific details** (times, locations, links)
- Make sure **both languages say the same thing**

### Common Mistakes to Avoid
❌ **Forgetting commas** between responses  
❌ **Using smart quotes** (`"` instead of `"`)  
❌ **Breaking the JSON structure** (use a JSON validator if unsure)

## 🛠️ JSON Validation

Before saving, you can validate your JSON at:
- https://jsonlint.com/
- Copy/paste your entire file and click "Validate JSON"

## 📝 Example: Full Edit

**Before:**
```json
{
  "id": "schedule",
  "keywords": ["schedule", "next session"],
  "answer_en": "The next session is Friday at 5 PM.",
  "answer_ja": "次の会は金曜日の午後5時です。"
}
```

**After (updated time and added keywords):**
```json
{
  "id": "schedule",
  "keywords": ["schedule", "next session", "when is the meeting", "スケジュール", "次の会", "いつ"],
  "answer_en": "The next session is Tuesday at 6 PM in the Student Center, Room 204.",
  "answer_ja": "次の会は火曜日の午後6時、学生センター204号室です。"
}
```

## 🆘 Need Help?

If you break something:
1. Check the browser console for errors (F12 → Console tab)
2. Use a JSON validator to find syntax errors
3. Contact the web team at [your-email@university.edu]

## 🌐 Language Switching

Users can switch between English and Japanese by clicking the 🌐 button in the top-right of the chatbot.

The chatbot will:
- Recognize speech in the selected language
- Respond in the selected language
- Speak the answer out loud

---

**Last Updated:** February 2026
