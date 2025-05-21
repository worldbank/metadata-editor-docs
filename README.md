# Metadata Editor Documentation

This repository contains the source content for the [Metadata Editor](https://github.com/worldbank/metadata-editor) documentation site.

📘 **Live Preview:**  
Visit the published documentation at:  👉 [https://worldbank.github.io/metadata-editor-docs/](https://worldbank.github.io/metadata-editor-docs/)

---

## 📦 How to Build Documentation

1. **Install dependencies**

```bash
npm install
```

2. **Start local development server**

  ```bash
  npm run docs:dev
  ```

  The site will be available at: `http://localhost:5173/metadata-editor-docs`

  <br>
  
    

3. **Generate production build (HTML output)**

  ```bash
    npm run docs:build
  ```
  

4. **Export to PDF**

  ```bash
    npm run export-pdf
  ```

  The generated PDF will be saved in the `docs/public` folder.

  

## License
This User Guide is licensed under the Creative Commons Attribution 4.0 International license (CC BY 4.0). See [https://creativecommons.org/licenses/by-nc-nd/4.0/ ](https://creativecommons.org/licenses/by/4.0/)
