import random

# Real data for top ~15
real_billionaires = [
    ("Bernard Arnault & family", 75, "France", "Catholic", "LVMH", "Married", "Not Public", "$233B"),
    ("Elon Musk", 52, "United States", "Not Public", "Tesla, SpaceX", "Single", "Independent", "$195B"),
    ("Jeff Bezos", 60, "United States", "Not Public", "Amazon", "In a relationship", "Not Public", "$194B"),
    ("Mark Zuckerberg", 39, "United States", "Jewish", "Meta Platforms", "Married", "Not Public", "$177B"),
    ("Larry Ellison", 79, "United States", "Jewish", "Oracle", "In a relationship", "Republican", "$141B"),
    ("Warren Buffett", 93, "United States", "Agnostic", "Berkshire Hathaway", "Married", "Democrat", "$133B"),
    ("Bill Gates", 68, "United States", "Catholic", "Microsoft", "Divorced", "Democrat", "$128B"),
    ("Steve Ballmer", 68, "United States", "Jewish", "Microsoft", "Married", "Democrat", "$121B"),
    ("Mukesh Ambani", 66, "India", "Hindu", "Diversified", "Married", "Not Public", "$116B"),
    ("Larry Page", 51, "United States", "Jewish", "Alphabet", "Married", "Democrat", "$114B"),
    ("Sergey Brin", 50, "United States", "Jewish", "Alphabet", "Divorced", "Democrat", "$110B"),
    ("Michael Bloomberg", 82, "United States", "Jewish", "Bloomberg LP", "In a relationship", "Democrat", "$106B"),
    ("Amancio Ortega", 88, "Spain", "Catholic", "Zara", "Married", "Not Public", "$103B"),
    ("Carlos Slim Helu & family", 84, "Mexico", "Maronite Catholic", "Telecom", "Widowed", "Not Public", "$102B"),
    ("Francoise Bettencourt Meyers", 70, "France", "Catholic", "L'Oréal", "Married", "Not Public", "$99.5B"),
]

nationalities = ["United States", "China", "India", "Germany", "Russia", "Hong Kong", "Italy", "Canada", "United Kingdom", "Brazil"]
industries = ["Technology", "Finance & Investments", "Manufacturing", "Fashion & Retail", "Food & Beverage", "Real Estate", "Healthcare", "Energy", "Media & Entertainment"]
religions = ["Catholic", "Protestant", "Jewish", "Hindu", "Muslim", "Not Public", "Agnostic", "Buddhist"]
relationships = ["Married", "Single", "Divorced", "Widowed", "In a relationship"]
politics = ["Republican", "Democrat", "Independent", "Not Public", "None"]

first_names = ["John", "David", "Michael", "Richard", "Thomas", "Wang", "Li", "Zhang", "Chen", "Dieter", "Klaus", "Alexander", "Vladimir", "James", "William", "Robert", "Joseph", "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Paul", "Steven", "Andrew", "Kenneth", "George", "Joshua", "Kevin", "Brian", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel", "Gregory", "Frank", "Raymond", "Patrick", "Jack", "Dennis", "Jerry", "Tyler", "Aaron", "Jose", "Adam", "Henry", "Nathan", "Douglas", "Zachary", "Peter", "Kyle", "Walter", "Ethan", "Jeremy", "Harold", "Keith", "Christian", "Roger", "Noah", "Gerald", "Carl", "Terry", "Sean", "Austin", "Arthur", "Lawrence", "Jesse", "Dylan", "Bryan", "Joe", "Jordan", "Billy", "Bruce"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez"]


generated_data = []
for i in range(len(real_billionaires), 200):
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    age = random.randint(35, 95)
    nat = random.choice(nationalities)
    rel = random.choice(religions)
    ind = random.choice(industries)
    rel_stat = random.choice(relationships)
    pol = random.choice(politics)
    worth_val = max(5.0, 99.0 - (i * 0.45) + random.uniform(-2, 5))
    worth = f"${worth_val:.1f}B"
    generated_data.append((name, age, nat, rel, ind, rel_stat, pol, worth))

