
# HealthProAssist - Project Management Document

## Current Status: Phase 1 - Full Codebase Analysis & Diagnosis

### Phase 1: Full Codebase Analysis & Diagnosis

#### UI & Styling Analysis
**Status:** IN PROGRESS
- [ ] Scan all .tsx components in src/pages and src/components
- [ ] Identify invisible buttons/text (contrast issues)
- [ ] Locate text overflow issues from larger font sizes
- [ ] Document all styling issues

#### Routing & File Structure Analysis
**Status:** IN PROGRESS
- [ ] Analyze src/App.tsx routing structure
- [ ] Compare src/pages/public/ vs src/pages/ files
- [ ] Identify duplicate/orphaned files
- [ ] Map active vs unused routes

#### Functional Analysis
**Status:** IN PROGRESS
- [ ] Review DashboardLayout.tsx navigation logic
- [ ] Check LoginPage.tsx authentication bugs
- [ ] Verify user role-based navigation

### Issues Identified:

#### UI/Styling Issues:
1. **Routing Conflicts:** Both src/pages/LoginPage.tsx and src/pages/public/LoginPage.tsx exist
2. **Duplicate Pages:** RegisterPage exists in both locations
3. **Styling Inconsistencies:** Mixed use of old and new brand colors
4. **Navigation Issues:** DashboardLayout may still use hardcoded userType

#### File Structure Issues:
1. **Duplicate Files Found:**
   - src/pages/LoginPage.tsx vs src/pages/public/LoginPage.tsx
   - src/pages/RegisterPage.tsx vs src/pages/public/RegisterPage.tsx
   - src/pages/UserProfile.tsx vs src/pages/family/UserProfile.tsx

2. **Router Analysis:** App.tsx uses src/pages/public/ versions for login/register

#### Missing Components:
1. **AccessibilityContext:** Not implemented
2. **Unified UserProfile:** Multiple versions exist, need single implementation
3. **ClientIntakeForm:** Needs full implementation
4. **Submit Intake Form Edge Function:** Needs creation

### Phase 2: UI Bug Fixes and Theming Refinement
**Status:** PENDING
- [ ] Fix contrast and visibility issues
- [ ] Fix layout and overflow problems
- [ ] Standardize brand colors usage

### Phase 3: Codebase Cleanup
**Status:** PENDING
- [ ] Delete duplicate LoginPage.tsx and RegisterPage.tsx from src/pages/
- [ ] Remove unused UserProfile.tsx from src/pages/
- [ ] Clean up any other orphaned files

### Phase 4: Core Functionality Implementation
**Status:** PENDING

#### Navigation Fix
- [ ] Fix DashboardLayout.tsx to use profile.user_type dynamically
- [ ] Remove hardcoded userType prop

#### Shared User Profile Page
- [ ] Create AccessibilityContext.tsx
- [ ] Create unified UserProfile.tsx
- [ ] Wire up updateUserProfile function
- [ ] Add /dashboard/profile route
- [ ] Add Profile & Settings navigation link

#### Healthcare Intake Form
- [ ] Create submit-intake-form Edge Function
- [ ] Add submitIntakeForm to apiService.ts
- [ ] Create complete ClientIntakeForm.tsx
- [ ] Add route and navigation

### Next Steps:
1. Complete Phase 1 analysis
2. Begin UI bug fixes
3. Clean up duplicate files
4. Implement core functionality
