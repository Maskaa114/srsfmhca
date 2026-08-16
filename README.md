# SRSFMHCA Performance Portal — Simple Setup Guide

This website has 3 pages:
- **index.html** — Login page (everyone starts here)
- **head-dashboard.html** — Department heads submit reports here
- **manager-dashboard.html** — Manager sees all reports and an automatic chart here

Report files (Word/Excel/PDF) are kept in **Google Drive** (free), and the department
head just pastes the Drive link into the website. This keeps the whole project free —
Firebase file storage requires a paid plan, so we don't use it.

You only need to **copy and paste**. Follow the steps below, in order.

---

## PART 1 — Create your free Firebase account (this stores logins, data, and files)

1. Go to https://console.firebase.google.com
2. Click **"Add project"**.
3. Type a name, for example `srsfmhca-portal`. Click **Continue**, then **Create project**.
4. When it is ready, click **Continue**.

### 1a. Turn on Login
1. On the left menu, click **Build > Authentication**.
2. Click **Get started**.
3. Click **Email/Password**, turn the first switch **ON**, click **Save**.

### 1b. Turn on the Database
1. On the left menu, click **Build > Firestore Database**.
2. Click **Create database**.
3. Choose **Start in production mode**. Click **Next**, pick the location closest to you, click **Enable**.

### 1c. Get your website keys
1. Click the ⚙️ gear icon (top left) > **Project settings**.
2. Scroll down to **"Your apps"**. Click the **</> (Web)** icon.
3. Type a nickname, e.g. `portal-web`. Click **Register app**.
4. You will see a box of code with `firebaseConfig = { ... }`. Keep this page open.

---

## PART 2 — Put your keys into the website files

1. Open the file **firebase-init.js** (in this folder).
2. Find these 6 lines near the top:
   ```
   apiKey: "PASTE_YOUR_API_KEY_HERE",
   authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
   projectId: "PASTE_YOUR_PROJECT_ID_HERE",
   storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
   messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE",
   appId: "PASTE_YOUR_APP_ID_HERE"
   ```
3. Go back to the Firebase page from Part 1c. Copy each value and paste it in the matching spot above. Keep the quotation marks `" "`.
4. Save the file.

---

## PART 3 — Set the security rules (copy-paste, 1 minute)

1. In Firebase, go to **Firestore Database > Rules** tab.
2. Delete everything there. Open the file **firestore.rules** in this folder, copy everything, paste it in. Click **Publish**.

---

## PART 4 — Create the Manager account (you)

1. In Firebase, go to **Authentication > Users** tab.
2. Click **Add user**. Type your email and a password. Click **Add user**.
3. A new row appears with a long code under **User UID**. Click it to copy it.
4. Go to **Firestore Database > Data** tab. Click **Start collection**.
5. Collection ID: type `users`. Click **Next**.
6. Document ID: paste the **User UID** you copied.
7. Add these fields (click **Add field** for each one):
   | Field | Type | Value |
   |---|---|---|
   | role | string | manager |
   | name | string | (your name) |
8. Click **Save**.

You (the manager) can now log in on the website with that email and password.

---

## PART 5 — Create a Department Head account (repeat for every department)

1. **Authentication > Users > Add user.** Type their email + a password you choose for them. Tell them this password.
2. Copy their **User UID**.
3. **Firestore Database > Data > `users` collection > Add document.**
4. Document ID: paste their UID.
5. Add these fields:
   | Field | Type | Value |
   |---|---|---|
   | role | string | head |
   | name | string | (their name) |
   | department | string | (their department name) |
6. Click **Save**.

Repeat this for every head of department. Give each one their email + password.

---

## PART 6 — Put the website on GitHub

1. Go to https://github.com and log in.
2. Click **+ (top right) > New repository**. Name it `srsfmhca-portal`. Click **Create repository**.
3. On the next page, click **uploading an existing file**.
4. Drag all the files from this folder into the browser window (index.html, head-dashboard.html, manager-dashboard.html, firebase-init.js, style.css, vercel.json, firestore.rules, README.md).
5. Scroll down, click **Commit changes**.

---

## PART 7 — Put it online with Vercel

1. Go to https://vercel.com and log in (choose **Continue with GitHub**).
2. Click **Add New... > Project**.
3. Find `srsfmhca-portal` in the list, click **Import**.
4. Leave all settings as they are. Click **Deploy**.
5. Wait about 1 minute. You will get a working link like `srsfmhca-portal.vercel.app`. Open it and test the login.

---

## PART 8 — Connect your own domain (srsfmhca.org.et)

1. In Vercel, open your project, click the **Settings** tab, then **Domains**.
2. Type `srsfmhca.org.et`, click **Add**.
3. Vercel shows you 1 or 2 DNS records (an **A record** and/or **CNAME**).
4. Go to the place where you bought/manage the domain `srsfmhca.org.et` (your domain provider's website). Find **DNS settings**.
5. Add the exact records Vercel showed you.
6. Go back to Vercel and wait — it will show a green check when it is connected. This can take from a few minutes up to 24 hours.

---

## How to use the website day-to-day

- **Department head:** uploads their Word/Excel/PDF file to Google Drive, sets sharing to "Anyone with the link can view", copies the link. Then opens the site, logs in, types Target and Actual numbers, picks the date, pastes the Drive link, clicks **Submit report**.
- **Manager:** opens the site, logs in, sees a bar chart of every department's % automatically, and a table of every report with a link to open each file.
- The **percentage (%) is calculated automatically** as `Actual ÷ Target × 100`. Nobody has to calculate it by hand.
- Green bar/pill = 90% or more. Orange = 60–89%. Red = below 60%.

## If something goes wrong

- **"Sign in failed"** → check the email/password was typed correctly, or check that user exists in Firebase Authentication.
- **"Your account has no role yet"** → you (manager) forgot to add the `users/{UID}` document in Part 4 or 5.
- **"Please paste a valid Google Drive link"** → make sure the link starts with `http`, and sharing is set to "Anyone with the link can view".
- **Chart is empty** → no reports submitted yet, or all heads are missing the `department` field.
