function generateBillionaires() {
    const nationalities = ['USA', 'China', 'France', 'India', 'Germany', 'UK', 'Russia', 'Japan', 'Brazil', 'Canada'];
    const religions = ['Christianity', 'Irreligious', 'Hinduism', 'Judaism', 'Not Public', 'Islam'];
    const industries = ['Technology', 'Fashion & Retail', 'Finance & Investments', 'Automotive', 'Real Estate', 'Media & Entertainment', 'Energy', 'Food & Beverage', 'Healthcare', 'Manufacturing'];
    const relationships = ['Married', 'Divorced', 'Single', 'Widowed', 'Engaged'];
    const political = ['None', 'Democratic', 'Republican', 'Not Public', 'Independent'];
    
    // Hardcoded Top 10 for realistic grounding
    const top10 = [
        { name: "Elon Musk", age: 52, nationality: "USA", religion: "Irreligious", knownFor: "Automotive, Technology", relationshipStatus: "Single", politicalAffiliation: "None", netWorth: "$210B" },
        { name: "Bernard Arnault", age: 75, nationality: "France", religion: "Catholic", knownFor: "Fashion & Retail", relationshipStatus: "Married", politicalAffiliation: "None", netWorth: "$201B" },
        { name: "Jeff Bezos", age: 60, nationality: "USA", religion: "Not Public", knownFor: "Technology", relationshipStatus: "Engaged", politicalAffiliation: "None", netWorth: "$194B" },
        { name: "Mark Zuckerberg", age: 39, nationality: "USA", religion: "Judaism", knownFor: "Technology", relationshipStatus: "Married", politicalAffiliation: "None", netWorth: "$165B" },
        { name: "Larry Ellison", age: 79, nationality: "USA", religion: "Judaism", knownFor: "Technology", relationshipStatus: "Married", politicalAffiliation: "Republican", netWorth: "$144B" },
        { name: "Warren Buffett", age: 93, nationality: "USA", religion: "Agnostic", knownFor: "Finance & Investments", relationshipStatus: "Widowed", politicalAffiliation: "Democratic", netWorth: "$133B" },
        { name: "Bill Gates", age: 68, nationality: "USA", religion: "Catholic", knownFor: "Technology", relationshipStatus: "Divorced", politicalAffiliation: "Democratic", netWorth: "$128B" },
        { name: "Steve Ballmer", age: 68, nationality: "USA", religion: "Judaism", knownFor: "Technology", relationshipStatus: "Married", politicalAffiliation: "Democratic", netWorth: "$121B" },
        { name: "Mukesh Ambani", age: 66, nationality: "India", religion: "Hinduism", knownFor: "Diversified", relationshipStatus: "Married", politicalAffiliation: "None", netWorth: "$114B" },
        { name: "Larry Page", age: 51, nationality: "USA", religion: "Not Public", knownFor: "Technology", relationshipStatus: "Married", politicalAffiliation: "Democratic", netWorth: "$110B" }
    ];

    const data = [...top10];
    
    // Auto-generate the remaining 190 billionaires
    for (let i = 11; i <= 200; i++) {
        const netWorthVal = Math.max(2, Math.floor(100 - (i * 0.4))); 
        data.push({
            name: `Billionaire Rank ${i}`,
            age: Math.floor(Math.random() * 50) + 35,
            nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
            religion: religions[Math.floor(Math.random() * religions.length)],
            knownFor: industries[Math.floor(Math.random() * industries.length)],
            relationshipStatus: relationships[Math.floor(Math.random() * relationships.length)],
            politicalAffiliation: political[Math.floor(Math.random() * political.length)],
            netWorth: `$${netWorthVal}B`
        });
    }
    
    return data;
}

module.exports = generateBillionaires;
