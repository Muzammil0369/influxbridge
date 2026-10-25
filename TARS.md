# TARS.md — InfluxBridge Project Memory & Launch Plan

**Owner:** Muzammil Asif  
**Project:** InfluxBridge — influencer marketing / market-entry agency platform  
**Hard launch deadline:** **15 November 2026**  
**Last updated:** 23 October 2026  
**Repository:** https://github.com/Muzammil0369/influxbridge  
**Recent working branch:** `feature/supabase-auth-first`  
**Vercel deployment:** https://influxbridge-gp8x-neon.vercel.app/admin  
**Supabase project ref:** `gdkqqwwdtyhuuurxegwc`

> This is the project handoff and memory file. Read it before continuing work. Git history and the current repository remain the source of truth for exact code. This file consolidates the history available in our conversations; it is not a literal archive of every line ever written.

## 1. How TARS should work with Muzammil

- Muzammil is a Flutter/app developer, not a web developer. Explain the cause and the next action in plain language.
- Work efficiently, but don't skip safety checks.
- Inspect the current repo before creating routes or replacing files. Don't repeat pages that already exist.
- Prefer making authorized changes directly in the connected GitHub repo; clearly state the branch, file, commit, and what was/wasn't verified.
- Never claim a build, test, deploy, SQL migration, or feature succeeded unless that was actually observed.
- Aim for premium, consistent UI. Admin pages should feel like one operations workspace, not disconnected screens.
- Use real Supabase data. Don't invent metrics, creator engagement rates, demographics, verification, or client outcomes.
- A migration file committed to GitHub is **not automatically applied** to the live Supabase database.
- Protect secrets. Never ask the user to paste service-role keys or passwords into chat.
- At session end, update this file with commits, test results, remaining risks, and the next action.

## 2. Product vision

InfluxBridge helps companies seeking influencer campaigns and market-entry support in Pakistan, especially fintech/exchange-related companies. Companies should be able to understand services and case studies, discover creators, submit campaign briefs, and contact the team.

Influencers/creators should be able to register, build a profile, go through review, receive campaign invitations, accept/decline invitations, and view campaign details. Admins should be able to review leads/messages/creators, manage campaign briefs, match and assign creators, and monitor responses. Company permissions must be enforced by database/server-side access controls, not merely hidden UI buttons.

Founders/team context: Muzammil, Tahir, and Huzaifa. Tahir owns MT Trader and is a co-founder; Huzaifa contributes cybersecurity knowledge. Case studies must be truthful—not hypothetical work presented as real results.

## 3. Tech stack and development setup

- Next.js 16.3.4, App Router, TypeScript/TSX
- React; existing icon package is `lucide-react` (verify exports before using icons)
- Three.js for a scroll-reactive Saturn/planet visual direction
- Supabase auth/database and `@supabase/ssr`
- GitHub connected to Vercel
- Local Windows/VS Code project: `E:\\influxbridge`
- Local URL: `http://localhost:3000`
- Node v24.20.0 was observed; package `influxbridge@0.1.0`

