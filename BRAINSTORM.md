# 💜 MisMatch — App Brainstorm & Architecture

> *"Where differences spark connections."*

The name says it all — MisMatch flips the dating script. Instead of obsessing over perfect compatibility, it celebrates the beauty of contrast. Opposites attract, and MisMatch helps people discover unexpected connections they'd never find on their own.

---

## 1. App Philosophy & Identity

| Aspect | Detail |
|---|---|
| **Name** | MisMatch |
| **Tagline** | *"Where differences spark connections"* |
| **Core Idea** | Match people based on complementary interests, not identical ones. A bookworm meets an adventurer. A chef meets someone who can't boil water. |
| **Tone** | Playful, warm, slightly cheeky — never corporate |
| **Visual Identity** | Pastel minimalist — soft lavenders, blush pinks, mint greens, warm peach. Rounded shapes, generous whitespace, subtle motion. |

---

## 2. User Profile — Data Model

### 2.1 Core Info
| Field | Type | Notes |
|---|---|---|
| `name` | string | Display name |
| `age` | number | Derived from DOB |
| `dob` | date | For age calc + astrology |
| `gender` | enum | Male / Female / Non-binary / Prefer not to say |
| `height` | number (cm) | With visual slider |
| `weight` | number (kg) | Optional, with visual slider |
| `location` | geo + string | GPS coords + area name (e.g. "Anna Nagar, Chennai") |
| `religion` | string | Dropdown with common options + "Other" |
| `qualification` | string | Highest education |
| `jobTitle` | string | Current role |
| `company` | string | Optional |
| `bio` | text | Max 300 chars — punchy self-description |

### 2.2 Personality & Interests
| Field | Type | Notes |
|---|---|---|
| `hobbies` | string[] | Tag-based picker (e.g. "Cooking", "Hiking", "Gaming") |
| `interests` | string[] | Broader categories (e.g. "Tech", "Art", "Fitness") |
| `musicTaste` | string[] | Genre tags |
| `foodPreference` | enum | Veg / Non-veg / Vegan / Eggetarian |
| `drinkingHabit` | enum | Never / Socially / Regularly |
| `smokingHabit` | enum | Never / Socially / Regularly |
| `petPreference` | enum | Dogs / Cats / Both / None / Allergic |
| `languages` | string[] | Languages spoken |
| `loveLanguage` | enum | Words of Affirmation / Acts of Service / Gifts / Quality Time / Physical Touch |

### 2.3 Astrology
| Field | Type | Notes |
|---|---|---|
| `sunSign` | enum | Auto-calculated from DOB |
| `moonSign` | string | Optional manual input |
| `risingSign` | string | Optional manual input |
| `chineseZodiac` | enum | Auto-calculated from birth year |
| `compatibilityNotes` | generated | AI-generated blurb about sign traits |

### 2.4 Media
| Field | Type | Notes |
|---|---|---|
| `photos` | url[] | Min 1, Max 6. First = profile pic |
| `videos` | url[] | Max 2, 15-sec clips |
| `posts` | Post[] | Instagram-style posts on profile |
| `prompts` | PromptAnswer[] | Hinge-style prompt answers (see §5.3) |

---

## 3. Full Feature Breakdown

### 3.1 Authentication & Onboarding
- **Phone/Email login** — OTP-based, no passwords
- **Google / Apple social login** — one-tap signup
- **Progressive onboarding** — not a wall of forms; collect info across 5-6 fun, animated screens:
  1. Name + DOB + Gender
  2. Photos (min 1)
  3. Location permission
  4. Interests picker (visual tag cloud)
  5. Bio + Prompts
  6. Astrology reveal (auto-calculated, fun animation)
- **Skip & complete later** — let users get in fast, nudge them to complete profile later

### 3.2 Matchmaking Engine
- **Interest-based matching** — weighted scoring on shared + complementary interests
- **"MisMatch Score"** — a fun 0–100 score showing how *different* yet *compatible* two people are. High mismatch + high compatibility = 🔥
- **Location-based filtering** — radius slider (1km – 100km)
- **Astrology compatibility** — zodiac sign matching as a bonus signal
- **Daily picks** — curated 5-10 profiles per day (creates scarcity, reduces swipe fatigue)
- **Swipe mechanics**:
  - ➡️ Right = Like
  - ⬅️ Left = Pass
  - ⬆️ Up = Super Like (limited daily)
  - ⬇️ Down = "Maybe Later" (saves to a revisit queue)
- **Mutual match** — when both like each other, unlock chat with a fun confetti animation
- **Filters**: Age range, distance, religion, height, interests, education

