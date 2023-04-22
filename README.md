<h4>File manager / image browser for React applications</h4>

<h5 style="margin:0 ; padding: 0;">Overview:</h5>

<div style="padding: 16px;">
<p style="font-size: 15px">This package provides an intuitive GUI to easily manage your storage filesystem, share and organize files / images across your application. It aims to reproduce the experience of using a desktop file manager in a web browser context.</p>

<strong><a href="https://jb_fmanager_react_demo.surge.sh">DEMO</a><strong>

</div>

<h5 style="margin:0 ; padding: 0;">Install:</h5>

<div style="padding: 16px;">

```bash
npm i @jb_fmanager/react

yarn add @jb_fmanager/react
```

</div>

<h5 style="margin:0 ; padding: 0;">Use:</h5>
<div style="padding: 16px;">

<h6>FileshareProvider</h6>

<p style="font-size: 15px">Context that enables sharing files throughout you application.</p>

```jsx
import { FileshareProvider } from "@jb_fmanager/react";

return (
  <FileshareProvider>
    <App />
  </FileshareProvider>
);
```

<br/>
<h6>useUrls</h6>

<p style="font-size: 15px">Hook that gives access to shared urls. Example use.</p>

```jsx
import { useUrls } from "@jb_fmanager/react";

export const MyComponent = () => {
  const urls = useUrls();

  return (
    <ul>
      {urls.map((url) => {
        <li key={url}>
          <image src={url} alt={url} />
        </li>;
      })}
    </ul>
  );
};
```

<br/>
<h6>ReactFileManager</h6>

<p style="font-size: 15px">Main component</p>

```jsx
import { ReactFileManager } from "@jb_fmanager/react";

// include it anywhere in your app

const App = () => {
  return (
    <App>
      {open && (
        <ReactFileManager
          host="http://localhost:4000"
          isOpen={open}
          mountAlias="media"
          // other opts
        />
      )}
    </App>
  );
};
```

<p style="font-weight:bold;"></p>

<table>
<thead>
    <tr style="font-style: italic; font-size: 14px;">
        <th>prop</th>
         <th>type</th>
          <th>importance</th>
           <th>default</th>
            <th>description</th>
    </tr>
    <tbody style="font-size: 14px;">
        <tr>
            <td>isOpen</td>
             <td>boolean</td>
              <td>is required</td>
               <td>undefined</td>
                <td>Whether the component should mount or not.</td>
        </tr>
         <tr>
            <td>onClose</td>
             <td>function</td>
              <td>is required</td>
               <td>undefined</td>
                <td>Callback function to unmount the element.</td>
        </tr>
          <tr>
            <td>data</td>
             <td>array</td>
              <td>as per your needs</td>
               <td>undefined</td>
                <td>You can pass data explicitly to the component (map your public folder for instance) without fetching real data from external sources. If you want to map your local media files and other files from public / static folder you might need to adjust the mountAlias option properly, for instance: localhost:3000/images (to mount the public/images folder). Further I am explaining how the file tree structure should look like.</td>
        </tr>
          <tr>
            <td>host</td>
             <td>string</td>
              <td>Must be specified if you're fetching from external source / server.</td>
               <td>your host</td>
                <td>Data provider</td>
        </tr>
            <tr>
            <td>mountAlias</td>
             <td>string</td>
              <td>might be required, depends</td>
               <td>empty sting</td>
                <td>If you use prefix with your static files directory (can happen if your serving your bundle from one folder and media from another) or use a cloud storage for your media and files. Has to be a valid url starting with http(s) or localhost followed by a port number.</td>
        </tr>         
          <tr>
            <td>namespace</td>
             <td>string</td>
              <td>you can skip, provided you don't use the default anywhere else</td>
               <td>api/fm</td>
                <td>Namespace for api requests to prevent routing conflicts.</td>
        </tr>
           <tr>
            <td>id</td>
             <td>string</td>
              <td>you can skip, provided you don't use the default anywhere else</td>
               <td>jb_fmanager</td>
                <td>A unique id to rule out potential unwanted DOM related side effects.</td>
        </tr>
          <tr>
            <td>browserOnly</td>
             <td>boolean</td>
              <td>as per your needs</td>
               <td>undefined</td>
                <td>If present, changes to the file tree won't live outside the current browser session. Basically a read only mode. Disables uploads.</td>
        </tr>
          <tr>
            <td>parentDarkMode</td>
             <td>boolean</td>
              <td>as per your needs</td>
               <td>undefined</td>
                <td>Allows to control the initial theme mode from outside</td>
        </tr>
         <tr>
            <td>lightTheme</td>
             <td>object</td>
              <td>as per your needs</td>
               <td>empty object</td>
                <td>Custom light theme, if you want to override the default one. See styling instructions below..</td>
        </tr>
        <tr>
            <td>darkTheme</td>
             <td>object</td>
              <td>as per your needs</td>
               <td>empty object</td>
                <td>Same as above.</td>
        </tr>
          <tr>
            <td>stackIndex</td>
             <td>number</td>
              <td>as per your needs</td>
               <td>5000</td>
                <td>Postion on the Z axis.</td>
        </tr>
         <tr>
            <td>maxUploadSize</td>
             <td>string, number</td>
              <td>as per your needs</td>
               <td>5242880 (5 megabytes)</td>
                <td>Maximum allowed byte size of a single file upload.</td>
        </tr>
    </tbody>
