# IDAAR | Intelligent Dynamic Automated Approval & Routing

[![Power Automate](https://img.shields.io/badge/Powered%20by-Microsoft%20Power%20Automate-blue?logo=microsoft-power-automate&logoColor=white)](https://flow.microsoft.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**IDAAR** is a comprehensive, role-based faculty management system designed to streamline college administrative processes through intelligent automation. This project serves as a showcase for end-to-end multi-step approval workflows, leveraging the full power of Microsoft Power Automate, Power Apps, and the Microsoft 365 ecosystem.

---

## Screenshots

<img width="1890" height="962" alt="Screenshot 2026-02-04 at 7 26 43 PM" src="https://github.com/user-attachments/assets/97bca323-d2cb-4e81-a483-390b795348a1" />

<img width="1885" height="966" alt="Screenshot 2026-02-04 at 7 26 54 PM" src="https://github.com/user-attachments/assets/3010b22b-1f19-42bb-a32e-8268b8d5c2e7" />

![Uploading Screenshot 2026-02-04 at 7.27.04 PM.png…]()


## 🚀 Vision

Administrative tasks in educational institutions often suffer from "approval bottlenecks." IDAAR solves this by implementing dynamic routing logic that ensures every request—be it leave, budget, or equipment—finds the right approver at the right time, with zero manual intervention.

## 🛠️ Power Automate Expertise Showcased

This system demonstrates advanced proficiency in Microsoft Power Platform, specifically focusing on:

### 1. Intelligent Triggers & Logic
- **Event-Driven Workflows:** Primarily triggered by SharePoint list events and Power Apps form submissions.
- **Dynamic Branching:** Sophisticated `If/Else` conditions and `Switch` cases based on request type, department, and monetary value.
- **Parallel Processing:** Implementing concurrent approval paths for complex requests requiring multi-departmental sign-off.

### 2. Role-Based Routing Architecture
- **Hierarchical Lookup:** Automated manager-chain discovery using Office 365 Users connector.
- **Custom Routing Tables:** Role-based access control (RBAC) ensuring that only authorized personnel can view or approve specific request stages.
- **Automated Escalation:** Time-bound conditions that automatically escalate pending approvals to the next level (Dean/Registrar) to prevent delays.

### 3. Enterprise Integration
- **Cross-Service Communication:** Seamless data flow between SharePoint Online, Dataverse (formerly Common Data Service), and Azure SQL.
- **Smart Notifications:** Contextual alerts delivered via Outlook (Email) and Microsoft Teams (Adaptive Cards) with interactive buttons.
- **Data Governance:** Automated status updates and logging in a centralized repository for audit trails.

---

## 🔄 The Approval Journey

The system visualizes a typical 8-step journey:

1.  **Initiation:** Faculty submits a request via the Power Apps portal.
2.  **Environment Setup:** Variables are initialized for tracking throughout the flow.
3.  **Category Check:** Intelligent categorisation determines the routing path.
4.  **Approver Discovery:** Dynamic retrieval of the correct authority (HOD, Dean, etc.).
5.  **Active Approval:** "Start and Wait for Approval" action creates an interactive task.
6.  **Outcome Evaluation:** Analysis of the decision (Approve/Reject/Request Info).
7.  **System Sync:** SharePoint/Dataverse updated with 100% data integrity.
8.  **Closure:** Multi-channel notification sent to the original requester.

---

## 🖥️ Tech Stack

- **Automation:** Microsoft Power Automate (Flow)
- **Application Layer:** Power Apps (Canvas/Model-Driven)
- **Data Layer:** SharePoint Online, Microsoft Dataverse
- **Security:** Azure Active Directory (Azure AD)
- **Collaboration:** Microsoft Teams, Outlook
- **Frontend (Portfolio):** HTML5, Vanilla CSS3 (Glassmorphism), JavaScript (ES6+)

---

## ⚡ Dashboard & Analytics

The integrated dashboard provides administrators with real-time insights:
- **Approval Velocity:** Average response time tracking.
- **Volume Metrics:** Total approvals vs. rejections per department.
- **Active Monitoring:** Live feed of every request currently in the "Automation Tunnel."

---

## 🔧 Installation / Local Viewing

To view the interactive portfolio version of this system:

1. Clone the repository:
   ```bash
   git clone https://github.com/harshbatra01/Idaar.git
   ```
2. Open `index.html` in your browser or run a local server:
   ```bash
   # If you have python installed
   python -m http.server 8080
   ```
3. Navigate to `http://localhost:8080`

---

## 👨‍💻 Author

**Harsh Batra**
*Power Platform Developer & Automation Specialist*

---

> "Automation is not just about replacing human effort; it's about amplifying human potential by removing the mundane."
