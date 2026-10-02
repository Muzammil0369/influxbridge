# InfluxBridge — Master Development Roadmap

> **Project:** InfluxBridge  
> **Purpose:** B2B market-entry, influencer marketing, campaign management, and agency operations platform for international fintech, crypto, forex, Web3, and related companies entering or expanding in Pakistan.  
> **Current stage:** Frontend prototype complete and QA-tested; preparing for secure Supabase backend architecture.  
> **Last updated:** 2026-10-02

---

## 1. Project Mission

InfluxBridge is an agency-first platform.

Core operating model:

```text
Company
   ↓
InfluxBridge
   ↓
Influencer / Creator Network
   ↓
Campaign
   ↓
Deliverables
   ↓
Review / Approval
   ↓
Performance / Reporting
```

Companies should not freely bypass InfluxBridge and directly hire creators through the platform.

The platform is intended to become the agency's internal operating system while also providing professional company and influencer portals.

---

# 2. Founder / Team Responsibilities

| Person | Primary responsibility |
|---|---|
| Tahir | Business development, exchange relationships, networking, sales, communities, events |
| Muzammil | Technology, product, web/app development, automation |
| Huzaifa | Cybersecurity, architecture, platform operations |

Founder decisions still to be finalized separately include investment, equity, salaries/commissions, expenses, decision rights, and project economics.

---

# 3. Technology Stack

## Current frontend

- Next.js 16.3.4
- TypeScript
- Tailwind CSS
- React
- lucide-react
- Three.js
- React Three Fiber
- Vercel
- GitHub

## Current development environment

- Project: `E:\InfluxBridge`
- VS Code
- Windows
- Local development uses the Webpack workaround because the environment blocks the native Next.js SWC binary.

Current development command:

```bash
npm run dev
```

The `dev` script currently uses:

```json
"dev": "next dev --webpack"
```

## Planned backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security (RLS)

---

# 4. Current Architecture

## Current prototype architecture

```text
Next.js UI
   ↓
lib/platform.ts
   ↓
Mock data
   ↓
localStorage / mock store
```

## Target production architecture

```text
Browser
   ↓
Next.js
   ↓
Secure server-side operations
   ↓
Supabase
   ├── Auth
   ├── PostgreSQL
   ├── RLS
   └── Storage
```

The existing frontend should be preserved wherever practical. The goal is to replace the mock data layer rather than rebuild the UI.

---

# 5. What Is Already Built

## 5.1 Public Website — COMPLETE

Routes:

- `/`
- `/services`
- `/influencers`
- `/influencers/[slug]`
- `/case-studies`
- `/about`
- `/contact`
- `/login`
- `/join/influencer`
- `/join/influencer/profile`

Features:

- Premium dark visual theme
- Responsive navigation
- Footer
- 3D hero/visual system
- Services
- Case studies
- Public influencer profiles
- Contact flow
- Login UI
- Influencer registration
- Influencer profile onboarding

### Important prototype note

Some homepage and influencer-page metrics are mock/demo data and must not be presented as real company achievements in production without replacing them with verified data.

---

# 6. Three.js / 3D Experience — BUILT

Relevant files:

```text
components/three/ScrollWorld.tsx
components/three/ScrollWorldLoader.tsx
```

Current visual system includes:

- Planet/globe
- Planet rings
- Stars
- Sparkles
- Network nodes
- Floating network elements
- Scroll-reactive rotation
- Atmospheric/glow effects

Performance optimization is a later task unless production testing identifies a critical issue.

---

# 7. Influencer Experience — BUILT

## Registration

Route:

```text
/join/influencer
```

Includes:

- Name
- Display name
- Email
- Password
- Password confirmation
- Terms
- Password strength feedback
- Validation
- Success state

Current limitation:

> Registration is frontend/mock functionality. No real account is created yet.

## Profile onboarding

Route:

```text
/join/influencer/profile
```

Five stages:

1. Profile
2. Socials
3. Audience
4. Portfolio
5. Review

Includes:

- Profile photo
- Bio
- Location
- Niche
- Languages
- Social links
- Followers
- Starting rate
- Audience region
- Portfolio/media-kit URL
- Sample content URL
- Review summary

Current limitation:

> Profile submission is not yet persisted to a production database.

---

# 8. Influencer Dashboard — BUILT

Routes:

```text
/dashboard/influencer
/dashboard/influencer/campaigns
/dashboard/influencer/campaigns/[id]
/dashboard/influencer/messages
/dashboard/influencer/profile
```

Features:

- Dashboard
- Campaign overview
- Campaign details
- Deliverables
- Upload UI
- Messages
- Profile
- Payment/status information
- Campaign manager information

Current limitation:

> Data and actions are still mock/local-storage based.

---

