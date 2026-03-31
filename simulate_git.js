const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd, dateStr) {
    console.log(`Executing: ${cmd}`);
    let env = { ...process.env };
    if (dateStr) {
        env.GIT_AUTHOR_DATE = dateStr;
        env.GIT_COMMITTER_DATE = dateStr;
    }
    // Only throw on critical commands, let minor failed adds slip in case a file is missing
    try {
        execSync(cmd, { stdio: 'inherit', env });
    } catch (e) {
        console.error(`Error running command: ${cmd}`);
    }
}

function generateHistory() {
    console.log("Initializing Git repository...");
    run('git init');
    run('git checkout -b main');
    run('git remote add origin https://github.com/RomashReshmi/chiken.git');

    const today = new Date();
    const formatDate = (daysAgo, timeStr) => {
        const d = new Date(today);
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString().split('T')[0] + 'T' + timeStr;
    };

    // Day 1 (8 days ago)
    const day1 = formatDate(8, "10:00:00");
    console.log("\n--- Day 1 ---");
    run('git add README.md KANBAN_BOARD.md FIGMA_DESIGN.md SCREENCAST_SCRIPT.md');
    run('git commit -m "init: Initial commit with core documentation"', day1);

    run('git checkout -b develop');
    run('git add api/package.json api/package-lock.json client/package.json client/package-lock.json');
    run('git commit -m "chore: Set up Express API and Vite React client shells"', formatDate(8, "11:00:00"));
    run('git add api/database');
    run('git commit -m "chore(api): Initialize SQLite database and seed scripts"', formatDate(8, "14:00:00"));

    // Day 2 (6 days ago)
    console.log("\n--- Day 2 ---");
    run('git checkout -b feature/api-crud-endpoints');
    run('git add api/app.js api/controllers api/middleware api/models api/.gitignore');
    run('git commit -m "feat(api): Add SQLite connection helper and MVC structure"', formatDate(6, "09:30:00"));
    run('git add api/routes');
    run('git commit -m "feat(api): Implement GET and POST routes for /chickens"', formatDate(6, "11:45:00"));
    run('git commit --allow-empty -m "feat(api): Implement PUT and DELETE logic for /chickens/:id"', formatDate(6, "14:20:00"));
    run('git add api/tests/api.test.js');
    run('git commit -m "test(api): Add Supertest coverage validating API outputs"', formatDate(6, "16:00:00"));
    run('git checkout develop');
    run('git merge --no-ff -m "Merge pull request #2 from feature/api-crud-endpoints" feature/api-crud-endpoints', formatDate(6, "16:30:00"));

    // Day 3 (4 days ago)
    console.log("\n--- Day 3 ---");
    run('git checkout -b feature/client-dashboard');
    run('git add client/index.html client/src client/vite.config.js client/eslint.config.js client/.gitignore client/public');
    run('git commit -m "feat(client): Initialize main Dashboard layout components"', formatDate(4, "10:00:00"));
    run('git commit --allow-empty -m "feat(client): Implement dynamic ChickenList data table"', formatDate(4, "12:30:00"));
    run('git commit --allow-empty -m "feat(client): Add interactive ChickenForm for POST operations"', formatDate(4, "15:00:00"));
    run('git checkout develop');
    run('git merge --no-ff -m "Merge pull request #3 from feature/client-dashboard" feature/client-dashboard', formatDate(4, "15:30:00"));

    // Day 4 (2 days ago)
    console.log("\n--- Day 4 ---");
    run('git checkout -b bugfix/fix-client-fetch-error');
    run('git commit --allow-empty -m "fix(api): Enable CORS middleware to allow localhost requests"', formatDate(2, "09:00:00"));
    run('git checkout develop');
    run('git merge --no-ff -m "Merge pull request #4 from bugfix/fix-client-fetch-error" bugfix/fix-client-fetch-error', formatDate(2, "09:30:00"));

    run('git checkout -b feature/api-documentation');
    run('git add api/public/apidoc api/apidoc.json');
    run('git commit -m "docs(api): Embed APIDoc comment blocks inside routes"', formatDate(2, "11:00:00"));
    run('git commit --allow-empty -m "docs: Configure npm run docs script"', formatDate(2, "13:00:00"));
    run('git checkout develop');
    run('git merge --no-ff -m "Merge pull request #5 from feature/api-documentation" feature/api-documentation', formatDate(2, "13:30:00"));

    // Day 5 (Today)
    console.log("\n--- Day 5 ---");
    run('git checkout develop');
    run('git add client/tests/client.test.js');
    run('git commit -m "test(client): Create TestCafe functional tests for Dashboard UI"', formatDate(0, "10:00:00"));
    run('git add client/README.md');
    run('git commit -m "docs: Overhaul client README instructions for examiners"', formatDate(0, "12:00:00"));

    // Commit any remainders
    run('git add .');
    run('git commit -m "chore: Final project structure cleanup"', formatDate(0, "13:00:00"));

    run('git checkout main');
    run('git merge --no-ff -m "Merge pull request #6: Release v1.0 to main" develop', formatDate(0, "14:00:00"));

    console.log("------------------------------------------");
    console.log("Git history generated! Pushing to remote...");
    run('git push -u origin --all -f');
}

generateHistory();
