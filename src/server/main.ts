// serve/src/index.ts
import express from 'express';
import type { Request, Response } from 'express';
import ViteExpress from "vite-express";
import path from 'path';
import { fileURLToPath } from 'url'; // 新增导入
import { dirname } from 'path'; // 新增导入

const isProduction = process.env.NODE_ENV === 'production'; // 新增：判断是否为生产环境
const __filename = fileURLToPath(import.meta.url); // 新增
const __dirname = dirname(__filename); // 新增
console.log(__filename, __dirname)

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client

console.log(isProduction, path.join(__dirname, isProduction ? '../dist' : '../../dist'))
app.use(express.static(path.join(__dirname, isProduction ? '../dist' : '../../dist'))); // 根据环境选择路径

// Example API route
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express!' });
});

// Fallback for all other routes to index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, isProduction ? '../dist/index.html' : '../../src/dist/index.html')); // 根据环境选择路径
});

ViteExpress.listen(app, PORT as number, () =>
  console.log(`Server is running on port ${PORT}`)
);