</thead>

</table>

</div>

<h5 style="margin:0 ; padding: 0;">File tree:</h5>

<div style="padding: 16px;">

```js

// A basic file tree structure

  [
    id: 'root', // or public, or anything (the top level folder)
    parent_id: null,
    dir: true,
    info: {
       created: "20.10.2019 01:46:40",
       mb: "0.05",
       bytes: "63564",
    },
    children: [
      {
        id: "root/subfolder"
        parent_id: "root",
        dir: true,
        info: {
          //...
        },
        children: [
          {
            id: 'root/subfolder/some_image.jpg', // every id is built upon the parent's id
            parent_id: 'root/subfolder',
            dir: false,
            info {
                  //...
            },
            // other children
          }

        ]
      }

    ]
  ]

```

</div>

<h5 style="margin:0 ; padding: 0;">Custom themes:</h5>

<div style="padding: 16px;">

<p style="font-size: 15px">Including a custom light / dark theme is very easy. Just override the properties below, and pass the object with the rest of the options.</p>

```js

 {
    overlay: "rgba(255,255,255,0.5)", // selected tile / record overlay
    input: {
      background: "transparent", // input background
      border: "#08acff", // input border
    },
    surface1: "#101010", // global
    surface2: "#6c6c6c", // file display
    surface3: "#030303", // navigation tree
    surface4: "#393939", // image / tile wrapper
    surface5: "#393939", // row / record wrapper
    surface6: "#141414", // context menu
    surface7: "#141414", // tooltip
    divider: "#3a3a3a", // border between sections
    font1: "#fff", // main font
    font2: "#c4c4c4", // secondary font
    font3: "#fff", // navigation font
    font4: "#fff", // contrast font
    syntax1: "darkgoldenrod", // folders on the main screen
    syntax2: "darkgoldenrod", // folders in the navigation tree
    syntax3: "#fff", // files on the main screen
    syntax4: "#fff", // files in the navigation tree
    syntaxFocus: "#08acff", // selection, focus
    primary: "#08acff", // primary color
    secondary: "#c4c4c4", // secondary color
    highlight: "rgba(255, 255, 255, 0.09)", // icon buttons background on hover
    shadow1: "0px 8px 13px -10px rgba(0, 0, 0, 0.25)", // global & tile shadow
    shadow2: "-5px 4px 12px -10px rgba(0, 0, 0, 1)", // dock shadow (right dock menu appears on smaller screens)
    shadow3:
      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px", // menu, modal, tooltip
    shadow4:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // file rows
  },

```

</div>

<h5 style="margin:0 ; padding: 0;">Backend:</h5>

<div style="padding: 16px;">
<p style="font-size: 15px">The component is not bound nor should be to any backend implementation. It's concerned on accepting, parsing and displaying data. It communicates using http requests, but how they get processed is beyond it's concern. This means that you can use it with any http compatible solution. However, this section covers only <strong>nodejs</strong>.</p>

<h6>Prebuilt setups for node filesystem:</h6>

<p style="font-size: 15px">These will setup all the necessary routes. Some additional steps might be required on you part depending on your case (setting up a static folder if you don't have that already, enabling cors maybe.).</p>

<p style="font-size: 15px"><p>

<a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-express">
jb-fmanager-express</a>
</br>
<a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-fastify">
jb-fmanager-fastify</a>
</br>
<a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-koa">
jb-fmanager-koa</a>

<h6>Service packages:</h6>

<p style="font-size: 15px">If you like more control you can use these packages directly:</p>

<p  style="font-size: 15px"><a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-node-utils">jb-fmanager-node-utils</a> if you use a server / filesystem storage.</p>
<p style="font-size: 15px"><a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-s3">jb-fmanager-s3</a> if you use the AWS S3 storage.</p>

</div>