# 9. Company Dashboard — BUILT

Routes:

```text
/dashboard/company
/dashboard/company/campaigns
/dashboard/company/campaigns/[id]
/dashboard/company/influencers
/dashboard/company/messages
```

Features:

- Company overview
- Campaigns
- Campaign detail
- Creator network
- Creator profiles
- Campaign request flow
- Performance
- Timeline
- Budget
- Deliverables
- Messages
- Activity

Current limitation:

> Company accounts, permissions, and data are not yet backed by Supabase.

---

# 10. Admin Operations Portal — BUILT

Routes:

```text
/admin
/admin/leads
/admin/campaigns
/admin/influencers
/admin/messages
```

Admin shell includes:

- Responsive sidebar
- Operations branding
- Navigation
- Notifications UI
- System status
- Public website link

Admin areas:

### Overview

- Operational snapshot
- Leads
- Campaigns
- Influencer review queue
- Activity

### Leads

Statuses:

```text
New
Contacted
Qualified
Proposal Sent
Negotiation
Converted
Rejected
```

### Influencers

Current review states include:

```text
Pending Review
Approved
```

### Campaigns

Campaign monitoring and workflow states.

### Messages

Conversation and message management.

Current limitation:

> Admin authentication and authorization are not yet real.

---

# 11. Shared Mock Data Foundation — BUILT

Directory:

```text
lib/mock-data/
```

Files:

```text
campaigns.ts
influencers.ts
companies.ts
leads.ts
messages.ts
index.ts
```

Supporting files:

```text
lib/workflow.ts
lib/mock-store.ts
lib/platform.ts
lib/format.ts
```

The purpose of this layer is to keep the frontend internally consistent while the real backend is not yet implemented.

---

# 12. Workflow Foundation — BUILT

## Deliverable workflow

```text
NOT_STARTED
    ↓
DRAFT_SUBMITTED
    ↓
IN_REVIEW
    ↓
REVISION_REQUESTED
    ↓
IN_REVIEW
    ↓
APPROVED
    ↓
PUBLISHED
    ↓
COMPLETED
```

## Campaign workflow

```text
BRIEF
    ↓
CREATOR_ASSIGNMENT
    ↓
DELIVERABLES
    ↓
REVIEW
    ↓
PUBLICATION
    ↓
PERFORMANCE
    ↓
PAYMENT
    ↓
COMPLETED
```

## Lead workflow

Lead transition rules are defined in the workflow foundation.

These state machines should become the basis for server-side validation later.

---

# 13. QA / Testing — COMPLETE

The complete website and workflow were tested by the project owner.

Confirmed working:

- Public pages
- Navigation
- Influencer onboarding
- Company dashboard
- Influencer dashboard
- Admin portal
- Campaign pages
- Messages
- Main workflow interactions

Current conclusion:

> Frontend prototype is stable enough to move to backend architecture.

---

# 14. Known Prototype Limitations

These are NOT yet production features:

- Real authentication
- Real user accounts
- Real database persistence
- Production authorization
- Row Level Security
- Real file storage
- Real KYC
- Real social verification
- Real-time messaging
- Real social analytics
- Real payment processing
- Real notifications
- Production audit logging

These must not be represented as production capabilities until implemented and tested.

---

# 15. SECURITY PRINCIPLES

Security must be designed before backend implementation.

## Core principle

> Never trust the browser.

Client-side validation is for UX.

Server-side validation and database authorization are required for security.

## Security requirements

The production system must address:

- Authentication
- Authorization
- Role separation
- Row Level Security
- IDOR prevention
- Input validation
- XSS protection
- CSRF considerations
- SQL injection prevention
- SSRF considerations
- Session security
- Rate limiting
- Brute-force protection
- Credential stuffing protection
- Secure file uploads
- Private storage access
- Secret management
- Security headers
- Audit logging
- Least privilege
- Error handling
- Dependency security
- Monitoring
- Backups

No system can honestly be guaranteed "unhackable". The target is defense-in-depth, least privilege, secure defaults, and independent security testing.

---

# 16. Roles

Initial production roles:

```text
ADMIN
COMPANY
INFLUENCER
```

Potential future operational roles:

```text
SUPER_ADMIN
CAMPAIGN_MANAGER
REVIEWER
FINANCE
SUPPORT
```

Additional roles should only be introduced when there is a real business requirement.

---

# 17. Permission Model

## Company

Should be able to:

- Manage its own company profile
- View its own campaigns
- View authorized campaign information
- View authorized creator information
- Participate in authorized campaign conversations
- Submit campaign requests

Should NOT be able to:

- Access another company's data
- Change its own role
- Approve its own deliverables as an agency reviewer
- Modify protected campaign ownership
- Access private internal admin data

