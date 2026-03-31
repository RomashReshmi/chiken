# Git Architecture & Requirements

We use a collaborative Git branching strategy modeled after "Git Flow".

## Core Branches

1. **`main`**: The primary branch representing the stable, production-ready codebase. Direct pushes to `main` are restricted. All features arrive via pull requests.
2. **`feature/api`**: A living branch dedicated to the development of the backend structure, routing logic, ORM models, and server handlers.
3. **`feature/client`**: Dedicated to frontend scaffolding, Vite compilation setup, UI styling, and React component integration.
4. **`feature/tests`**: Isolated branch to set up TestCafe browser instrumentation testing and Jest logic runners.

## Example Git Log Output

```text
commit 8d4a32b1 (HEAD -> main)
Author: DevName <dev@example.com>
Date:   Sat Oct 28 14:02:44 2023 -0400
    Merge pull request #12 from feature/client
    Add Glassmorphism dashboard aesthetics

commit e149a8fc (origin/feature/client, feature/client)
Author: DevName <dev@example.com>
Date:   Sat Oct 28 12:44:21 2023 -0400
    feat(client): implement API call abstractions in App.jsx

commit f2db8c0e (origin/feature/tests, feature/tests)
Author: QA_Engineer <qa@example.com>
Date:   Fri Oct 27 16:32:01 2023 -0400
    test(api): ensure 404 paths correctly resolve in app.js
    
commit b41fc8e2 (origin/feature/api, feature/api)
Author: BackendDev <dev@example.com>
Date:   Fri Oct 27 09:12:11 2023 -0400
    refactor(api): setup modular routing structure and chickenControllers
    
commit d48ac402 
Author: BackendDev <dev@example.com>
Date:   Thu Oct 26 18:22:15 2023 -0400
    chore(api): Initialized npm package with sqlite3
```
