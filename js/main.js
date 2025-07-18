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
  children: [],
};

// GET dữ liệu từ json-server
async function fetchFileSystem() {
  try {
    const res = await fetch("https://json-server-j1up.onrender.com/fileSystem");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    fileSystem = await res.json();
  } catch (error) {
    console.error("Lỗi fetch fileSystem:", error);
  } finally {
    refreshFileTree(false);
    updateHeaderText();
  }
}

// Update dữ liệu json-server
async function updateFileSystem() {
  if (!fileSystem) {
    console.warn("Không có dữ liệu fileSystem để cập nhật");
    return;
  }

  try {
    const res = await fetch(
      "https://json-server-j1up.onrender.com/fileSystem",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileSystem),
      }
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const updatedData = await res.json();
  } catch (error) {
    console.error("Lỗi cập nhật fileSystem:", error);
  }
}

// Biến toàn cục
let currentFile = null;
let selectedItem = fileSystem;
let selectedItemId = null;
let nextId = 9;

// DOM elements
const header = document.querySelector(".header");
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

// Hàn lấy phần mở rộng (đuôi) của tên file, ví dụ: 'txt', 'jpg', 'js'
function getFileExtension(filename) {
  return filename.split(".").pop().toLowerCase();
}

// Hàm lấy icon phù hợp cho từng loại file để hiển thị trong cây thư mục
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

// Hàm chọn chế độ (mode) cho CodeMirror dựa vào loại file (html, css, js, ...)
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

// Sử dụng đệ quy để tìm id của con
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

// Sử dụng đệ quy để tìm id của cha
// Tìm và trả về thư mục cha của một file/thư mục theo id
function findParentById(id, node = fileSystem) {
  if (node.children) {
    for (let child of node.children) {
      if (child.id === id) return node;
      const result = findParentById(id, child);
      if (result) return result;
    }
  }
  return null;
}

// Sử dụng để quy để lấy ra tất cả id có trong root
function getAllIds(node = fileSystem, ids = new Set()) {
  if (!node) return ids;
  ids.add(Number(node.id));
  if (node.children) {
    for (let child of node.children) {
      getAllIds(child, ids);
    }
  }
  return ids;
}

// Hàm tạo id ngẫu nhiên không trùng với id hiện có trong fileSystem
function generateNewId() {
  // Lấy tất cả id
  const ids = getAllIds();
  // Nếu không có thì lấy 1
  if (ids.size === 0) return 1;
  // Nếu có thì lấy max của tất cả id + 1
  const maxId = Math.max(...ids);
  return maxId + 1;
}

// Sử dụng đệ quy để render thư mục đa cấp
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
  }

  li.style.paddingLeft = `10px`;
  li.addEventListener("click", () => {
    selectedItem = node;
    updateHeaderText();
  });
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectedItem = node;
    updateHeaderText();
    node.expanded = true;
    // Cập nhật lại tree
    refreshFileTree();
    showContextMenu(e);
  });
  return li;
}

// Khi click chọn file, hiển thị nội dung file lên editor và preview
function selectFile(file) {
  // Bỏ chọn cũ
  document.querySelectorAll(".file-item.selected").forEach((item) => {
    item.classList.remove("selected");
  });

  const item = document.querySelector(`[data-id="${file.id}"]`);
  if (item) {
    item.classList.add("selected");
  }

  if (file.content != null) {
    currentFile = file;
    currentFileName.textContent = file.name;
    editor.setValue(file.content || "");
    editor.setOption("mode", getCodeMirrorMode(file.name));

    updatePreview();
  }
}

