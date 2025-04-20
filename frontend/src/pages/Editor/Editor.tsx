import EntityList from "@/shared/components/EntityList/EntityList";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import "./Editor.css";

const Editor: React.FC = () => {
  const [value, setValue] = React.useState(`{
  "serviceName": "user-service",
  "environment": "production",
  "port": 8080,
  "logLevel": "info",
  "database": {
    "host": "db.example.com",
    "port": 5432,
    "username": "user_service",
    "password": "s3cr3tP@ssw0rd",
    "name": "users_db"
  },
  "redis": {
    "host": "redis.example.com",
    "port": 6379,
    "password": "redisP@ss"
  },
  "featureFlags": {
    "enableNewUserFlow": true,
    "useExternalAuth": false
  },
  "rateLimit": {
    "windowMs": 60000,
    "maxRequests": 100
  },
  "auth": {
    "jwtSecret": "supersecretjwtkey",
    "tokenExpiry": "1h"
  },
  "externalApis": {
    "emailServiceUrl": "https://email.example.com/send",
    "smsServiceUrl": "https://sms.example.com/send"
  },
  "maintenanceMode": false
}`);

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <>
      <div className="flex flex-row h-full">
        <div className="flex flex-row h-full">
          <EntityList
            items={[
              { id: "acme-corp-fef", label: "Acme Corp", active: true },
              { id: "globex-inc", label: "Globex Inc", active: false },
              { id: "initech", label: "Initech", active: true },
              { id: "umbrella-corp", label: "Umbrella Corp", active: false },
              {
                id: "wayne-enterprises",
                label: "Wayne Enterprises",
                active: true,
              },
              {
                id: "stark-industries",
                label: "Stark Industries",
                active: true,
              },
              { id: "hooli", label: "Hooli", active: false },
              { id: "pied-piper", label: "Pied Piper", active: true },
              {
                id: "cyberdyne-systems",
                label: "Cyberdyne Systems",
                active: false,
              },
              { id: "tyrell-corp", label: "Tyrell Corp", active: true },
              { id: "weyland-yutani", label: "Weyland-Yutani", active: true },
            ]}
            header="Organizations"
            selection={["acme-corp-fef"]}
            addLabel="organization"
            searchLabel="Search organizations..."
          />
          <EntityList
            items={[
              { id: "billing", label: "billing-service", active: true },
              { id: "auth", label: "auth-service", active: true },
              { id: "user", label: "user-service", active: false },
              { id: "product", label: "product-service", active: true },
              { id: "order", label: "order-service", active: true },
              { id: "inventory", label: "inventory-service", active: true },
              { id: "payment", label: "payment-service", active: true },
              {
                id: "notification",
                label: "notification-service",
                active: true,
              },
              { id: "shipping", label: "shipping-service", active: true },
              { id: "analytics", label: "analytics-service", active: true },
            ]}
            header="Services"
            selection={["payment"]}
            addLabel="services"
            searchLabel="Search services..."
          />
          <EntityList
            items={[
              { id: "dev", label: "DEV", active: true },
              { id: "qa", label: "QA", active: true },
              { id: "uat", label: "UAT", active: false },
              { id: "prod", label: "PROD", active: true },
            ]}
            header="Environments"
            selection={["dev"]}
            addLabel="environment"
            searchLabel="Search environments..."
          />
        </div>
        <div className="flex position-relative flex-col flex-grow h-full overflow-auto bg-red-500 border-l">
          <CodeMirror
            className="flex-grow text-lg overflow-auto"
            theme={githubDark}
            value={value}
            width="100%"
            height="100%"
            maxHeight="calc(100vh - 25px)"
            extensions={[json()]}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default Editor;
