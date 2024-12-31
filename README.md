# 📸 Image Optimizer CLI Tool

A **Node.js command-line tool** to optimize and resize images efficiently. Supports JPEG, PNG, and WebP formats with customizable options.

---

## 🚀 Features

✅ **Folder and File Support:** Optimize images in a folder or a single file.  
✅ **Customizable Options:** Set image quality, format, and resizing limits.  
✅ **Optimized Directory:** Creates a separate `optimized` folder for output.  
✅ **Supported Formats:** JPEG, PNG, WebP.  

---

## 📦 Installation

Make sure you have **Node.js** installed. Then clone the repository:

```bash
git clone https://github.com/your-username/image-optimizer.git
cd image-optimizer
npm install
```

---

## ⚙️ Usage

### Optimize a Folder:
```bash
node optimize-images.js ./path/to/folder --quality=80 --width=1200 --height=1200 --format=webp
```

### Optimize a Single File:
```bash
node optimize-images.js ./path/to/image.jpg --quality=90 --format=jpeg
```

### Options:

| Option       | Description                    | Default  |
|--------------|--------------------------------|---------:|
| `--quality`  | Image quality (0-100)          | `80`     |
| `--width`    | Maximum width for resizing     | `1200`   |
| `--height`   | Maximum height for resizing    | `1200`   |
| `--format`   | Output format (`jpeg/png/webp`) | `jpeg`   |

---

## 🛠️ Example Directory Structure

```
/images
    ├── photo1.jpg
    ├── photo2.png
/optimized
    ├── photo1.jpg
    ├── photo2.jpg
```

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-branch`).  
3. Commit your changes (`git commit -m 'Add new feature'`).  
4. Push to the branch (`git push origin feature-branch`).  
5. Create a Pull Request.  

---

## 💬 Feedback

Feel free to open an **issue** if you encounter any problems.

**Made with ❤️ by [Your Name]**