## Influencer

Should be able to:

- Manage own profile
- View assigned campaigns
- View authorized campaign information
- Submit own deliverables
- Participate in authorized conversations

Should NOT be able to:

- Access another influencer's private data
- Access another influencer's campaigns
- Change approval state
- Change payment state
- Change ownership
- Grant admin privileges

## Admin

Admin access will be explicitly provisioned and protected.

Admin privileges must never depend on a client-controlled field such as:

```text
role = "admin"
```

sent from the browser.

---

# 18. Threat Model

Before production backend implementation, explicitly test for:

```text
IDOR
Privilege escalation
Authentication bypass
Authorization bypass
Session attacks
XSS
CSRF
SQL injection
SSRF
Malicious file uploads
API abuse
Rate-limit abuse
Credential attacks
Data leakage
Mass assignment
Parameter tampering
Open redirects
CORS mistakes
Sensitive-data exposure
```

---

# 19. Database Plan — NOT YET IMPLEMENTED

Do NOT create the production schema until the schema and permission design are reviewed.

Likely V1 entities:

```text
profiles
companies
influencer_profiles
leads
campaigns
campaign_creators
deliverables
conversations
messages
```

Potential later entities:

```text
payments
notifications
audit_logs
social_accounts
campaign_metrics
documents
```

The final schema must be derived from the actual workflow and permission requirements rather than creating unnecessary tables.

---

# 20. Supabase Plan — NOT YET STARTED

Target:

```text
Supabase
├── Authentication
├── PostgreSQL
├── Row Level Security
└── Storage
```

Implementation sequence:

```text
Security requirements
        ↓
Roles & permissions
        ↓
Threat model
        ↓
Database schema
        ↓
Create Supabase project
        ↓
Authentication
        ↓
RLS
        ↓
Storage
        ↓
Secure server-side data layer
        ↓
Frontend migration
```

---

# 21. Authentication Plan

Replace the current fake login with real authentication.

Target flow:

```text
Signup
   ↓
Email verification
   ↓
Login
   ↓
Session
   ↓
Role
   ↓
Authorized dashboard
```

Important:

- Admin should not be selectable during public signup.
- Authentication and authorization must be separate concerns.
- Sessions must be handled using secure mechanisms.
- Password reset and account recovery must be designed securely.
- MFA should be considered especially for privileged/admin accounts.

---

# 22. Row Level Security Plan

RLS is mandatory for sensitive Supabase tables.

Examples:

```text
Company A
    ↓
Only Company A authorized records

Influencer A
    ↓
Only Influencer A authorized records

Admin
    ↓
Operational access according to explicit role
```

The frontend hiding a record is NOT sufficient.

The database must enforce authorization.

---

# 23. Storage Security Plan

Future uploads include:

- Profile photos
- Media kits
- Campaign deliverables
- Potential documents

Requirements:

- MIME/type validation
- Extension validation
- File-size limits
- Private/public bucket separation
- Controlled access
- Signed URLs where appropriate
- Randomized object paths
- No executable uploads
- Server-side validation

Sensitive documents should only be collected when genuinely required.

---

# 24. Migration Strategy

Do NOT delete the mock system immediately.

Current:

```text
UI
 ↓
lib/platform.ts
 ↓
mock data
 ↓
localStorage
```

Target:

```text
UI
 ↓
lib/platform.ts
 ↓
secure server-side operations
 ↓
Supabase
```

The existing UI should remain the presentation layer.

The goal is to replace the data source underneath it.

---

# 25. Backend Migration Order

Implement and test one layer at a time:

```text
1. Authentication
2. Profiles
3. Companies
4. Influencers
5. Leads
6. Campaigns
7. Campaign assignments
8. Deliverables
9. Conversations
10. Messages
11. Admin operations
12. Notifications
13. Analytics
14. Payments
```

Do not move to the next major layer until the previous layer passes functional and security testing.

---

# 26. Future Capabilities

## Analytics

- Campaign reach
- Engagement
- Creator performance
- Campaign performance
- Reporting

## Integrations

Potential future social/API integrations.

## AI

Potential future:

- Creator matching
- Campaign recommendations
- Reporting assistance
- Workflow automation

## Payments

Potential future:

- Campaign budgets
- Creator compensation
- Agency fees
- Invoices
- Payment records

Any regulated payment, crypto, custody, escrow, or KYC implementation must receive appropriate legal/compliance review before production use.

---

# 27. Production Hardening

Before production launch:

- HTTPS
- Secure cookies/session configuration
- Security headers
- Content Security Policy
- Rate limiting
- Environment secrets
- No secrets committed to Git
- Dependency/security review
- RLS verification
- Access-control testing
- Error handling
- Monitoring
- Logging
- Backups
- Recovery plan
- Security testing
- Production smoke tests