// Cập nhật khung xem trước (preview), chủ yếu cho file HTML
function updatePreview() {
  if (!currentFile) return;

  const ext = getFileExtension(currentFile.name);
  const content = currentFile.content || "";

  // Cấu hình lại mode cho editor (text, html...)
  editor.setOption("mode", getCodeMirrorMode(currentFile.name));

  // Loại ảnh
  const imageTypes = ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp"];
  if (imageTypes.includes(ext)) {
    previewFrame.srcdoc = `
      <html><body style="margin:0;text-align:center;">
        <img src="${content}" alt="${currentFile.name}" style="max-width: 90%; margin: 20px auto;" />
      </body></html>
    `;
    return;
  }

  // Loại video
  const videoTypes = ["mp4", "webm", "ogg"];
  if (videoTypes.includes(ext)) {
    previewFrame.srcdoc = `
      <html><body style="margin:0;text-align:center;">
        <video controls style="max-width: 90%; margin: 20px auto;">
          <source src="${content}" type="video/${ext}">
        </video>
      </body></html>
    `;
    return;
  }

  // Loại audio
  const audioTypes = ["mp3", "wav", "ogg"];
  if (audioTypes.includes(ext)) {
    previewFrame.srcdoc = `
      <html><body style="margin:20px;text-align:center;">
        <audio controls>
          <source src="${content}" type="audio/${ext}">
        </audio>
      </body></html>
    `;
    return;
  }

  // HTML – chạy trực tiếp
  if (ext === "html") {
    previewFrame.srcdoc = content;
    return;
  }

  // Text/code mặc định
  previewFrame.srcdoc = `
    <pre style="padding: 10px; font-family: monospace; margin: 0; white-space: pre-wrap; word-break: break-word;">
${content.replace(
  /[<>&]/g,
  (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])
)}
    </pre>
  `;
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
  const menuWidth = customMenu.offsetWidth;
  const menuHeight = customMenu.offsetHeight;

  let left = mouseX;
  let top = mouseY;

  const treeRect = fileTree.getBoundingClientRect();

  // Nếu menu vượt quá khung bên phải
  if (mouseX + menuWidth > treeRect.right) {
    left = mouseX - menuWidth;
  }

  // Nếu menu vượt quá khung dưới
  if (mouseY + menuHeight > treeRect.bottom) {
    top = mouseY - menuHeight;
  }

  customMenu.style.left = left + "px";
  customMenu.style.top = top + "px";
  customMenu.style.display = "block";
}

