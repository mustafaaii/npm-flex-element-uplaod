# Flex Element Upload
__Flex Element Upload__ is a simple and useful npm package that helps you upload files in your projects.
* With axios embedded in it, it uploads the files to the folder you specify by simply specifying the url (for example /uplaod.php).
* You can set limits for file __types__, __pixels__ and __size__.
* Displays information of selected files.
* You can set an upload limit for multiple uploads.
* Can preview on first page load
* __Expects all react dependencies from the project (except axios)__


## Building Features
### <span style="color:#8a2be2;">API->(POST)</span>
If you set __api -> ssr:true__, it will wait for a url to meet the files in the background. In this example, processing will be done with an upload.php file in the background. 
```javascript   
 api={{
    ssr: true,
    url: "http://localhost/upload.php",
 }}
```
#

### Example of a PHP script for api post ### <span style="color:#8a2be2;">API->(POST)</span>

```php
<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials; true');
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["flx_file"])) {
```
```php
    $uploadDir = "./upload/";
    $uploadedFile = $_FILES["flx_file"];
```
The name __flx_file__ here expects the installer to provide the file. That's why you need to name it this way. The folder location is your choice.
```php
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
```



#
### <span style="color:#8a2be2;">RESPONSE</span>  <span style="color:#11d379;">: OBJECT OR ARRAY</span>
Response returns an object or an array depending on the loading selection

### Appearance
```javascript  
response={(e) => { console.log(e) }}
```
### Output {OBJECT}
```json  
{image: '65dbcbec246a0.png', size: '21.78KB', type: 'PNG', pixel: '120X120'}
```
### Output [ARRAY]
```json  
[
{image: '65dbcbec246a0.png', size: '21.78KB', type: 'PNG', pixel: '120X120'}
{image: '65dbcbec2b0f3.png', size: '25.19KB', type: 'PNG', pixel: '120X120'}
{image: '65dbcbec301de.png', size: '23.05KB', type: 'PNG', pixel: '120X120'}
{image: '65dbcbec34e7b.png', size: '20.21KB', type: 'PNG', pixel: '120X120'}
]
```
#
### <span style="color:#8a2be2;">PLACEHOLDER</span>  <span style="color:#11d379;">: OBJECT</span>
You can pass icon, text and button text in Placeholder


```javascript  
 placeholder={{
     icon:any
     text: string,
     button: string
 }}
```


#
### <span style="color:#8a2be2;">SELECTED</span>  <span style="color:#11d379;">: OBJECT OR ARRAY</span>
Allows you to view selected, uploaded files again. There are 2 types of input methods: Object (Single upload) and Array (Multiple upload). The output of the files gives you image, size, type and pixel, if you keep them in the database, you can forward them to the next viewing. If these values are not available, you can leave them blank.

### Object (Single Uplaod)
```javascript  
 selected={
     {image: 'http://localhost/upload/65dbabcbe2694.png', size: '23.05KB', type: 'png', pixel: '120X120' }
 }
```
### ARRAY (Multiple Uplaod)
```javascript  
 selected={[
    {image: 'http://localhost/upload/65dbcbec246a0.png', size: '21.78KB', type: 'PNG', pixel: '120X120'}
    {image: 'http://localhost/upload/65dbcbec2b0f3.png', size: '25.19KB', type: 'PNG', pixel: '120X120'}
    {image: 'http://localhost/upload/65dbcbec301de.png', size: '23.05KB', type: 'PNG', pixel: '120X120'}
    {image: 'http://localhost/upload/65dbcbec34e7b.png', size: '20.21KB', type: 'PNG', pixel: '120X120'}
 ]}
```


#
### <span style="color:#8a2be2;">SETTINGS</span>  <span style="color:#11d379;">: OBJECT</span>
Settings allows you to turn some basic features on/off or set certain limitations.
```javascript  
settings={{
    imageInfo:    boolean   ->    true,
    imagepreview: boolean   ->    true,
    imageType:    array     ->    ["image/png", "image/webp", "image/webp"],
    imageSize:    string    ->    "2MB",
    imagePixel:   string    ->    "1080X1080",
    limit:        number    ->    5,
 }}
```

### imageInfo
Show information after Image Selection?
### imagepreview
Should the images be shown larger? (works if imageInfo is on)
### imageType
What images can the user upload? __["image/png", "image/webp", "image/webp"]__
### imageSize
How many MB/KB files can the user upload?
### imagePixel
How many pixels width/height should the user be able to upload files?
### limit
How many files can the user upload in multiple selection?


## Compilation
Both module structures were used with **ESM (ES Modules)** and **CJS (AMD Require.JS — Async)** compilation


## Installation
```bash
npm install flex-element-upload
```
```bash
import { Uplaod } from "flex-element-upload";
```

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

## Multiple Upload

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

## Other
_**The greatest legacy is the works you will leave to humanity.**_

I develop projects to help people. I'm trying to implement many ideas like this.
You can email your support and/or requests regarding the development phase here. If you encounter errors, I will try to help. Email: mustafaaii@hotmail.com