### 3.3 Communication
- **1:1 Chat** — unlocked after mutual match
  - Text messages
  - Photo/video sharing
  - Voice notes 🎤
  - GIF picker
  - Emoji reactions on messages
  - "Typing..." indicator
  - Read receipts (toggleable)
  - Unsend message (within 5 min)
- **Icebreaker prompts** — when a chat opens, suggest conversation starters based on shared/different interests
- **Video call** — in-app video calling (optional, post-trust building)
- **"Vibe Check"** — a 3-minute timed video call for quick first impressions

### 3.4 AI Chatbot — "Cupid"
- **Recommendation engine** — "Hey Cupid, find me someone who loves cooking but hates hiking"
- **Date idea generator** — "Suggest a date spot in Anna Nagar for a foodie and a fitness freak"
- **Profile review** — "How can I make my profile more attractive?"
- **Conversation coach** — "What should I say next?" (contextual suggestions)
- **Astrology insights** — "Are Scorpio and Leo compatible?"
- **Mood-based matching** — "I'm feeling adventurous today, find me someone wild"

### 3.5 Profile & Posts
- **Own Profile**:
  - Edit all fields
  - Add/remove photos & videos
  - Write/edit bio
  - Add/edit prompt answers
  - Create posts (photo + caption, like Instagram stories for your profile)
  - View who liked you (premium feature?)
  - Astrology section at the bottom
  - Logout
- **Other's Profile**:
  - Photo carousel with swipe
  - Bio + prompts
  - Interest tags (highlighted: shared vs different)
  - MisMatch Score badge
  - Astrology section with compatibility note
  - Like / Pass / Super Like buttons

### 3.6 Location Features
- **Nearby mode** — see who's within walking distance
- **Area-based browse** — filter by neighborhoods/areas
- **"Crossed Paths"** — show people you've been geographically near (opt-in, privacy-first)
- **Travel mode** — set your location to a different city before you visit

### 3.7 Out-of-the-Box Features 🚀

