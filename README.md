# 🚀 Baileys-Elite ⚡

<div align="center">
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
  ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
  
  <img src="https://raw.githubusercontent.com/shizothetechie/database/refs/heads/main/image/shizo.png" width="400px">
  
  *The enhanced TypeScript/JavaScript WhatsApp Web API*
</div>

---

## 📌 Important Note

> ⚠️ The original repository was initially removed by its creator and subsequently taken over by [WhiskeySockets](https://github.com/WhiskeySockets). Building upon this foundation, I have implemented several enhancements and introduced new features that were not present in the original repository. These improvements aim to elevate functionality and empower the open source codes and versatile experience.

---

## 📦 Installation

### 📄 In package.json:
```json
"dependencies": {
    "baileys-elite": "*"
}
```

### 💻 Or via terminal:
```bash
npm install baileys-elite
```

### 🔗 Import in your code:
```typescript
// ESM
import makeWASocket from 'baileys-elite'
```

```javascript
// CommonJS
const { default: makeWASocket } = require("baileys-elite")
```

---

## ✨ Enhanced Features

<table>
  <tr>
    <td>🔊 <b>Channel Messaging</b></td>
    <td>Send messages to WhatsApp channels</td>
  </tr>
  <tr>
    <td>🎛️ <b>Interactive Messages</b></td>
    <td>Create button-based and interactive messages</td>
  </tr>
  <tr>
    <td>🤖 <b>AI Message Icon</b></td>
    <td>Customizable AI icon for messages</td>
  </tr>
  <tr>
    <td>🖼️ <b>Enhanced Profile Pictures</b></td>
    <td>Upload profile pictures without cropping</td>
  </tr>
  <tr>
    <td>🔐 <b>Custom Pairing Code</b></td>
    <td>Create personalized pairing codes for device connection</td>
  </tr>
  <tr>
    <td>🔧 <b>Libsignal Improvements</b></td>
    <td>Cleaner logs and optimized output</td>
  </tr>
</table>

---

## 💡 Feature Examples

### 📰 NEWSLETTER FUNCTIONS

<details>
<summary><b>Click to expand Newsletter features</b></summary>

#### 📊 Get Newsletter Info
```typescript
// By invite
const metadata = await sock.newsletterMetadata("invite", "xxxxx")
// By JID
const metadata = await sock.newsletterMetadata("jid", "abcd@newsletter")
console.log(metadata)
```

#### 📝 Update Newsletter Description
```typescript
await sock.newsletterUpdateDescription("abcd@newsletter", "New Description")
```

#### ✏️ Update Newsletter Name
```typescript
await sock.newsletterUpdateName("abcd@newsletter", "New Name")
```

#### 🖼️ Update Newsletter Picture
```typescript
await sock.newsletterUpdatePicture("abcd@newsletter", buffer)
```

#### 🗑️ Remove Newsletter Picture
```typescript
await sock.newsletterRemovePicture("abcd@newsletter")
```

#### 🔔 Newsletter Notifications
```typescript
// Unmute
await sock.newsletterUnmute("abcd@newsletter")
// Mute
await sock.newsletterMute("abcd@newsletter")
```

#### 🆕 Create Newsletter
```typescript
const metadata = await sock.newsletterCreate("Newsletter Name", "Newsletter Description")
console.log(metadata)
```

#### 🗑️ Delete Newsletter
```typescript
await sock.newsletterDelete("abcd@newsletter")
```

#### 👥 Follow/Unfollow Newsletter
```typescript
// Follow
await sock.newsletterFollow("abcd@newsletter")
// Unfollow
await sock.newsletterUnfollow("abcd@newsletter")
```

#### 😀 Send Reaction
```typescript
// Format: JID, message ID & emoticon
// Get ID from message URL: https://whatsapp.com/channel/xxxxx/175
const id = "175"
await sock.newsletterReactMessage("abcd@newsletter", id, "🥳")
```
</details>

### 🎛️ BUTTON & INTERACTIVE MESSAGES

<details>
<summary><b>Click to expand Button & Interactive features</b></summary>

#### 📝 Send Button with Text
```typescript
const buttons = [
  { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
  { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    text: "Hi it's button message",
    footer: 'Hello World',
    buttons,
    headerType: 1,
    viewOnce: true
}

await sock.sendMessage(id, buttonMessage, { quoted: null })
```

#### 🖼️ Send Button with Image
```typescript
const buttons = [
  { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
  { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    image: { url: "https://example.com/abcd.jpg" }, // image: buffer or path
    caption: "Hi it's button message with image",
    footer: 'Hello World',
    buttons,
    headerType: 1,
    viewOnce: true
}

await sock.sendMessage(id, buttonMessage, { quoted: null })
```

#### 🎬 Send Button with Video
```typescript
const buttons = [
  { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
  { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    video: { url: "https://example.com/abcd.mp4" }, // video: buffer or path
    caption: "Hi it's button message with video",
    footer: 'Hello World',
    buttons,
    headerType: 1,
    viewOnce: true
}

await sock.sendMessage(id, buttonMessage, { quoted: null })
```

#### 🔄 Send Interactive Message
```typescript
const interactiveButtons = [
     {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
             display_text: "Quick Reply",
             id: "ID"
        })
     },
     {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
             display_text: "Tap Here!",
             url: "https://www.example.com/"
        })
     },
     {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
             display_text: "Copy Code",
             id: "12345",
             copy_code: "12345"
        })
     }
]

const interactiveMessage = {
    text: "Hello World!",
    title: "this is the title",
    footer: "this is the footer",
    interactiveButtons
}

await sock.sendMessage(id, interactiveMessage, { quoted: null })
```

#### 🖼️ Send Interactive Message with Image
```typescript
const interactiveButtons = [
     {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
             display_text: "Quick Reply",
             id: "ID"
        })
     },
     {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
             display_text: "Tap Here!",
             url: "https://www.example.com/"
        })
     },
     {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
             display_text: "Copy Code",
             id: "12345",
             copy_code: "12345"
        })
     }
]

const interactiveMessage = {
    image: { url: "https://example.com/abcd.jpg" }, // image: buffer or path
    caption: "this is the caption",
    title: "this is the title",
    footer: "this is the footer",
    interactiveButtons
}

await sock.sendMessage(id, interactiveMessage, { quoted: null })
```

#### 🎬 Send Interactive Message with Video
```typescript
const interactiveButtons = [
     {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
             display_text: "Quick Reply",
             id: "ID"
        })
     },
     {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
             display_text: "Tap Here!",
             url: "https://www.example.com/"
        })
     },
     {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
             display_text: "Copy Code",
             id: "12345",
             copy_code: "12345"
        })
     }
]

const interactiveMessage = {
    video: { url: "https://example.com/abcd.mp4" }, // video: buffer or path
    caption: "this is the caption",
    title: "this is the title",
    footer: "this is the footer",
    interactiveButtons
}

await sock.sendMessage(id, interactiveMessage, { quoted: null })
```
</details>

### 🤖 AI ICON

```typescript
// Just add "ai: true" to sendMessage
await sock.sendMessage(id, { text: "Hello World", ai: true })
```

### 🔐 CUSTOM CODE PAIRING

```typescript
if(usePairingCode && !sock.authState.creds.registered) {
    const phoneNumber = await question('Please enter your mobile phone number:\n')
    const custom = "SH1Z0D3V" // must be 8 digits, can be letters or numbers
    const code = await sock.requestPairingCode(phoneNumber, custom)
    console.log(`Pairing code: ${code?.match(/.{1,4}/g)?.join('-') || code}`)
}
```

---

## 🐛 Reporting Issues

If you encounter any issues while using this repository, please feel free to open a [new issue](https://github.com/shizo-devs/baileys/issues).

---

## 📝 Notes

Everything other than the modifications mentioned above remains the same as the original repository. You can check out the original repository at [WhiskeySockets](https://github.com/WhiskeySockets/Baileys).

---

<div align="center">
  
  ⭐ **Star this repository if you find it useful!** ⭐
  
  <i>Powered by Baileys-Elite - Enhancing your WhatsApp development experience</i>
</div>