// Ẩn menu chuột phải
function hideContextMenu() {
  customMenu.style.display = "none";
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

  const childIndex = parent.children.findIndex(
    (child) => Number(child.id) === Number(id)
  );

  parent.children.splice(childIndex, 1);

  refreshFileTree();

  // Cập nhật lại trạng thái của khu Editor panel
  if (currentFile && currentFile.id === id) {
    currentFile = null;
    currentFileName.textContent = "Editor";
    editor.setValue("");
    previewFrame.srcdoc = "";
  }

  if (fileSystem.children.length < 1) {
    selectedItem = fileSystem;
    updateHeaderText();
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
function refreshFileTree(isUpdated = true) {
  fileTree.innerHTML = "";
  const rootUl = document.createElement("ul");
  rootUl.className = "file-tree-root";

  // Đệ quy từ root
  if (fileSystem?.children && fileSystem?.children.length > 0) {
    fileSystem.children.forEach((child) => {
      const childLi = renderFileTree(child);
      rootUl.appendChild(childLi);
    });
  }

  fileTree.appendChild(rootUl);

  if (isUpdated) updateFileSystem();
}

// Hàm xử lý đổi tên file/thư mục
// Đổi span name thành input để nhập tên, khi submit thì đổi tên
function activateRenameMode(li, node) {
  const nameSpan = li.querySelector(".name");
  const oldName = node.name;

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldName;
  input.className = "rename-input";

  nameSpan.replaceWith(input);
  input.focus();
  input.select();

  // Khi kết thúc, blur input thì thực hiện đổi tên nếu tên mới hợp kệ và khác tên cũ
  // TODO: kiểm tra xem có trùng tên với file khác trong cùng thư mục hay không?
  const finishRename = () => {
    const newName = input.value.trim();
    if (newName && newName !== oldName) {
      renameItem(node.id, newName);
    } else {
      refreshFileTree();
    }
    // Cập nhật lại preview
    updatePreview();
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishRename();
    if (e.key === "Escape") refreshFileTree();
  });

  input.addEventListener("blur", finishRename);
}

// Hàm cập nhật header theo tên của item đang select
function updateHeaderText() {
  header.innerHTML = '<i class="fa-solid fa-folder"></i>';
  header.innerHTML += selectedItem?.name ? selectedItem.name : "Explore";
}

// Hàm tạo file mới
function newFileHandle() {
  if (!selectedItem) return;
  selectedItem.expanded = true;
  refreshFileTree();
  const parentNode = selectedItem.children
    ? selectedItem
    : findParentById(selectedItem.id);

  const newId = generateNewId();
  const defaultName = `new file(${newId}).txt`;

  const newFile = {
    id: newId,
    name: defaultName,
    content: "",
  };

  parentNode.children = parentNode.children || [];
  parentNode.children.push(newFile);

  refreshFileTree();

  // Tìm lại thẻ <li> của file mới được thêm để kích hoạt rename
  setTimeout(() => {
    const li = document.querySelector(`.file-item[data-id="${newId}"]`);
    if (li) {
      activateRenameMode(li, newFile);
    }
  }, 0); // delay 1 chút để DOM cập nhật xong
  hideContextMenu();
}

// Hàm tạo folder mới
function newFolderHandle() {
  if (!selectedItem) return;

  selectedItem.expanded = true;
  refreshFileTree();

  const parentNode = selectedItem.children
    ? selectedItem
    : findParentById(selectedItem.id);

  const newId = generateNewId();
  const defaultName = `new folder(${newId})`;

  const newFolder = {
    id: newId,
    name: defaultName,
    children: [],
  };

  parentNode.children = parentNode.children || [];
  parentNode.children.push(newFolder);

  refreshFileTree();

  // Tìm lại thẻ <li> của file mới được thêm để kích hoạt rename
  setTimeout(() => {
    const li = document.querySelector(`.file-item[data-id="${newId}"]`);
    if (li) {
      activateRenameMode(li, newFolder);
    }
  }, 0); // delay 1 chút để DOM cập nhật xong
  hideContextMenu();
}

// Event
// Khi có sự kiện click thì ẩn context menu
document.addEventListener("click", () => {
  hideContextMenu;
});

// Khi nhấn vào cùng bên ngoài thì selec root
fileTree.addEventListener("click", () => {
  selectedItem = fileSystem;
  updateHeaderText();
});
// Khi chuột phải vào vùng bên ngoài thì hiển thị context cho root
fileTree.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.stopPropagation();
  selectedItem = fileSystem;
  updateHeaderText();
  showContextMenu(e);
});

// Sự kiện với thanh toolbar
// Tạo file mới
newFileBtn.addEventListener("click", newFileHandle);

// Sự kiện nhấn nút tạo thư mục mới
newFolderBtn.addEventListener("click", newFolderHandle);

// Sự kiện nhấn nút refresh
refreshBtn.addEventListener("click", refreshFileTree);

// Sự kiện nhấn nút tạo file mới trong context menu
newFileMenu.addEventListener("click", newFileHandle);

// Sự kiện nhấn nút tạo thư mục mới trong context menu
newFolderMenu.addEventListener("click", newFolderHandle);

// Sự kiện đổi tên
renameMenu.addEventListener("click", () => {
  if (selectedItem) {
    const li = document.querySelector(`[data-id="${selectedItem.id}"]`);
    activateRenameMode(li, selectedItem);
  }
  hideContextMenu();
});

// Sự kiện nhấn nút xóa
deleteMenu.addEventListener("click", () => {
  if (
    selectedItem &&
    confirm(
      `Bạn có chắc muốn xóa ${selectedItem.children ? "Thư mục" : "File"} "${
        selectedItem.name
      }"?`
    )
  ) {
    deleteItem(selectedItem.id);
  }
  hideContextMenu();
});

// cập nhật preview khi có thay đổi trong editor, và tự động lưu
editor.on("change", () => {
  if (currentFile) {
    currentFile.content = editor.getValue();
    updatePreview();
    updateFileSystem();
  }
});

// khởi tạo
fetchFileSystem();