| Feature | Description |
|---|---|
| **"MisMatch of the Day"** | Daily curated match with a fun explanation of WHY you're mismatched but might click |
| **Blind Date Mode** | Photos are blurred for the first 24 hours. Personality first, looks second. |
| **Interest Swap** | "Try their hobby for a week" challenge after matching — gamifies early connection |
| **Vibe Playlists** | Each profile has a mini Spotify-style playlist representing their vibe |
| **Dealbreaker Flags** | Transparent, upfront dealbreaker tags (wants kids / doesn't, etc.) |
| **"Two Truths & a Lie"** | Interactive profile game — visitors guess which is the lie |
| **Voice Intro** | 10-second voice clip on profile — hear their vibe before matching |
| **Safety Score** | Profiles verified via selfie + ID get a trust badge |
| **Friendship Mode** | Toggle to find friends, not dates — same engine, different intent |
| **Weekly Compatibility Report** | AI-generated newsletter about your matching patterns and tips |
| **"Reverse Match"** | See profiles that are the *most different* from you — embrace the chaos |
| **Date Countdown** | Once you plan a date, a shared countdown timer builds anticipation |

---

## 4. User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        ENTRY POINTS                         │
│                                                             │
│   Fresh Install ──► Splash Screen ──► Login/Signup          │
│   Returning User ──► Splash ──► Auto-login ──► Dashboard   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   LOGIN     │
                    │  Phone/OTP  │
                    │  Google SSO │
                    └──────┬──────┘
                           │
              ┌────────────▼────────────┐
              │      ONBOARDING         │
              │  (Progressive, 6 steps) │
              │                         │
              │  1. Name + DOB + Gender │
              │  2. Photos              │
              │  3. Location            │
              │  4. Interests           │
              │  5. Bio + Prompts       │
              │  6. Astrology Reveal ✨ │
              └────────────┬────────────┘
                           │
                    ┌──────▼──────┐
                    │  DASHBOARD  │
                    │  (Home)     │
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐       ┌───▼────┐
    │ DISCOVER │      │  CHATS  │       │PROFILE │
    │ (Swipe)  │      │  List   │       │ (Own)  │
    └────┬────┘      └────┬────┘       └───┬────┘
         │                │                │
    ┌────▼────┐      ┌────▼────┐      ┌───▼─────┐
    │ Profile │      │ 1:1 Chat│      │ Edit    │
    │ Detail  │      │ + Cupid │      │ Posts   │
    └─────────┘      └─────────┘      │ Settings│
                                      └─────────┘
```

### Gesture Map (Mobile-First)
| Gesture | Action |
|---|---|
| Swipe Right | Like |
| Swipe Left | Pass |
| Swipe Up | Super Like |
| Swipe Down | Maybe Later |
| Tap photo | Expand carousel |
| Long press message | React / Reply / Unsend |
| Pull down | Refresh feed |
| Double tap photo | Like photo |

---

## 5. Screen-by-Screen Breakdown

### 5.1 Splash Screen
- App logo with a gentle pulse animation
- Pastel gradient background (lavender → blush)
- Auto-redirect after 2s

### 5.2 Login Page
- Phone number input with country code picker
- OTP input (4/6 digit with auto-focus)
- "Continue with Google" button
- "Continue with Apple" button
- Minimal — just the logo, a warm greeting, and the inputs
- Subtle floating heart/spark particles in background

### 5.3 Onboarding (6 screens, progress bar at top)
- Each screen: one task, big visuals, animated transitions
- Skip option on non-critical screens
- Celebration animation at the end (confetti + "You're In! 🎉")

### 5.4 Dashboard / Discover (Main screen)
- **Card stack** — profile cards stacked with a depth effect
- Each card shows: Photo, Name, Age, Area, MisMatch Score
- Tap card to expand full profile
- Action buttons at bottom: ❌ Pass | ⭐ Super Like | 💜 Like
- Top bar: Filter icon (left), App logo (center), Notification bell (right)

### 5.5 Profile Detail (Other Person)
- Scrollable full profile:
  - Photo/video carousel (full-width, swipeable)
  - Name, Age, Location badge
  - MisMatch Score with visual meter
  - Bio section
  - Prompt answers (styled cards)
  - Interest tags (color-coded: 🟢 shared, 🟣 different)
  - Basic info grid (height, religion, education, job)
  - Astrology section (sun sign, compatibility note, zodiac illustration)
- Sticky bottom bar: Pass | Super Like | Like

### 5.6 Own Profile
- Profile header: photo + name + edit button
- Stats row: Likes received | Matches | Profile views
- **Sections:**
  - My Photos & Videos (grid, tap to manage)
  - My Posts (Instagram-style feed)
  - About Me (bio, prompts)
  - My Interests (tag cloud)
  - My Info (editable fields)
  - Astrology (sun sign card, traits)
  - Settings & Preferences
  - Logout button

### 5.7 Chat List
- Search bar at top
- Sections:
  - **New Matches** — horizontal scrollable avatars (with "New" badge)
  - **Conversations** — vertical list, sorted by recency
    - Avatar | Name | Last message preview | Timestamp | Unread badge
- Cupid AI chatbot pinned at top of conversations

### 5.8 Chat Detail (1:1)
- Top bar: Back arrow, avatar + name + online status, video call icon
- **Icebreaker banner** (first time only): "You both love [X] but disagree on [Y] — talk about it!"
- Message bubbles (soft rounded, pastel-colored)
- Input bar: Text input | 📎 Attach | 🎤 Voice | GIF | Send
- Long-press message: React (emoji row) | Reply | Copy | Unsend

### 5.9 AI Chatbot — "Cupid"
- Chat interface styled differently (sparkle theme, gold accents)
- Suggested prompt chips: "Find me a match" | "Date ideas" | "Review my profile" | "Astrology check"
- Conversational AI responses with personality
- Can deep-link to profiles, settings, or features

### 5.10 Navigation Bar (Bottom)
| Icon | Label | Screen |
|---|---|---|
| 🏠 | Home | Dashboard / Discover |
| 💬 | Chat | Chat List |
| 🤖 | Cupid | AI Chatbot |
| 👤 | Profile | Own Profile |

- Floating, rounded corners, slight blur backdrop
- Active state: filled icon + pastel highlight
- Subtle haptic feedback on tap

---

## 6. Tech Stack

### Frontend
| Layer | Tech | Rationale |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Already initialized, SSR + API routes |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS | Rapid prototyping, mobile-first utilities |
| **Animations** | Framer Motion | Gesture support (swipe!), spring physics, layout animations |
| **State** | Zustand | Lightweight, no boilerplate |
| **Forms** | React Hook Form + Zod | Validation for onboarding & profile edit |
| **Icons** | Lucide React | Clean, consistent icon set |
| **Font** | Google Fonts — "Plus Jakarta Sans" | Modern, rounded, friendly — fits pastel aesthetic |

### Backend (Future / API Routes for now)
| Layer | Tech | Rationale |
|---|---|---|
| **API** | Next.js API Routes (initially) | Quick start, co-located with frontend |
| **Database** | Supabase (PostgreSQL + Realtime) | Auth, DB, realtime subscriptions, storage — all-in-one |
| **Auth** | Supabase Auth (or NextAuth) | OTP, Google, Apple sign-in |
| **File Storage** | Supabase Storage / Cloudinary | Photo/video uploads with transformations |
| **Realtime Chat** | Supabase Realtime / Socket.io | Live messaging |
| **AI Chatbot** | Gemini API | Conversational AI for "Cupid" |
| **Geolocation** | Browser Geolocation API + PostGIS | Location-based queries |
| **Push Notifications** | Web Push API / FCM | Match alerts, messages |

### DevOps (Future)
| Layer | Tech |
|---|---|
| **Hosting** | Vercel |
| **CI/CD** | GitHub Actions |
| **Monitoring** | Vercel Analytics + Sentry |

---

## 7. Design System — Pastel Minimalist

### 7.1 Color Palette
```
Primary:        #A78BFA  (Soft Violet)
Secondary:      #F9A8D4  (Blush Pink)
Accent:         #86EFAC  (Mint Green)
Warm:           #FCD34D  (Soft Gold)
Peach:          #FDBA74  (Warm Peach)

Background:     #FAFAFE  (Near White)
Surface:        #FFFFFF  (White cards)
Surface Alt:    #F3F0FF  (Tinted lavender surface)

Text Primary:   #1E1B2E  (Deep Purple-Black)
Text Secondary: #6B7280  (Muted Gray)
Text Muted:     #9CA3AF  (Light Gray)

Success:        #34D399
Warning:        #FBBF24
Error:          #F87171

Gradient Hero:  linear-gradient(135deg, #A78BFA, #F9A8D4)
Gradient Card:  linear-gradient(180deg, #F3F0FF, #FFFFFF)
```

### 7.2 Typography
```
Font Family:    "Plus Jakarta Sans", sans-serif
Heading 1:      28px / Bold / -0.02em tracking
Heading 2:      22px / SemiBold
Heading 3:      18px / SemiBold
Body:           15px / Regular / 1.5 line-height
Caption:        13px / Medium
Micro:          11px / Medium / uppercase tracking
```

### 7.3 Spacing & Radius
```
Border Radius:  12px (cards), 24px (buttons), 50% (avatars)
Spacing Scale:  4, 8, 12, 16, 20, 24, 32, 48, 64
Card Shadow:    0 2px 12px rgba(167, 139, 250, 0.08)
Nav Blur:       backdrop-filter: blur(20px)
```

### 7.4 Motion Principles
- **Spring physics** for swipe cards (damping: 25, stiffness: 300)
- **Ease-out** for page transitions (300ms)
- **Scale + fade** for modals and overlays
- **Stagger** for list items appearing
- **Micro-bounce** on button press (scale 0.95 → 1.0)
- **Haptic-style pulse** on match confirmation

---

## 8. Data Architecture (Simplified)

```
Users
├── id, name, dob, gender, bio
├── location (lat, lng, area)
├── photos[], videos[]
├── interests[], hobbies[]
├── astrology { sun, moon, rising, chinese }
├── preferences { ageRange, distance, religion... }
└── settings { notifications, privacy, theme }

Matches
├── id, userA, userB
├── status: pending | matched | unmatched
├── mismatchScore
├── matchedAt
└── icebreaker (generated)

Messages
├── id, matchId, senderId
├── type: text | image | video | voice | gif
├── content, mediaUrl
├── reactions[]
├── readAt, deletedAt
└── createdAt

Posts
├── id, userId
├── type: photo | video
├── mediaUrl, caption
├── likes[], comments[]
└── createdAt

Swipes
├── id, swiperId, targetId
├── action: like | pass | superlike | maybe
└── createdAt

ChatbotConversations
├── id, userId
├── messages[] { role, content, timestamp }
└── context { lastMatch, lastSearch }
```

---

## 9. MVP vs Future Roadmap

### Phase 1 — MVP (Build Now)
- [x] Next.js project initialized
- [ ] Login page (OTP mock + Google SSO UI)
- [ ] Onboarding flow (6 screens)
- [ ] Dashboard with swipeable card stack
- [ ] Profile detail view
- [ ] Own profile page (edit, posts, interests, astrology)
- [ ] Chat list + 1:1 chat UI
- [ ] AI Chatbot (Cupid) UI
- [ ] Bottom navigation bar
- [ ] Responsive, mobile-first design
- [ ] Mock data for all profiles

### Phase 2 — Backend Integration
- [ ] Supabase setup (auth, DB, storage)
- [ ] Real authentication (OTP + Google)
- [ ] Profile CRUD
- [ ] Photo/video upload
- [ ] Matchmaking algorithm
- [ ] Real-time chat
- [ ] Geolocation matching

### Phase 3 — Polish & Premium
- [ ] AI Chatbot with Gemini
- [ ] Push notifications
- [ ] Video calling
- [ ] Premium features (see who liked you, unlimited super likes)
- [ ] Blind Date Mode
- [ ] Vibe Playlists
- [ ] Voice Intros
- [ ] Safety verification
- [ ] Analytics dashboard

---

*This is a living document. Update as decisions are made.*