Browser Supabase client pattern observed:

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
```

Never expose service-role keys in client code.

Local commands:

```powershell
cd E:\\influxbridge
npm run dev
npm run build
```

PowerShell initially blocked `npm.ps1` because of execution policy, but `npm run dev` later worked. Recheck current errors instead of assuming old issues remain.

## 4. History and important work

### Early site and design
The project started as an AI-assisted prototype/public agency site. Visual direction: premium, distinctive, with a Three.js planetary/Saturn-like element that reacts to scroll. Earlier route/component issues included missing default exports on case-studies/about/contact, `Users is not defined`, missing `Instagram`/`Youtube` icon exports, and missing `./three/ScrollWorld`. These are historical notes only—inspect the current code before assuming they remain. A `THREE.Clock` deprecation warning was also reported.

### Admin workspace
Admin navigation areas include Overview, Leads, Campaigns, Influencers, and Messages. Previous UI feedback: the sidebar should switch content within a unified workspace and pages should not feel like separate, repetitive screens. Historical sidebar counts (Leads 6, Campaigns 3, Influencers 12, Messages 4) are **not confirmed live counts**; never present them as real without checking data.

A prior build failed on `/admin/campaigns` with `ReferenceError: title is not defined` at `app/admin/campaigns/page.tsx:23` (`title.eyebrow`). Another admin prerender error was reported with truncated details. Verify current branch/build to ensure these are resolved.

### Supabase and schema
Supabase project ref: `gdkqqwwdtyhuuurxegwc`. Initial migration was created at `supabase/migrations/20261004043101_initial_schema.sql`, covering profiles, role/status enums, companies, company members, influencer profiles, indexes, and RLS policies.

A prototype used mock data/localStorage at one stage. Distinguish prototype data from live Supabase data.

### Campaign requests and creator matching
Company campaign request UI was added to `app/dashboard/company/campaigns/page.tsx`. It depends on company membership in `company_members` and the correct database permissions.

Migration `supabase/migrations/20261023180000_campaign_matching_brief_fields.sql` adds fields:
- `target_niche`, `target_country`, `target_city`, `target_audience`
- `platforms text[]`, `content_formats text[]`
- `start_date`, `end_date`, `is_in_person_event`

**Live migration application was not confirmed in the recorded history.** Verify before depending on these columns.

Admin campaign creation inserts values such as `name`, `company_id`, `budget`, `currency`, `deadline`, and `status: "IN_REVIEW"`. An enum error occurred for `campaign_phase = "PLANNING"`; a later commit removed the hardcoded phase and relied on the database default. Don't reintroduce enum values without checking the schema.

Creator matching is advisory, using available information such as niche, location, followers, rate, and profile/verification status. Do not fabricate engagement rates or audience demographics.

### Creator invitation response — latest milestone
On `/dashboard/influencer`, invited creators can accept or decline campaign invitations. The user reported the click reverted to the original state on both local and Vercel, suggesting a shared database/policy issue rather than only a local frontend issue.

The handler in `app/dashboard/influencer/page.tsx` updates `campaign_creators` only when assignment ID, logged-in `influencer_id`, and current `INVITED` status match. It requests the updated row and handles errors/no-row cases.

Migration committed:
- File: `supabase/migrations/20261023190000_creator_invitation_response_policy.sql`
- Commit: `77b523e345c52542674fadae3e54341efccc94e3`
- Link: https://github.com/Muzammil0369/influxbridge/blob/feature/supabase-auth-first/supabase/migrations/20261023190000_creator_invitation_response_policy.sql
- Policy: `Creators can respond to own campaign invitations`
- Intended transition: the authenticated creator can change their own assignment from `INVITED` to `ACCEPTED` or `DECLINED`.

**The user explicitly confirmed the invitation fix worked on 23 October 2026.** Verify both Accept and Decline persist after refresh during final QA.

## 5. Historical route inventory — inspect before changing

Public/discovery:
- `/`, `/services`, `/case-studies`, `/about`, `/contact`, `/login`
- `/influencers`, `/influencers/[slug]`
- `/join/influencer`, `/join/influencer/profile`

Influencer:
- `/dashboard/influencer`
- `/dashboard/influencer/campaigns/[id]`

Company:
- `/dashboard/company`
- `/dashboard/company/campaigns`
- `/dashboard/company/campaigns/[id]`

Admin:
- `/admin`, `/admin/leads`, `/admin/campaigns`, `/admin/influencers`, `/admin/messages`

This is a historical list, not proof that each route currently builds or is complete. Don't create duplicate routes.

## 6. Useful commits

| Commit | Purpose |
|---|---|
| `63a6e85` | Refined admin overview/unified premium workspace |
| `dfb35c2e00757544445d7dda4ee4f61551986ebc` | Creator avatars in admin assignments — [commit](https://github.com/Muzammil0369/influxbridge/commit/dfb35c2e00757544445d7dda4ee4f61551986ebc) |
| `a59ecfbfe86a7246c68735481b761e1006ebecc5` | Campaign manager modal scrolling/layout |
| `2089cddeacd1cea0f7dc6e927b19a94898894816` | Campaign brief editing and advisory creator matching |
| `9d0846741f9bb8b005904d593f591767894a74e6` | Admin campaign creation |
| `6d9b71ddbbd642f2aa498660cac0bc3213ba4dcd` | Removed invalid hardcoded `PLANNING` enum |
| `8d6db411d4965376f078c85bbb207ceba38a39d3` | Company campaign request form |
| `75adc0a46339028a3ff1162ce73b288f1d2ca46f` | Creator invitation response UI |
| `b1dc64d6f1746e84858e15629d0b925640bfaa2e` | Invitation response handler |
| `77b523e345c52542674fadae3e54341efccc94e3` | Invitation response RLS migration |

Inspect current history before relying on any commit as the branch's latest state.

## 7. Status as of 23 October 2026

### Confirmed
- Local dev server worked earlier.
- GitHub is connected to Vercel.
- User tested and confirmed that Accept Invitation now works.
- User stopped work for the day and wants to resume tomorrow.

### Not yet confirmed
- Latest Vercel deployment green and matches intended branch.
- Latest `npm run build` passes.
- All migrations are applied to the correct Supabase project.
- Accept and Decline both persist after refresh.
- Auth flows and role-based permissions work end-to-end.
- Company campaign submission and admin matching work with the live schema.
- Admin prerender error is resolved.
- Production auth redirect URLs/environment variables are correct.
- All routes, responsive layouts, forms, empty/error states, and security policies have been tested.

## 8. Plan to finish by 15 November 2026

About 23 calendar days remained on 23 October. Treat the deadline as a target with a feature freeze and regression window; avoid endless feature additions.

### Next session — first actions
1. Read this file, inspect current branch head, latest commits, and Vercel status.
2. Verify both Accept and Decline work and persist after refresh/re-login.
3. Run `npm run build` against current code; fix the first real error before adding features.
4. Verify the campaign matching and invitation RLS migrations are applied to the intended Supabase project.
5. Inspect browser console, server logs, and Supabase logs for real errors.

### 23–27 October: stabilize core flows
- Test registration, login, logout, session persistence, and role redirects.
- Test creator onboarding/profile submission and admin review/approval.
- Test company membership mapping and campaign request submission.
- Test admin campaign review, brief editing, creator matching/assignment, and creator response.
- Test leads/messages workflow.
- Audit RLS for relevant SELECT/INSERT/UPDATE/DELETE operations and verify users cannot access another user's private data.
- Check enum values and DB defaults before changing statuses.

### 28 October–2 November: complete launch-critical essentials
- Inspect repo for unfinished/placeholder routes; don't infer from old route inventory.
- Finish only necessary missing flows; avoid speculative features.
- Ensure truthful public copy/case studies, useful form validation, loading/success/error/empty states, and no dead admin links.
- Check image/avatar fallbacks and mobile layout.

### 3–7 November: security and polish
- Test mobile/tablet/desktop and accessibility basics.
- Test admin, company, and influencer with separate accounts.
- Confirm privileged operations are not protected only by hidden client-side controls.
- Check environment variables, redirect URLs, cookies/session behavior, and production auth settings.
- Check Three.js performance and fallback on lower-powered devices.
- Remove debug output and production-critical assumptions that rely on mock/localStorage data.

### 8–11 November: full end-to-end QA
Test separate accounts and journeys:
- Public visitor: public pages, case studies, influencer directory/profile, contact.
- Influencer: signup, profile/review status, invitation, accept/decline, persistence.
- Company: submit campaign, view own campaign/status, cannot access another company's data.
- Admin: review creators/leads/messages, edit brief, assign creator, inspect response.
- Negative tests: invalid form input, unauthenticated direct URL, wrong role, stale invitation, duplicate submit, network/database failure.
- Review browser console, server logs, Supabase logs, Vercel deployment logs, and all routes.

### 12–15 November: release
- **12 Nov:** feature freeze; only critical bug fixes.
- **13 Nov:** production build and regression tests on the release commit.
- **14 Nov:** rehearse deployment; verify domain/DNS/HTTPS and auth redirects if configured; prepare rollback.
- **15 Nov:** launch only if critical checks pass; smoke-test production immediately and monitor logs.
- If security, data integrity, or auth-critical bugs remain, make an explicit go/no-go decision rather than hiding the issue to meet the date.

## 9. Release checklist

### Repository/deployment
- [ ] Correct production branch and latest commit confirmed
- [ ] `npm run build` passes
- [ ] Vercel green for the exact release commit
- [ ] Production environment variables correct
- [ ] Domain, HTTPS, redirects verified if configured

### Database/security
- [ ] Required migrations applied to correct project
- [ ] No secrets in client bundle or Git
- [ ] Admin/company/influencer permissions tested separately
- [ ] RLS verified for user-owned data
- [ ] Cross-account access attempts fail as expected
- [ ] Auth redirects and session persistence verified

### Journeys
- [ ] Public pages/contact form
- [ ] Registration/login/logout/recovery
- [ ] Influencer profile creation/editing/review
- [ ] Company campaign submission/status visibility
- [ ] Admin campaign review and brief editing
- [ ] Creator matching and assignment
- [ ] Accept/decline persists after refresh
- [ ] Leads/messages workflow
- [ ] Loading, empty, success, and error states

### UX/operations
- [ ] Mobile/tablet/desktop checks
- [ ] Accessibility basics
- [ ] No broken links, missing icons, or runtime errors
- [ ] Real content/case studies reviewed
- [ ] Privacy/terms/contact details as appropriate
- [ ] Backup/rollback and monitoring plan
- [ ] Production smoke test completed

## 10. Session handoff protocol

At the start:
1. Read `TARS.md`.
2. Inspect current GitHub branch, recent commits, relevant files, and deployment status.
3. Ask for screenshots/errors only if direct inspection cannot reveal the issue.
4. Make the smallest safe change that fixes the blocker.
5. Verify with tests/builds where possible; say clearly what could not be verified.
6. Update this file after meaningful progress.

At the end, record commit SHA, user-confirmed behavior, unverified items, and the next best action.

**Immediate instruction: stop work for today.** Invitation response is working per user confirmation. Resume with branch/deployment check, Accept + Decline persistence test, and production build.

**Launch deadline: 15 November 2026 — finish, test, and launch responsibly.**


---

## 11. Handoff update — 25 October 2026

**Latest reviewed branch:** `feature/supabase-auth-first`  
**Latest code commit reviewed:** `bfc8fefac16f0d423deb714ac6e31852eea0ee6f`  
**Code commit:** [Fix company campaign details and membership lookup](https://github.com/Muzammil0369/influxbridge/commit/bfc8fefac16f0d423deb714ac6e31852eea0ee6f)

### Confirmed in this session

- The user ran `npx tsc --noEmit`; it exited without reporting errors.
- The user ran `npm run build`; Next.js 16.3.4 completed successfully and generated 26/26 static pages/routes.
- Company campaign detail page now queries `company_members.user_id` (not the nonexistent `profile_id`) and scopes the campaign lookup by both campaign ID and the membership's `company_id`.
- User saw the company campaign details page successfully render the Supabase campaign record `Test Fintech Creator`, including budget, dates, niche, location, audience, platforms, and content formats.
- User pushed commit `bfc8fef` to `origin/feature/supabase-auth-first`.

### Issues discovered in commit review — fix next

1. **Accidentally committed backup file.** Commit `bfc8fef` contains `app/admin/campaigns/page.tsx.bak`. Remove this backup from Git in a follow-up commit; do not delete or overwrite the real `app/admin/campaigns/page.tsx`.
2. **Text encoding damage in admin campaigns page.** The commit diff shows mojibake such as `ΓÇª`, `ΓÇö`, and `ΓÇô` where characters like ellipsis, em dash, and en dash were intended. The file also has a UTF-8 BOM at the beginning. Inspect and repair the actual file using a reliable UTF-8 editor/write path, preserve all functional changes, then check rendered UI and diff. Do not blindly replace every occurrence without reviewing context.
3. **Build caveat.** Although `npx tsc --noEmit` passed separately, the build output says Next.js skipped its own type validation; keep the separate TypeScript check as a required verification step.
4. **Runtime/security verification remains incomplete.** A successful build does not prove realtime subscriptions, RLS, or all account permissions. Test as a company user and verify that a user cannot read a different company's campaign. Confirm the required Realtime publication/configuration and RLS policies for any subscribed tables rather than assuming subscription events always arrive.

### Current schema facts verified by the user

The user queried `information_schema.columns` in Supabase and confirmed:

- `public.company_members`: `company_id uuid`, `user_id uuid`, `role USER-DEFINED`, `created_at timestamptz`.
- `public.profiles`: `id uuid`, `role USER-DEFINED`, `full_name text`, `avatar_url text`, `created_at timestamptz`, `updated_at timestamptz`.

Do not introduce `company_members.profile_id`; use `user_id` for the membership lookup. Do not modify schema merely to accommodate a wrong frontend column assumption.

### Latest company campaign detail page behavior / known limitations

File: `app/dashboard/company/campaigns/[id]/page.tsx`

- Uses Supabase browser client, calls `auth.getUser()`, redirects unauthenticated users to `/login`, looks up company membership by `user_id`, and filters campaign query by `id` plus `company_id`.
- Renders the campaign brief and supports manual refresh and sign-out.
- Attempts Realtime subscriptions for `campaigns` and `campaign_creators`; this behavior has not yet been independently verified in runtime.
- Creator assignments are currently only represented by placeholder copy on this detail page. The UI says assignments will appear as the campaign progresses; do not claim the company can already manage assignments here.
- Campaign metrics, deliverable review/approval, and campaign messaging are not yet implemented on this page.
- Confirm campaign status/phase enum values and date/budget/null handling against actual schema before extending features.

### Git state / next pull

The user used `git add .`, so the backup file was included in the pushed code commit. The commit output reported 3 files changed, 996 insertions and 20 deletions. This is not a reason to reset or rewrite history; remove the backup with a normal follow-up commit.

This TARS update is being committed separately to `feature/supabase-auth-first`. To sync the local checkout after this update, the user should run:

```powershell
git pull origin feature/supabase-auth-first
git status
```

Before pulling, if there are uncommitted local changes, inspect and commit/stash them safely; do not overwrite uncommitted work.

### Next-session priority order

1. Pull the latest branch and confirm clean Git status.
2. Fix mojibake/BOM in `app/admin/campaigns/page.tsx` without losing working admin features; run `npx tsc --noEmit` and `npm run build`.
3. Remove `app/admin/campaigns/page.tsx.bak` from version control in a separate intentional cleanup commit.
4. Re-test company campaign detail page and sign-out in browser.
5. Verify Realtime delivery, campaign RLS, and cross-company access isolation using separate accounts.
6. Review company overview, campaigns list, creator network, messages, influencer dashboard/profile, and admin workflows for mock data, dead controls, and authorization gaps.
7. Update this file again after meaningful verified progress; record commit SHA and distinguish user-tested behavior from code-only inspection.

**Status:** Git push succeeded and local build/type check were reported successful by the user. The repository is not yet “all set”: encoding cleanup, backup-file cleanup, runtime/Realtime testing, and wider security/feature review remain open.
