// Khởi tạo CodeMirror editor
const editor = CodeMirror(document.getElementById("editor"), {
  mode: "htmlmixed",
  theme: "dracula",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  tabSize: 2,
  lineWrapping: true,
});
editor.setSize("100%", "100%");

// Dữ liệu mẫu cho file system
let fileSystem = {
  id: 1,
  name: "root",
  children: [
    {
      id: 2,
      name: "index.html",
      content: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>My Website</title>
                      <link rel="stylesheet" href="style.css">
                  </head>
                  <body>
                      <h1>Welcome to my website!</h1>
                      <p>This is a sample HTML file.</p>
                      <script src="script.js"></script>
                  </body>
                </html>`,
    },
    {
      id: 3,
      name: "style.css",
      content: `body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                  background-color: #f0f0f0;
                      }

                  h1 {
                      color: #333;
                      text-align: center;
                  }

                  p {
                      color: #666;
                      line-height: 1.6;
                }`,
    },
    {
      id: 4,
      name: "script.js",
      content: `console.log("Hello from JavaScript!");
                  function greet(name) {
                      return "Hello, " + name + "!";
                  }
                  document.addEventListener('DOMContentLoaded', function() {
                      console.log("Page loaded successfully!");
                });`,
    },
    {
      id: 5,
      name: "images",
      children: [
        {
          id: 6,
          name: "logo.png",
          content:
            "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
        },
        {
          id: 7,
          name: "icons",
          children: [
            {
              id: 8,
              name: "home.svg",
              content:
                "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
            },
            {
              id: 9,
              name: "user.svg",
              content:
                "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
            },
          ],
        },
        {
          id: 10,
          name: "backgrounds",
          children: [
            {
              id: 11,
              name: "hero.jpg",
              content:
                "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
            },
            {
              id: 12,
              name: "footer.jpg",
              content:
                "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
            },
          ],
        },
      ],
    },
    {
      id: 13,
      name: "docs",
      children: [
        {
          id: 14,
          name: "README.md",
          content: `# My Project

This is a sample project with HTML, CSS, and JavaScript files.

## Features
- HTML structure
- CSS styling
- JavaScript functionality

## Usage
Open index.html in your browser to see the result.`,
        },
        {
          id: 15,
          name: "api",
          children: [
            {
              id: 16,
              name: "endpoints.md",
              content: "# API Endpoints\n\nList of available endpoints...",
            },
            {
              id: 17,
              name: "examples",
              children: [
                {
                  id: 18,
                  name: "user.json",
                  content: '{"name": "John", "email": "john@example.com"}',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Biến toàn cục
let currentFile = null;
let selectedItem = null;
let nextId = 9;

// DOM elements
const fileTree = document.getElementById("fileTree");
const currentFileName = document.getElementById("currentFileName");
const previewFrame = document.querySelector("#preview");
const customMenu = document.querySelector("#customMenu");
const renameModal = document.getElementById("renameModal");
const renameInput = document.getElementById("renameInput");

// Toolbar buttons
const newFileBtn = document.getElementById("newFile");
const newFolderBtn = document.getElementById("newFolder");
const refreshBtn = document.getElementById("refreshExplorer");

// Context menu items
const newFileMenu = document.getElementById("newFileMenu");
const newFolderMenu = document.getElementById("newFolderMenu");
const renameMenu = document.getElementById("renameMenu");
const deleteMenu = document.getElementById("deleteMenu");
const clearCodeBtn = document.getElementById("clearCode");

// Modal buttons
const confirmRenameBtn = document.getElementById("confirmRename");
const cancelRenameBtn = document.getElementById("cancelRename");

// Utility functions
// Lấy phần mở rộng (đuôi) của tên file, ví dụ: 'txt', 'jpg', 'js'
function getFileExtension(filename) {
  return filename.split(".").pop().toLowerCase();
}

// Lấy icon phù hợp cho từng loại file để hiển thị trong cây thư mục
function getFileIcon(filename) {
  const extension = getFileExtension(filename);
  const iconMap = {
    html: "fab fa-html5",
    css: "fa-brands fa-css3-alt",
    js: "fa-brands fa-js",
    json: "fas fa-file-code",
    md: "fa-brands fa-markdown",
    txt: "fa-solid fa-file-lines",
    png: "fa-solid fa-image",
    jpg: "fa-solid fa-image",
    jpeg: "fa-solid fa-image",
    gif: "fa-solid fa-image",
    svg: "fa-solid fa-image",
    webp: "fa-solid fa-image",
    bmp: "fa-solid fa-image",
    pdf: "fa-solid fa-file-pdf",
    zip: "fa-solid fa-file-zipper",
    rar: "fa-solid fa-file-zipper",
    mp3: "fa-solid fa-music",
    mp4: "fa-solid fa-clapperboard",
    avi: "fa-solid fa-clapperboard",
    mov: "fa-solid fa-clapperboard",
  };

  return iconMap[extension] || "fa-solid fa-file";
}

// Chọn chế độ (mode) cho CodeMirror dựa vào loại file (html, css, js, ...)
function getCodeMirrorMode(filename) {
  const extension = getFileExtension(filename);
  const modeMap = {
    html: "htmlmixed",
    css: "css",
    js: "javascript",
    json: "application/json",
    md: "markdown",
    txt: "text/plain",
  };

  return modeMap[extension] || "text/plain";
}

// Tìm và trả về file hoặc thư mục theo id (đệ quy toàn bộ cây)
function findFileById(id, node = fileSystem) {
  if (node.id === id) return node;
  if (node.children) {
    for (let child of node.children) {
      const result = findFileById(id, child);
      if (result) return result;
    }
  }
  return null;
}

// Tìm và trả về thư mục cha của một file/thư mục theo id
function findParentById(id, node = fileSystem, parent = null) {
  if (node.children) {
    for (let child of node.children) {
      if (child.id === id) return parent;
      const result = findParentById(id, child, node);
      if (result) return result;
    }
  }
  return null;
}

// Vẽ cây thư mục và file ra giao diện (đệ quy cho mọi cấp)
function renderFileTree(node = fileSystem) {
  const li = document.createElement("li");
  li.className = "file-item";
  li.dataset.id = node.id;

  if (node.children) {
    // Nếu là Folder thì sẽ có childrent và không có content
    li.classList.add("folder");
    li.innerHTML = `
      <span class="chevron">${
        node.expanded
          ? `<i class="fa-solid fa-caret-down"></i>`
          : `<i class="fa-solid fa-caret-right"></i>`
      }</span>
      <i class="fa-solid fa-folder"></i>
      <span class="name">${node.name}</span>
    `;

    // Click để toggle folder
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      // Hiển thị thư mục và các file bên trong
      node.expanded = !node.expanded;
      // Cập nhật lại tree
      refreshFileTree();
    });

    // Context menu cho folder
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectedItem = node;
      showContextMenu(e);
    });

    // Render children nếu có childrent - đệ quy
    // Chỉ hiển thị khi mở hiển thị folder đó
    if (node.expanded && node.children && node.children.length > 0) {
      const ul = document.createElement("ul");
      ul.className = "folder-children";

      // Đệ quy cho từng child
      node.children.forEach((child) => {
        const childLi = renderFileTree(child);
        ul.appendChild(childLi);
      });

      li.appendChild(ul);
    }
  } else {
    // Nếu là File thì sẽ có content và không có childrent
    const icon = getFileIcon(node.name);
    li.innerHTML = `
      <span class="chevron"></span>
      <i class="${icon.includes("fa-") ? icon : "fa-file"}"></i>
      <span class="name">${node.name}</span>
    `;

    // Click để select file
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      // Chạy pương thức chọn file, hiển thị edit và preview
      selectFile(node);
    });

    // Context menu cho file
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectedItem = node;
      showContextMenu(e);
    });
  }

  li.style.paddingLeft = `16px`;
  return li;
}

// Khi click chọn file, hiển thị nội dung file lên editor và preview
function selectFile(file) {
  // Xóa hiển thị file cũ
  document.querySelectorAll(".file-item.selected").forEach((item) => {
    item.classList.remove("selected");
  });

  // Thêm class selected để cập nhật ui
  const item = document.querySelector(`[data-id="${file.id}"]`);
  if (item) {
    item.classList.add("selected");
  }

  // Kiểm tra xem có phải là file không, nếu là file thì sẽ có content và không có childrent
  if (file.content) {
    currentFile = file;
    currentFileName.textContent = file.name;

    // Kiểm tra xem có phải là file ảnh không
    const imageExtensions = ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp"];
    const isImage = imageExtensions.includes(getFileExtension(file.name));

    if (isImage) {
      // Nếu là file ảnh, hiển thị ảnh lên preview, hiển thị đường dẫn vào editor, có thể thay đổi đường dẫn trong editor
      editor.setValue(file.content || "");
      editor.setOption("mode", "text/plain");
      previewFrame.srcdoc = `
        <html>
        <head>
        <title>${file.name}</title>
        <style>
        .image-preview {
          max-width: 80%;
          height: auto;
          display: block;
          margin: 20px auto; 
        }
        </style>
        </head>
        <body style='margin:0;padding:0;text-align:center;'>
          <img class="image-preview" src="${file.content}" alt="${file.name}">
        </body>
        </html>
      `;
    } else {
      // Nếu là file text, hiển thị trong editor
      editor.setValue(file.content || "");
      editor.setOption("mode", getCodeMirrorMode(file.name));

      // Cập nhật preview cho HTML
      if (getFileExtension(file.name) === "html") {
        updatePreview();
      } else {
        previewFrame.srcdoc = `<pre style="padding: 20px; font-family: monospace; background: #f8f9fa; margin: 0; overflow: auto;">${
          file.content || ""
        }</pre>`;
      }
    }
  }
}

// Hàm toggle thư mục
function toggleFolder(item, folder) {
  const children = item.querySelector(".folder-children");
  if (children) {
    children.classList.toggle("expanded");
  }
}

// Hiện menu chuột phải (context menu) tại vị trí chuột
function showContextMenu(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  customMenu.style.left = mouseX + "px";
  customMenu.style.top = mouseY + "px";
  customMenu.style.display = "block";
}

// Ẩn menu chuột phải
function hideContextMenu() {
  customMenu.style.display = "none";
}

// Cập nhật khung xem trước (preview), chủ yếu cho file HTML
function updatePreview() {
  if (currentFile && getFileExtension(currentFile.name) === "html") {
    previewFrame.srcdoc = editor.getValue();
  }
}

// Tạo file mới trong thư mục cha có id là parentId
function createFile(name, parentId = 1) {
  const parent = findFileById(parentId);
  if (!parent || !parent.children) return;

  const newItem = {
    id: nextId++,
    name: name,
    content: "",
  };

  if (!parent.children) parent.children = [];
  parent.children.push(newItem);

  refreshFileTree();
}

// Tạo thư mục mới trong thư mục cha có id là parentId
function createFolder(name, parentId = 1) {
  const parent = findFileById(parentId);
  if (!parent || !parent.children) return;

  const newItem = {
    id: nextId++,
    name: name,
    children: [],
  };

  if (!parent.children) parent.children = [];
  parent.children.push(newItem);

  refreshFileTree();
}

// Xoá file hoặc thư mục theo id
function deleteItem(id) {
  const parent = findParentById(id);
  if (!parent) return;

  parent.children = parent.children.filter((child) => child.id !== id);
  refreshFileTree();

  if (currentFile && currentFile.id === id) {
    currentFile = null;
    currentFileName.textContent = "Editor";
    editor.setValue("");
    previewFrame.srcdoc = "";
  }
}

// Đổi tên file hoặc thư mục theo id
function renameItem(id, newName) {
  const item = findFileById(id);
  if (!item) return;

  item.name = newName;
  refreshFileTree();

  if (currentFile && currentFile.id === id) {
    currentFileName.textContent = newName;
  }
}

// Làm mới lại giao diện cây thư mục
function refreshFileTree() {
  fileTree.innerHTML = "";
  const rootUl = document.createElement("ul");
  rootUl.className = "file-tree-root";

  // Đệ quy từ root
  if (fileSystem.children && fileSystem.children.length > 0) {
    fileSystem.children.forEach((child) => {
      const childLi = renderFileTree(child, 0);
      rootUl.appendChild(childLi);
    });
  }

  fileTree.appendChild(rootUl);
}

// Khi có sự kiện click thì ẩn context menu
document.addEventListener("click", hideContextMenu);

// Sự kiện với thanh toolbar
newFileBtn.addEventListener("click", () => {
  const name = prompt("Enter file name:");
  if (name) {
    createFile(name);
  }
});

// Sự kiện nhấn nút tạo thư mục mới
newFolderBtn.addEventListener("click", () => {
  const name = prompt("Enter folder name:");
  if (name) {
    createFolder(name);
  }
});

// Sự kiện nhấn nút refresh
refreshBtn.addEventListener("click", refreshFileTree);

// Sự kiện nhấn nút tạo file mới trong context menu
newFileMenu.addEventListener("click", () => {
  const name = prompt("Enter file name:");
  if (name && selectedItem) {
    const parentId = selectedItem.children
      ? selectedItem.id
      : findParentById(selectedItem.id).id;
    createFile(name, parentId);
  }
  hideContextMenu();
});

// Sự kiện nhấn nút tạo thư mục mới trong context menu
newFolderMenu.addEventListener("click", () => {
  const name = prompt("Enter folder name:");
  if (name && selectedItem) {
    const parentId = selectedItem.children
      ? selectedItem.id
      : findParentById(selectedItem.id).id;
    createFolder(name, parentId);
  }
  hideContextMenu();
});

// Sự kiện đổi tên
renameMenu.addEventListener("click", () => {
  if (selectedItem) {
    renameInput.value = selectedItem.name;
    renameModal.style.display = "block";
  }
  hideContextMenu();
});

// Sự kiện nhấn nút xóa
deleteMenu.addEventListener("click", () => {
  if (
    selectedItem &&
    confirm(`Are you sure you want to delete "${selectedItem.name}"?`)
  ) {
    deleteItem(selectedItem.id);
  }
  hideContextMenu();
});

// Sự kiện nhấn nút clear trong editor
clearCodeBtn.addEventListener("click", () => {
  editor.setValue("");
  hideContextMenu();
});

// Modal events
confirmRenameBtn.addEventListener("click", () => {
  if (selectedItem && renameInput.value.trim()) {
    renameItem(selectedItem.id, renameInput.value.trim());
    renameModal.style.display = "none";
  }
});

// Sự kiện hủy đổi tên
cancelRenameBtn.addEventListener("click", () => {
  renameModal.style.display = "none";
});

// Ẩn modal
window.addEventListener("click", (e) => {
  if (e.target === renameModal) {
    renameModal.style.display = "none";
  }
});

// cập nhật preview khi có thay đổi trong editor
editor.on("change", () => {
  if (currentFile) {
    currentFile.content = editor.getValue();
    updatePreview();
  }
});

// khởi tạo
refreshFileTree();