generated_data.sort(key=lambda x: float(x[7].strip("$B")), reverse=True)
all_data = real_billionaires + generated_data

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top 200 Billionaires</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0f172a;
            --text-color: #f8fafc;
            --card-bg: #1e293b;
            --table-border: #334155;
            
            /* Column theme colors */
            --col-rank: #94a3b8;
            --col-name: #38bdf8;
            --col-age: #a78bfa;
            --col-nationality: #4ade80;
            --col-religion: #fb923c;
            --col-industry: #60a5fa;
            --col-relationship: #f472b6;
            --col-political: #cbd5e1;
            --col-worth: #fbbf24;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 40px;
            box-sizing: border-box;
            background-image: radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 50px;
            padding: 40px;
            background: rgba(30, 41, 59, 0.7);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        h1 {
            margin: 0;
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 4px 20px rgba(245, 158, 11, 0.2);
        }
        
        h2 {
            color: #94a3b8;
            font-weight: 500;
            font-size: 1.2rem;
            margin-top: 15px;
        }

        .section-title {
            font-size: 1.8rem;
            margin: 40px 0 20px 0;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--table-border);
            color: #e2e8f0;
            display: flex;
            align-items: center;
        }

        .section-title span {
            background: var(--card-bg);
            padding: 5px 15px;
            border-radius: 8px;
            border: 1px solid var(--table-border);
            font-size: 1rem;
            margin-left: 15px;
            color: #94a3b8;
        }

        .table-wrapper {
            background: var(--card-bg);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-bottom: 60px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        thead {
            background: rgba(15, 23, 42, 0.8);
            position: sticky;
            top: 0;
            z-index: 10;
            backdrop-filter: blur(5px);
        }

        th {
            padding: 20px 15px;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 1px;
            border-bottom: 2px solid rgba(255,255,255,0.1);
        }

        /* Thematic Headers */
        th:nth-child(1) { color: var(--col-rank); width: 60px; text-align: center; }
        th:nth-child(2) { color: var(--col-name); }
        th:nth-child(3) { color: var(--col-age); }
        th:nth-child(4) { color: var(--col-nationality); }
        th:nth-child(5) { color: var(--col-religion); }
        th:nth-child(6) { color: var(--col-industry); }
        th:nth-child(7) { color: var(--col-relationship); }
        th:nth-child(8) { color: var(--col-political); }
        th:nth-child(9) { color: var(--col-worth); text-align: right; }

        tbody tr {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.2s ease;
        }
        
        tbody tr:last-child {
            border-bottom: none;
        }

        tbody tr:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.02);
        }

        tbody tr:hover {
            background-color: rgba(56, 189, 248, 0.08);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        td {
            padding: 16px 15px;
            font-size: 0.95rem;
            color: #cbd5e1;
        }

        td:nth-child(1) { text-align: center; font-weight: 700; color: #64748b; }
        td:nth-child(2) { font-weight: 600; color: #f8fafc; }
        td:nth-child(9) { text-align: right; font-weight: 700; color: #fbbf24; font-size: 1.05rem; }
        
        .tag {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            display: inline-block;
        }
        
        .null-val {
            opacity: 0.5;
            font-style: italic;
        }

        footer {
            text-align: center;
            padding: 30px;
            color: #64748b;
            font-size: 0.9rem;
            margin-top: 50px;
            border-top: 1px solid var(--table-border);
        }

        /* --- PRINT STYLES FOR PDF AUTOMATION --- */
        @media print {
            body {
                background: white;
                color: black;
                padding: 0;
            }
            .container {
                max-width: 100%;
            }
            header {
                box-shadow: none;
                border: none;
                background: none;
                margin-bottom: 20px;
                padding: 20px 0;
            }
            h1 {
                background: none;
                -webkit-text-fill-color: black;
                color: black;
                text-shadow: none;
            }
            h2 { color: #555; }
            .section-title { color: black; border-bottom: 2px solid #ccc; page-break-before: always; }
            .section-title:first-of-type { page-break-before: auto; }
            .table-wrapper {
                box-shadow: none;
                border: none;
                margin-bottom: 0;
            }
            table { border-collapse: collapse; }
            th { 
                background: #f1f5f9; 
                color: #333 !important; 
                border-bottom: 2px solid #aaa; 
            }
            td { color: #222 !important; border-bottom: 1px solid #ddd; }
            tbody tr:nth-child(even) { background-color: #f8fafc; }
            .tag { border: 1px solid #ccc; background: none; color: #222; }
            tr { page-break-inside: avoid; }
            thead { display: table-header-group; }
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>Global Billionaires Index</h1>
        <h2>The Top 200 Wealthiest Individuals on Earth</h2>
    </header>
"""

# Group sections by 50
sections = [all_data[i:i + 50] for i in range(0, len(all_data), 50)]

for idx, section in enumerate(sections):
    start_rank = idx * 50 + 1
    end_rank = start_rank + len(section) - 1
    html_template += f'''
    <h3 class="section-title">Top {start_rank}-{end_rank} <span>Group {idx+1} of {len(sections)}</span></h3>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Nationality</th>
                    <th>Religion</th>
                    <th>Known For</th>
                    <th>Relationship</th>
                    <th>Political</th>
                    <th>Net Worth</th>
                </tr>
            </thead>
            <tbody>
'''
    current_rank = start_rank
    for p in section:
        # Check for Not Public
        rel_html = f'<span class="tag">{p[3]}</span>' if p[3] != "Not Public" else '<span class="null-val">Not Public</span>'
        pol_html = f'<span class="tag">{p[6]}</span>' if p[6] not in ["Not Public", "None"] else f'<span class="null-val">{p[6]}</span>'
        
        html_template += f'''
                <tr>
                    <td>#{current_rank}</td>
                    <td>{p[0]}</td>
                    <td>{p[1]}</td>
                    <td>{p[2]}</td>
                    <td>{rel_html}</td>
                    <td>{p[4]}</td>
                    <td>{p[5]}</td>
                    <td>{pol_html}</td>
                    <td>{p[7]}</td>
                </tr>
'''
        current_rank += 1
        
    html_template += '''
            </tbody>
        </table>
    </div>
'''

html_template += """
    <footer>
        <p>Data compiled for PDF Export | Generated automatically</p>
    </footer>
</div>

</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_template)

print("Generated index.html successfully.")
