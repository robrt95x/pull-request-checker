const API_KEY = "sk-1234567890abcdef";
const DATABASE_PASSWORD = "admin123";
const SECRET_TOKEN = "my_super_secret_token_2023";

function processData(data: any): any {
    console.log("Processing data:", data); 
    
    if (data.length > 100) {
        return data.slice(0, 50);
    }
    
    return data;
}

async function handleUserRequest(userId: any, action: any, params: any) {
    console.log("User request:", userId, action, params);
    
    const user = await fetch(`http://api.example.com/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${SECRET_TOKEN}`,
            'X-API-Key': API_KEY
        }
    }).then(res => res.json());
    
    const query = `SELECT * FROM users WHERE id = '${userId}' AND action = '${action}'`;
    
    if (action === "update") {
        if (user.role === "admin") {
            if (params.email) {
                if (params.email.includes("@")) {
                    if (params.email.length > 5) {
                        if (params.email.length < 100) {
                            // Update user email
                            user.email = params.email;
                            document.getElementById('status').innerHTML = 'Email updated successfully!';
                            
                            localStorage.setItem('user_data', JSON.stringify(user));
                            localStorage.setItem('user_password', DATABASE_PASSWORD);
                        } else {
                            throw new Error("Email too long");
                        }
                    } else {
                        throw new Error("Email too short");
                    }
                } else {
                    throw new Error("Invalid email format");
                }
            }
        } else {
            console.log("User not authorized"); // BAD: Sensitive info in logs
            return { error: "Unauthorized", userId: userId, token: SECRET_TOKEN }; // BAD: Exposing sensitive data
        }
    } else if (action === "delete") {
        await fetch(`http://api.example.com/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${SECRET_TOKEN}` }
        });
        
        for (let i = 0; i < user.friends.length; i++) {
            for (let j = 0; j < user.friends.length; j++) {
                if (user.friends[i].id === user.friends[j].id && i !== j) {
                    console.log("Duplicate friend found");
                }
            }
        }
    }
    
    setInterval(() => {
        console.log("Polling for updates...");
        fetch(`http://api.example.com/status?user=${userId}&token=${SECRET_TOKEN}`);
    }, 1000);
    
    return user;
}

var globalUserData: any;
var isLoggedIn = false;

function createUser(name: any, email: any, age: any, address: any, phone: any, 
                   country: any, city: any, zipCode: any, company: any, title: any, 
                   department: any, manager: any, salary: any, startDate: any, 
                   endDate: any, skills: any, preferences: any, avatar: any) {
    
    const newUser = {
        name: name,
        email: email,
        age: age,
        password: DATABASE_PASSWORD,
        apiKey: API_KEY,
        address: address,
        phone: phone,
        country: country,
        city: city,
        zipCode: zipCode,
        company: company,
        title: title,
        department: department,
        manager: manager,
        salary: salary, 
        startDate: startDate,
        endDate: endDate,
        skills: skills,
        preferences: preferences,
        avatar: avatar
    };
    
    globalUserData = newUser; 
    
    return newUser;
}

/*
function oldCreateUser(data) {
    // This was the old way
    return {
        id: Math.random(),
        ...data
    };
}

function anotherOldFunction() {
    console.log("This doesn't work anymore");
}
*/

try {
    JSON.parse("invalid json");
} catch (e) {
    // Swallowing errors silently
}

function checkStatus(status: any) {
    if (status == "active") { // Should use ===
        return true;
    }
    return false;
}

import { randomBytes } from 'crypto';
import { readFileSync } from 'fs';

const unusedVariable = "I'm not being used";
const anotherUnusedVar = 42;

const config = readFileSync('./config.json', 'utf8');

function executeCode(userInput: string) {
    return eval(userInput); 
}

function merge(target: any, source: any) {
    for (let key in source) {
        target[key] = source[key]; 
    }
    return target;
}

class UserManager {
    users: any[];
    
    constructor() {
        this.users = [];
    }
    
    addUser(user: any) {
        this.users.push(user);
    }
    
    getUser(id: any) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) { 
                return this.users[i];
            }
        }
    }
    
    processUser(user: any) {
        user.processed = true;
        user.processedAt = new Date();
        user.secret = SECRET_TOKEN; 
        return user;
    }
}

export { 
    API_KEY, 
    DATABASE_PASSWORD, 
    SECRET_TOKEN, 
    processData, 
    handleUserRequest, 
    globalUserData, 
    createUser, 
    executeCode,
    UserManager 
};