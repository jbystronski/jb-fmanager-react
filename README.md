<h4>File manager / image browser for React applications</h4>

<h5 style="margin:0 ; padding: 0;">Overview:</h5>

<div style="padding: 16px;">
<p style="font-size: 15px">This package provides an intuitive GUI to easily manage your storage filesystem, share and organize files / images across your application. It aims to reproduce the experience of using a desktop file manager in a web browser context.</p>
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
import { ReactFileManger } from "@jb_fmanager/react";

// include it anywhere in your app

const App = () => {
  return (
    <App>
      {open && (
        <ReactFileManager
          host="http://localhost:4000"
          isOpen={open}
          mount="public"
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

<h5 style="margin:0 ; padding: 0;">Backend:</h5>

<div style="padding: 16px;">
<p style="font-size: 15px">The component is not bound nor should be to any backend implementation. It's concerned on accepting, parsing and displaying data. It communicates using http requests, but how they get processed is beyond it's concern. This means that you can use it with any http compatible solution. However, this section covers only <strong>nodejs</strong>.</p>

<h6>Prebuilt setups:</h6>

<p style="font-size: 15px"><p>

<a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-express">
jb-fmanager-express</a>
</br>
<a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-fastify">
jb-fmanager-fastify</a>
</br>
<a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-koa">
jb-fmanager-koa</a>

<p style="font-size: 15px">Out of the box working route setups. Some additional steps might be required on you part (cors, static serving), but you might have that already. The list should extend over time.</p>

<h6>Bare bones utility package:</h6>

<a style="font-size: 15px;" href="https://github.com/jbystronski/jb-fmanager-node-utils">jb-fmanager-node-utils</a>

<p style="font-size: 15px">This is the essential package that supports the incoming requests in nodejs environment. It comes down to matching the API the module exposes to a specific route built according to your framework's specification.</p>

</div>
