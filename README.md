# Leave Request App
The application displays employee leave reports along with real-time summary graphs, created with Angular 18.

## Tech Stack
- Angular 18
- Charts 4.5
- Standalone Component
- REST API (Backend)
  
## Project Specs
 - Angular CLI: 18.2.20
 - Node: 22.17.1
 - Package Manager: npm 10.9.2
 - OS: win32 x64
```
Project structure 
src/
└── app/
    ├── dashboard-component/
    │   ├── dashboard-component.component.ts
    │   ├── dashboard-component.component.html
    │   ├── dashboard-component.component.scss
    │   └── dashboard-component.component.spec.ts
    │
    ├── leave-balance-display-component/
    │   ├── leave-balance-display-component.component.ts
    │   ├── leave-balance-display-component.component.html
    │   ├── leave-balance-display-component.component.scss
    │   └── leave-balance-display-component.component.spec.ts
    │
    ├── leave-history-component/
    │   ├── leave-history-component.component.ts
    │   ├── leave-history-component.component.html
    │   ├── leave-history-component.component.scss
    │   └── leave-history-component.component.spec.ts
    │
    ├── manager-leave/
    │   ├── manager-leave.component.ts
    │   ├── manager-leave.component.html
    │   ├── manager-leave.component.scss
    │   └── manager-leave.component.spec.ts
    │
    ├── request-leave-component/
    │   ├── request-leave-component.component.ts
    │   ├── request-leave-component.component.html
    │   ├── request-leave-component.component.scss
    │   └── request-leave-component.component.spec.ts
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.scss
    ├── app.component.spec.ts
    │
    ├── app.config.ts              
    ├── app.config.server.ts      
    └── app.routes.ts   
```
## Installation
install dependencies:
```
npm install
```
start serve:
```
ng serve
```
Undo
The approval and statistics panel is not accessible to anyone except for the administrator.
