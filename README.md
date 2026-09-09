# 🗓️ Controle Diário

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como Executar</a>
  <br/>
  <br/>
  <a href="#-about-the-project">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-run">How to Run</a>
</p>

---

## 🇧🇷 Versão em Português

### 💻 Sobre o Projeto
O **Controle Diário** é um gerenciador de tarefas (To-Do List) moderno, responsivo e focado em uma experiência de usuário limpa e intuitiva. O projeto utiliza o estado local do navegador para persistência de dados, eliminando a necessidade de um banco de dados externo para o funcionamento básico e tornando-o ideal para hospedagem estática e rápida.

### ✨ Funcionalidades
* **Criação de Tarefas Dinâmica:** Criação através de um modal (Dialog) acessível diretamente no cabeçalho da aplicação.
* **Layout Totalmente Responsivo:** Grid fluido construído com Tailwind CSS que se adapta perfeitamente de 1 card por linha em celulares até 4 cards em notebooks.
* **Persistência com LocalStorage:** Suas tarefas permanecem salvas no navegador mesmo se você fechar ou atualizar a página.
* **Filtros Avançados:** Filtre suas tarefas simultaneamente por Tipo (Baixa, Média, Alta) e múltiplos Status através de um menu contextual inteligente.
* **Gerenciamento de Status em Tempo Real:** Altere o status da tarefa diretamente no card com atualizações visuais instantâneas.
* **Suporte a Dark Mode:** Integração nativa com troca de temas (Claro, Escuro e Sistema).

### 🛠️ Tecnologias
* **Next.js** (App Router)
* **React** (Hooks e Custom Events)
* **Shadcn/ui** (Componentes acessíveis com Radix UI)
* **Tailwind CSS** (Estilização e Grid Responsivo)
* **Lucide React** (Ícones)

### 🚀 Como Executar o Projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Se quiser testar diretamente no celular na mesma rede Wi-Fi:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

---

## 🇺🇸 English Version

### 💻 About the Project
**Controle Diário** (Daily Control) is a modern, responsive task manager (To-Do List) focused on providing a clean and intuitive user experience. The project uses the browser's local state for data persistence, eliminating the need for an external database for basic operations and making it perfect for fast, static hosting.

### ✨ Features
* **Dynamic Task Creation:** Tasks can be added through an accessible modal (Dialog) directly from the application's header.
* **Fully Responsive Layout:** A fluid grid built with Tailwind CSS that adapts perfectly from 1 card per row on mobile devices to 4 cards on laptops.
* **LocalStorage Persistence:** Your tasks remain saved in the browser even if you close or refresh the page.
* **Advanced Filters:** Filter your tasks simultaneously by Type (Low, Medium, High) and multiple Statuses using a smart contextual menu.
* **Real-time Status Management:** Change the task status directly inside the card with instant visual feedback.
* **Dark Mode Support:** Native integration with theme toggling (Light, Dark, and System).

### 🛠️ Technologies
* **Next.js** (App Router)
* **React** (Hooks and Custom Events)
* **Shadcn/ui** (Accessible components powered by Radix UI)
* **Tailwind CSS** (Styling and Responsive Grid)
* **Lucide React** (Icons)

### 🚀 How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. To test directly on your mobile device over the same Wi-Fi network:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

---
<p align="center">Desenvolvido com 💙 utilizando Next.js & Shadcn/ui</p>
