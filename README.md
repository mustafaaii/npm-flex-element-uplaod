# Flex Element Upload

**Flex Element Upload** is a simple and useful npm package that helps you upload files in your projects. It utilizes axios for file upload functionality by simply specifying the upload URL (for example /upload.php). You can set limits for file types, dimensions, and size. It displays information about selected files and allows you to set a limit for the number of uploads. Additionally, it can preview images on the first page load.

## Building Features

### API (POST)

If you set `api -> ssr:true`, it will wait for a URL to handle file uploads in the background. Here's an example of how to configure it:

```javascript   
 api={{
    ssr: true,
    url: "http://localhost/upload.php",
 }}
<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials; true');
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["flx_file"])) {
    $uploadDir = "./upload/";
    $uploadedFile = $_FILES["flx_file"];
   
# Flex Element Upload

**Flex Element Upload** is a simple and useful npm package that helps you upload files in your projects. It utilizes axios for file upload functionality by simply specifying the upload URL (for example /upload.php). You can set limits for file types, dimensions, and size. It displays information about selected files and allows you to set a limit for the number of uploads. Additionally, it can preview images on the first page load.

## Building Features

### API (POST)

If you set `api -> ssr:true`, it will wait for a URL to handle file uploads in the background. Here's an example of how to configure it:

```javascript   
 api={{
    ssr: true,
    url: "http://localhost/upload.php",
 }}
```
# Example of a PHP script for API POST
<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials; true');
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["flx_file"])) {
    $uploadDir = "./upload/";
    $uploadedFile = $_FILES["flx_file"];
    if ($uploadedFile["error"] == UPLOAD_ERR_OK) {
        $fileName = basename($uploadedFile["name"]);
        $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
        $newFileName = uniqid() . "." . $fileExtension;
        $uploadPath = $uploadDir . $newFileName;
        if (move_uploaded_file($uploadedFile["tmp_name"], $uploadPath)) {
            echo json_encode(["status" => true, "file" => $newFileName]);
        } else {
            echo "Error.";
        }
    } else {
        echo "Error: " . $uploadedFile["error"];
    }
} else {
    echo "Error Send.";
}
?>

# RESPONSE: OBJECT OR ARRAY
The response can be either an object or an array, depending on the selection of uploads.
## Appearance
response={(e) => { console.log(e) }}
##Output (OBJECT)
{image: '65dbcbec246a0.png', size: '21.78KB', type: 'PNG', pixel: '120X120'}
## Output (ARRAY)
[
{image: '65dbcbec246a0.png', size: '21.78KB', type: 'PNG', pixel: '120X120'}
{image: '65dbcbec2b0f3.png', size: '25.19KB', type: 'PNG', pixel: '120X120'}
{image: '65dbcbec301de.png', size: '23.05KB', type: 'PNG', pixel: '120X120'}
{image: '65dbcbec34e7b.png', size: '20.21KB', type: 'PNG', pixel: '120X120'}
]

### PLACEHOLDER: OBJECT

You can customize the placeholder with an icon, text, and button text.

```javascript  
 placeholder={{
     icon: any,
     text: string,
     button: string
 }}

 selected={
     {image: 'http://localhost/upload/65dbabcbe2694.png', 
     size: '23.05KB', 
     type: 'png', 
     pixel: '120X120' }
 }
```

# SELECTED: OBJECT OR ARRAY
Allows you to view selected and uploaded files again. There are two types of input methods: Object (Single upload) and Array (Multiple upload). The output provides image, size, type, and pixel information. If these values are not available, you can leave them blank.

## Object (Single Upload)
```javascript 
 selected={
     {image: 'http://localhost/upload/65dbabcbe2694.png', 
     size: '23.05KB', 
     type: 'png', 
     pixel: '120X120' }
 }
```
## Array (Multiple Upload)
```javascript 
 selected={[
    {image: 'http://localhost/upload/65dbcbec246a0.png', 
    size: '21.78KB', 
    type: 'PNG', 
    pixel: '120X120'},
    {image: 'http://localhost/upload/65dbcbec2b0f3.png', 
    size: '25.19KB', 
    type: 'PNG', 
    pixel: '120X120'},
    {image: 'http://localhost/upload/65dbcbec301de.png', 
    size: '23.05KB', 
    type: 'PNG', 
    pixel: '120X120'},
    {image: 'http://localhost/upload/65dbcbec34e7b.png', 
    size: '20.21KB', 
    type: 'PNG', 
    pixel: '120X120'}
 ]}
```
### SETTINGS: OBJECT

Settings allow you to toggle features on/off or set limitations.

```javascript  
settings={{
    imageInfo: boolean,
    imagepreview: boolean,
    imageType: array,
    imageSize: string,
    imagePixel: string,
    limit: number,
 }}
```

#### imageInfo

Show information after Image Selection?

#### imagepreview

Should the images be shown larger? (works if imageInfo is on)

#### imageType

What images can the user upload? (e.g., `["image/png", "image/webp", "image/webp"]`)

#### imageSize

How many MB/KB files can the user upload?

#### imagePixel

What dimensions (width/height) should the uploaded files be?

#### limit

How many files can the user

# Usage
## Single Upload
```javascript  
<Upload
    single
    selected={{
        image: 'http://localhost/upload/65dbabcbe2694.png', 
        size: '23.05KB', 
        type: 'png', 
        pixel: '120X120' 
    }}
    api={{
        ssr: true,
        url: "http://localhost/upload.php",
    }}
    response={(e) => { console.log(e) }}
    placeholder={{
        text: "Select Image",
        button: "Upload Files"
    }}
    settings={{
        imageInfo: true,
        imagepreview: true,
        imageType: ["image/png"],
        imageSize: "2MB",
        imagePixel: "1080X1080",
    }}
 />
```
# Multiple Upload
```javascript  
<Upload
    multiple
     selected={[
        {image: 'http://localhost/upload/65dbcbec246a0.png', size: '21.78KB', type: 'PNG', pixel: '120X120'},
        {image: 'http://localhost/upload/65dbcbec2b0f3.png', size: '25.19KB', type: 'PNG', pixel: '120X120'},
        {image: 'http://localhost/upload/65dbcbec301de.png', size: '23.05KB', type: 'PNG', pixel: '120X120'},
        {image: 'http://localhost/upload/65dbcbec34e7b.png', size: '20.21KB', type: 'PNG', pixel: '120X120'}
    ]}
    api={{
        ssr: true,
        url: "http://localhost/upload.php",
    }}
    response={(e) => { console.log(e) }}
    placeholder={{
        text: "Select Image",
        button: "Upload Files"
    }}
    settings={{
        imageInfo: true,
        imagepreview: true,
        imageType: ["image/png"],
        imageSize: "2MB",
        imagePixel: "1080X1080",
        limit: 5
    }}
 />
```
# Other
__The greatest legacy is the works you will leave to humanity.__

I develop projects to help people. I'm trying to implement many ideas like this.
You can email your support and/or requests regarding the development phase here. If you encounter errors, I will try to help. Email: mustafaaii@hotmail.com
 

 
