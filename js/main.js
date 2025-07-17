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
      name: "folder_1",
      children: [
        {
          id: 3,
          name: "folder_1_sub_1",
          children: [
            {
              id: 4,
              name: "file_1_1.txt",
              content: "This is the content of file_1_1.txt",
            },
            {
              id: 5,
              name: "image_1_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 6,
          name: "folder_1_sub_2",
          children: [
            {
              id: 7,
              name: "file_1_2.txt",
              content: "This is the content of file_1_2.txt",
            },
            {
              id: 8,
              name: "image_1_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 9,
          name: "folder_1_sub_3",
          children: [
            {
              id: 10,
              name: "file_1_3.txt",
              content: "This is the content of file_1_3.txt",
            },
            {
              id: 11,
              name: "image_1_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 12,
          name: "folder_1_sub_4",
          children: [
            {
              id: 13,
              name: "file_1_4.txt",
              content: "This is the content of file_1_4.txt",
            },
            {
              id: 14,
              name: "image_1_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 15,
          name: "folder_1_sub_5",
          children: [
            {
              id: 16,
              name: "file_1_5.txt",
              content: "This is the content of file_1_5.txt",
            },
            {
              id: 17,
              name: "image_1_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 18,
      name: "folder_2",
      children: [
        {
          id: 19,
          name: "folder_2_sub_1",
          children: [
            {
              id: 20,
              name: "file_2_1.txt",
              content: "This is the content of file_2_1.txt",
            },
            {
              id: 21,
              name: "image_2_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 22,
          name: "folder_2_sub_2",
          children: [
            {
              id: 23,
              name: "file_2_2.txt",
              content: "This is the content of file_2_2.txt",
            },
            {
              id: 24,
              name: "image_2_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 25,
          name: "folder_2_sub_3",
          children: [
            {
              id: 26,
              name: "file_2_3.txt",
              content: "This is the content of file_2_3.txt",
            },
            {
              id: 27,
              name: "image_2_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 28,
          name: "folder_2_sub_4",
          children: [
            {
              id: 29,
              name: "file_2_4.txt",
              content: "This is the content of file_2_4.txt",
            },
            {
              id: 30,
              name: "image_2_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 31,
          name: "folder_2_sub_5",
          children: [
            {
              id: 32,
              name: "file_2_5.txt",
              content: "This is the content of file_2_5.txt",
            },
            {
              id: 33,
              name: "image_2_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 34,
      name: "folder_3",
      children: [
        {
          id: 35,
          name: "folder_3_sub_1",
          children: [
            {
              id: 36,
              name: "file_3_1.txt",
              content: "This is the content of file_3_1.txt",
            },
            {
              id: 37,
              name: "image_3_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 38,
          name: "folder_3_sub_2",
          children: [
            {
              id: 39,
              name: "file_3_2.txt",
              content: "This is the content of file_3_2.txt",
            },
            {
              id: 40,
              name: "image_3_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 41,
          name: "folder_3_sub_3",
          children: [
            {
              id: 42,
              name: "file_3_3.txt",
              content: "This is the content of file_3_3.txt",
            },
            {
              id: 43,
              name: "image_3_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 44,
          name: "folder_3_sub_4",
          children: [
            {
              id: 45,
              name: "file_3_4.txt",
              content: "This is the content of file_3_4.txt",
            },
            {
              id: 46,
              name: "image_3_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 47,
          name: "folder_3_sub_5",
          children: [
            {
              id: 48,
              name: "file_3_5.txt",
              content: "This is the content of file_3_5.txt",
            },
            {
              id: 49,
              name: "image_3_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 50,
      name: "folder_4",
      children: [
        {
          id: 51,
          name: "folder_4_sub_1",
          children: [
            {
              id: 52,
              name: "file_4_1.txt",
              content: "This is the content of file_4_1.txt",
            },
            {
              id: 53,
              name: "image_4_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 54,
          name: "folder_4_sub_2",
          children: [
            {
              id: 55,
              name: "file_4_2.txt",
              content: "This is the content of file_4_2.txt",
            },
            {
              id: 56,
              name: "image_4_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 57,
          name: "folder_4_sub_3",
          children: [
            {
              id: 58,
              name: "file_4_3.txt",
              content: "This is the content of file_4_3.txt",
            },
            {
              id: 59,
              name: "image_4_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 60,
          name: "folder_4_sub_4",
          children: [
            {
              id: 61,
              name: "file_4_4.txt",
              content: "This is the content of file_4_4.txt",
            },
            {
              id: 62,
              name: "image_4_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 63,
          name: "folder_4_sub_5",
          children: [
            {
              id: 64,
              name: "file_4_5.txt",
              content: "This is the content of file_4_5.txt",
            },
            {
              id: 65,
              name: "image_4_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 66,
      name: "folder_5",
      children: [
        {
          id: 67,
          name: "folder_5_sub_1",
          children: [
            {
              id: 68,
              name: "file_5_1.txt",
              content: "This is the content of file_5_1.txt",
            },
            {
              id: 69,
              name: "image_5_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 70,
          name: "folder_5_sub_2",
          children: [
            {
              id: 71,
              name: "file_5_2.txt",
              content: "This is the content of file_5_2.txt",
            },
            {
              id: 72,
              name: "image_5_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 73,
          name: "folder_5_sub_3",
          children: [
            {
              id: 74,
              name: "file_5_3.txt",
              content: "This is the content of file_5_3.txt",
            },
            {
              id: 75,
              name: "image_5_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 76,
          name: "folder_5_sub_4",
          children: [
            {
              id: 77,
              name: "file_5_4.txt",
              content: "This is the content of file_5_4.txt",
            },
            {
              id: 78,
              name: "image_5_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 79,
          name: "folder_5_sub_5",
          children: [
            {
              id: 80,
              name: "file_5_5.txt",
              content: "This is the content of file_5_5.txt",
            },
            {
              id: 81,
              name: "image_5_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 82,
      name: "folder_6",
      children: [
        {
          id: 83,
          name: "folder_6_sub_1",
          children: [
            {
              id: 84,
              name: "file_6_1.txt",
              content: "This is the content of file_6_1.txt",
            },
            {
              id: 85,
              name: "image_6_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 86,
          name: "folder_6_sub_2",
          children: [
            {
              id: 87,
              name: "file_6_2.txt",
              content: "This is the content of file_6_2.txt",
            },
            {
              id: 88,
              name: "image_6_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 89,
          name: "folder_6_sub_3",
          children: [
            {
              id: 90,
              name: "file_6_3.txt",
              content: "This is the content of file_6_3.txt",
            },
            {
              id: 91,
              name: "image_6_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 92,
          name: "folder_6_sub_4",
          children: [
            {
              id: 93,
              name: "file_6_4.txt",
              content: "This is the content of file_6_4.txt",
            },
            {
              id: 94,
              name: "image_6_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 95,
          name: "folder_6_sub_5",
          children: [
            {
              id: 96,
              name: "file_6_5.txt",
              content: "This is the content of file_6_5.txt",
            },
            {
              id: 97,
              name: "image_6_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 98,
      name: "folder_7",
      children: [
        {
          id: 99,
          name: "folder_7_sub_1",
          children: [
            {
              id: 100,
              name: "file_7_1.txt",
              content: "This is the content of file_7_1.txt",
            },
            {
              id: 101,
              name: "image_7_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 102,
          name: "folder_7_sub_2",
          children: [
            {
              id: 103,
              name: "file_7_2.txt",
              content: "This is the content of file_7_2.txt",
            },
            {
              id: 104,
              name: "image_7_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 105,
          name: "folder_7_sub_3",
          children: [
            {
              id: 106,
              name: "file_7_3.txt",
              content: "This is the content of file_7_3.txt",
            },
            {
              id: 107,
              name: "image_7_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 108,
          name: "folder_7_sub_4",
          children: [
            {
              id: 109,
              name: "file_7_4.txt",
              content: "This is the content of file_7_4.txt",
            },
            {
              id: 110,
              name: "image_7_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 111,
          name: "folder_7_sub_5",
          children: [
            {
              id: 112,
              name: "file_7_5.txt",
              content: "This is the content of file_7_5.txt",
            },
            {
              id: 113,
              name: "image_7_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 114,
      name: "folder_8",
      children: [
        {
          id: 115,
          name: "folder_8_sub_1",
          children: [
            {
              id: 116,
              name: "file_8_1.txt",
              content: "This is the content of file_8_1.txt",
            },
            {
              id: 117,
              name: "image_8_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 118,
          name: "folder_8_sub_2",
          children: [
            {
              id: 119,
              name: "file_8_2.txt",
              content: "This is the content of file_8_2.txt",
            },
            {
              id: 120,
              name: "image_8_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 121,
          name: "folder_8_sub_3",
          children: [
            {
              id: 122,
              name: "file_8_3.txt",
              content: "This is the content of file_8_3.txt",
            },
            {
              id: 123,
              name: "image_8_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 124,
          name: "folder_8_sub_4",
          children: [
            {
              id: 125,
              name: "file_8_4.txt",
              content: "This is the content of file_8_4.txt",
            },
            {
              id: 126,
              name: "image_8_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 127,
          name: "folder_8_sub_5",
          children: [
            {
              id: 128,
              name: "file_8_5.txt",
              content: "This is the content of file_8_5.txt",
            },
            {
              id: 129,
              name: "image_8_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 130,
      name: "folder_9",
      children: [
        {
          id: 131,
          name: "folder_9_sub_1",
          children: [
            {
              id: 132,
              name: "file_9_1.txt",
              content: "This is the content of file_9_1.txt",
            },
            {
              id: 133,
              name: "image_9_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 134,
          name: "folder_9_sub_2",
          children: [
            {
              id: 135,
              name: "file_9_2.txt",
              content: "This is the content of file_9_2.txt",
            },
            {
              id: 136,
              name: "image_9_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 137,
          name: "folder_9_sub_3",
          children: [
            {
              id: 138,
              name: "file_9_3.txt",
              content: "This is the content of file_9_3.txt",
            },
            {
              id: 139,
              name: "image_9_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 140,
          name: "folder_9_sub_4",
          children: [
            {
              id: 141,
              name: "file_9_4.txt",
              content: "This is the content of file_9_4.txt",
            },
            {
              id: 142,
              name: "image_9_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 143,
          name: "folder_9_sub_5",
          children: [
            {
              id: 144,
              name: "file_9_5.txt",
              content: "This is the content of file_9_5.txt",
            },
            {
              id: 145,
              name: "image_9_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
      ],
    },
    {
      id: 146,
      name: "folder_10",
      children: [
        {
          id: 147,
          name: "folder_10_sub_1",
          children: [
            {
              id: 148,
              name: "file_10_1.txt",
              content: "This is the content of file_10_1.txt",
            },
            {
              id: 149,
              name: "image_10_1.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 150,
          name: "folder_10_sub_2",
          children: [
            {
              id: 151,
              name: "file_10_2.txt",
              content: "This is the content of file_10_2.txt",
            },
            {
              id: 152,
              name: "image_10_2.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 153,
          name: "folder_10_sub_3",
          children: [
            {
              id: 154,
              name: "file_10_3.txt",
              content: "This is the content of file_10_3.txt",
            },
            {
              id: 155,
              name: "image_10_3.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 156,
          name: "folder_10_sub_4",
          children: [
            {
              id: 157,
              name: "file_10_4.txt",
              content: "This is the content of file_10_4.txt",
            },
            {
              id: 158,
              name: "image_10_4.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
            },
          ],
        },
        {
          id: 159,
          name: "folder_10_sub_5",
          children: [
            {
              id: 160,
              name: "file_10_5.txt",
              content: "This is the content of file_10_5.txt",
            },
            {
              id: 161,
              name: "image_10_5.jpg",
              content:
                "https://cdn.shopify.com/s/files/1/1083/2612/files/hd4_480x480.jpg?v=1739170015",
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
let selectedItemId = null;
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

  li.style.paddingLeft = `16px`;
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectedItem = node;
    showContextMenu(e);
  });
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
          max-width: 90%;
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
        previewFrame.srcdoc = `<pre style="padding: 0 10px; font-family: monospace; background: #f8f9fa; margin: 0; overflow: auto;">${
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
      const childLi = renderFileTree(child);
      rootUl.appendChild(childLi);
    });
  }

  fileTree.appendChild(rootUl);
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
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishRename();
    if (e.key === "Escape") refreshFileTree();
  });

  input.addEventListener("blur", finishRename);
}

// Event
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
    const li = document.querySelector(`[data-id="${selectedItem.id}"]`);
    activateRenameMode(li, selectedItem);
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

// cập nhật preview khi có thay đổi trong editor
editor.on("change", () => {
  if (currentFile) {
    currentFile.content = editor.getValue();
    updatePreview();
  }
});

// khởi tạo
refreshFileTree();
