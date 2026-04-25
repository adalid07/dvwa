const { exec } = require("child_process");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, role TEXT)");
  const stmt = db.prepare("INSERT INTO users (username, role) VALUES (?, ?)");
  stmt.run("admin", "Administrator");
  stmt.run("alice", "User");
  stmt.run("bob", "User");
  stmt.finalize();
});

exports.form = (req, res) => {
  res.send(`
<link rel="stylesheet" href="/style.css">
<h1>Command Execution (vulnerable)</h1>
<form method="POST">
<input name="host" placeholder="Ping host">
<button>Execute</button>
</form>
<a href="/">Back</a>
`);
};

exports.vulnerable = (req, res) => {
  const host = req.body.host;
  exec("ping -c 2 " + host, (err, stdout) => {
    res.send(`
<link rel="stylesheet" href="/style.css">
<h1>Result</h1>
<pre>${stdout}</pre>
<a href="/cmd">Back</a>
`);
  });
};

exports.formSafe = (req, res) => {
  res.send(`
<link rel="stylesheet" href="/style.css">
<h1>Command Execution (safe)</h1>
<form method="POST">
<input name="host" placeholder="Ping host">
<button>Execute</button>
</form>
<a href="/">Back</a>
`);
};

exports.safe = (req, res) => {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]+$/.test(host)) {
    return res.send("Invalid host");
  }
  exec("ping -c 1 " + host, (err, stdout) => {
    res.send(`
<link rel="stylesheet" href="/style.css">
<h1>Result</h1>
<pre>${stdout}</pre>
<a href="/cmd-safe">Back</a>
`);
  });
};

exports.formSql = (req, res) => {
  res.send(`
<link rel="stylesheet" href="/style.css">
<h1>SQL Injection (vulnerable)</h1>
<form method="POST">
<input name="username" placeholder="Username">
<button>Search</button>
</form>
<a href="/">Back</a>
`);
};

exports.vulnerableSql = (req, res) => {
  const username = req.body.username || "";
  const query = `SELECT id, username, role FROM users WHERE username = '${username}'`;

  db.all(query, (err, rows) => {
    if (err) {
      return res.send("Query error: " + err.message);
    }

    res.send(`
<link rel="stylesheet" href="/style.css">
<h1>Result (vulnerable)</h1>
<p>Query: <code>${query}</code></p>
<pre>${rows.length ? JSON.stringify(rows, null, 2) : "No user found"}</pre>
<a href="/sql">Back</a>
`);
  });
};

exports.formSqlSafe = (req, res) => {
  res.send(`
<link rel="stylesheet" href="/style.css">
<h1>SQL Injection (safe)</h1>
<form method="POST">
<input name="username" placeholder="Username">
<button>Search</button>
</form>
<a href="/">Back</a>
`);
};

exports.safeSql = (req, res) => {
  const username = req.body.username || "";

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.send("Invalid username");
  }

  const query = "SELECT id, username, role FROM users WHERE username = ?";
  db.all(query, [username], (err, rows) => {
    if (err) {
      return res.send("Query error: " + err.message);
    }

    res.send(`
<link rel="stylesheet" href="/style.css">
<h1>Result (safe)</h1>
<pre>${rows.length ? JSON.stringify(rows, null, 2) : "No user found"}</pre>
<a href="/sql-safe">Back</a>
`);
  });
};