---

# 28. Security Testing Checklist

## Authentication

- [ ] Cannot access another user's account
- [ ] Cannot bypass authentication
- [ ] Session handling tested
- [ ] Password reset tested
- [ ] Email verification tested
- [ ] Admin authentication hardened
- [ ] MFA evaluated/implemented for privileged users

## Authorization

- [ ] Company A cannot access Company B
- [ ] Influencer A cannot access Influencer B
- [ ] Influencer cannot access unauthorized campaigns
- [ ] Company cannot access internal admin data
- [ ] Normal users cannot access admin routes
- [ ] Users cannot modify protected role fields

## Database

- [ ] RLS enabled
- [ ] RLS policies tested
- [ ] Foreign keys configured
- [ ] Constraints configured
- [ ] Least privilege applied
- [ ] Sensitive data minimized

## Storage

- [ ] Private files protected
- [ ] File type validation
- [ ] File size limits
- [ ] Unauthorized downloads blocked
- [ ] Malicious uploads tested

## API / Server

- [ ] Server-side validation
- [ ] Rate limiting
- [ ] ID manipulation tested
- [ ] Parameter tampering tested
- [ ] Error leakage reviewed
- [ ] Secrets not exposed

---

# 29. Current Progress

| Area | Status |
|---|---|
| Business model | COMPLETE |
| Product architecture | COMPLETE |
| Public website | COMPLETE |
| Three.js experience | COMPLETE |
| Influencer onboarding UI | COMPLETE |
| Influencer dashboard | COMPLETE |
| Company dashboard | COMPLETE |
| Admin portal | COMPLETE |
| Mock workflow | COMPLETE |
| Frontend QA | COMPLETE |
| Security architecture | IN PROGRESS |
| Supabase schema | NOT STARTED |
| Supabase project | NOT STARTED |
| Real authentication | NOT STARTED |
| RLS | NOT STARTED |
| Real backend | NOT STARTED |
| Real storage | NOT STARTED |
| Real messaging | NOT STARTED |
| Real analytics | NOT STARTED |
| Payments | NOT STARTED |

---

# 30. EXACT CURRENT POSITION

```text
Business planning              ✅
Product architecture           ✅
Frontend                        ✅
Company portal                  ✅
Influencer portal               ✅
Admin portal                    ✅
Mock workflow                   ✅
QA                              ✅
                                │
                                ▼
                    🔴 CURRENT PHASE
              SECURITY + BACKEND DESIGN
                                │
                                ▼
                    Database architecture
                                │
                                ▼
                         Supabase setup
                                │
                                ▼
                         Authentication
                                │
                                ▼
                              RLS
                                │
                                ▼
                    Real backend integration
```

---

# 31. IMMEDIATE NEXT TASK

## Task 1 — Security & Permission Specification

Before creating Supabase tables, define:

1. Every role
2. Every permission
3. Every sensitive data type
4. Every important workflow
5. Ownership rules
6. Access rules
7. Threat model
8. RLS requirements
9. Server-side validation requirements

## Then

**Task 2 — Final Supabase database schema**

Only after Tasks 1 and 2 are finalized should the Supabase project be created and populated.

---

# 32. Development Rules Going Forward

1. **Do not rebuild existing working pages without a reason.**
2. **Do not create duplicate routes.**
3. **Do not introduce production claims using mock data.**
4. **Do not expose secrets in client code.**
5. **Never rely on frontend authorization alone.**
6. **Every sensitive operation must be authorized server-side/database-side.**
7. **Use RLS for Supabase data isolation.**
8. **Keep mock data until the corresponding real backend feature is verified.**
9. **Test every backend feature before moving to the next one.**
10. **Update this roadmap whenever a major phase is completed.**
11. **Keep migrations reproducible and version-controlled.**
12. **Prefer least privilege over convenience.**
13. **Collect sensitive information only when necessary.**
14. **Do not call the platform production-ready until security testing is completed.**

---

# 33. Change Log

## 2026-10-02

- Public website completed.
- Influencer portal completed.
- Company portal completed.
- Admin operations portal completed.
- Shared mock data foundation completed.
- Workflow/state foundation completed.
- Full website/workflow QA confirmed successful.
- Local VS Code project synchronized with GitHub.
- Supabase selected as the planned backend.
- Production backend implementation has NOT started.
- Project paused immediately before security/database architecture.
- Next task: Security & Permission Specification.

---

# 34. Master Principle

> **Build the product once, build the architecture correctly, and make security a foundation rather than a patch.**

The existing frontend is the foundation.

The next major milestone is not another page.

The next milestone is:

**SECURE, WELL-DESIGNED SUPABASE BACKEND ARCHITECTURE.**
