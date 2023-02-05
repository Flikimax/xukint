import{u as y,j as a,F as x,a as e}from"./app.98bbacce.js";import{E as n}from"./index.9548bb62.js";function F(l){const{categories:d,action:m,csrf:c}=l,u=l.errors;let{photo:t}=l;!t&&d.length>0&&(t={photo_category_id:d[0].id,nsfw:0,photo:null,photo_nsfw:null});const{data:i,setData:r,post:w,put:N,delete:h,processing:g,errors:s}=y(t),f=o=>{o.preventDefault(),confirm("\xBFDesea eliminar la publicaci\xF3n?")&&h(route("dashboard.photos.destroy",t))},p=o=>{o.preventDefault(),confirm("\xBFDesea eliminar la foto?")&&h(route("dashboard.photos.destroyPhoto",[t,o.target.name.value]))};return a(x,{children:[e("div",{className:t!=null&&t.url?"grid gap-6":"grid grid-cols-1",children:a("div",{className:"relative",children:[a("form",{method:"POST",action:l!=null&&l.action?route("dashboard.photos.update",i.slug):route("dashboard.photos.store"),encType:"multipart/form-data",children:[(l==null?void 0:l.action)&&e("input",{type:"hidden",name:"_method",value:"PUT"}),e("input",{type:"hidden",name:"_token",value:c}),a("div",{className:"overflow-hidden shadow sm:rounded-md",children:[e("div",{className:"bg-white px-4 py-5 sm:p-6",children:a("div",{className:"grid grid-cols-6 gap-6",children:[a("div",{className:"lg:col-span-3 col-span-6",children:[e("label",{htmlFor:"photo_category_id",className:"block text-sm font-medium text-gray-700",children:"Categor\xEDa *"}),e("select",{id:"photo_category_id",name:"photo_category_id",autoComplete:"photo_category_id",className:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",defaultValue:i.photo_category_id,onChange:o=>r("photo_category_id",o.target.value),children:d&&d.map(o=>e("option",{value:o.id,children:o.name},o.id))}),e(n,{error:s.photo_category_id})]}),a("div",{className:"lg:col-span-3 col-span-6",children:[e("label",{htmlFor:"photo_category_id",className:"block text-sm font-medium text-gray-700",children:"NSFW *"}),a("select",{id:"nsfw",name:"nsfw",autoComplete:"nsfw",defaultValue:i.nsfw,className:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",onChange:o=>r("nsfw",o.target.value),children:[e("option",{value:"0",children:"No"}),e("option",{value:"1",children:"Si"})]}),e(n,{error:s.nsfw})]}),a("div",{className:t!=null&&t.url?"col-span-6 lg:col-span-6 ":"lg:col-span-3 col-span-6",children:[e("label",{htmlFor:"title",className:"block text-sm font-medium text-gray-700",children:"Titulo *"}),e("input",{type:"text",name:"title",id:"name",autoComplete:"title",className:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",defaultValue:i.title,onChange:o=>r("title",o.target.value)}),e(n,{error:u.title}),e(n,{error:u.slug})]}),!(t!=null&&t.url)&&a("div",{className:"lg:col-span-3 col-span-6",children:[e("label",{htmlFor:"photo",className:"block text-sm font-medium text-gray-700",children:"Foto"}),e("input",{className:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md","aria-describedby":"file_input_help",id:"photo",name:"photo",type:"file",accept:"image/*",onChange:o=>r("photo",o.target.value)}),e(n,{error:s.photo})]}),!(t!=null&&t.url_nsfw)&&(i==null?void 0:i.nsfw)=="1"&&a("div",{className:"lg:col-span-3 col-span-6",children:[e("label",{htmlFor:"photo_nsfw",className:"block text-sm font-medium text-gray-700",children:"Versi\xF3n  NSFW"}),e("input",{className:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md","aria-describedby":"file_input_help",id:"photo_nsfw",name:"photo_nsfw",type:"file",accept:"image/*",onChange:o=>r("photo_nsfw",o.target.value)}),e(n,{error:s.photo_nsfw})]}),a("div",{className:"col-span-6",children:[e("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700",children:"Description"}),e("textarea",{name:"description",id:"description",cols:"30",rows:"10",onChange:o=>r("description",o.target.value),className:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"}),e(n,{error:s.description})]})]})}),e("div",{className:"bg-gray-50 px-4 py-3 text-right sm:px-6",children:e("button",{type:"submit",disabled:g,className:"inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Save"})})]})]}),m==="update"&&a("form",{action:"#",method:"POST",onSubmit:f,className:"absolute left-0 bottom-0 px-6 py-3 text-sm",children:[e("input",{type:"hidden",name:"_method",value:"DELETE"}),e("input",{type:"hidden",name:"_token",value:c}),e("button",{type:"submit",className:"rounded-md",children:"Eliminar"})]})]})}),m==="update"&&a("div",{className:"grid grid-cols-2",children:[(t==null?void 0:t.url)&&a("div",{className:"px-4 py-5 bg-white sm:p-6",children:[e("p",{className:"font-bold text-center my-4",children:"Foto"}),a("picture",{children:[e("source",{srcSet:t.url,type:"image/webp"}),e("img",{className:"w-full block",src:t.url,alt:t.title})]}),a("form",{action:"#",method:"POST",onSubmit:p,className:"block text-center px-6 py-3 text-sm",children:[e("input",{type:"hidden",name:"name",value:"url"}),e("input",{type:"hidden",name:"_method",value:"DELETE"}),e("input",{type:"hidden",name:"_token",value:c}),e("button",{type:"submit",className:"rounded-md",children:"Eliminar foto"})]})]}),(t==null?void 0:t.url_nsfw)&&(t==null?void 0:t.nsfw)==1&&a("div",{className:"px-4 py-5 bg-white sm:p-6",children:[e("p",{className:"font-bold text-center my-4",children:"Versi\xF3n NSFW"}),a("picture",{children:[e("source",{srcSet:t.url_nsfw,type:"image/webp"}),e("img",{className:"w-full block",src:t.url_nsfw,alt:t.title})]}),a("form",{action:"#",method:"POST",onSubmit:p,className:"block text-center px-6 py-3 text-sm",children:[e("input",{type:"hidden",name:"name",value:"url_nsfw"}),e("input",{type:"hidden",name:"_method",value:"DELETE"}),e("input",{type:"hidden",name:"_token",value:c}),e("button",{type:"submit",className:"rounded-md",children:"Eliminar foto"})]})]})]})]})}export{F as default};
