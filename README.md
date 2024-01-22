#Parcel
-Dev Build
-Local server
-HMR (hot Module Reloading) -(it update the all changes)
-File Watching Algorithm -- written in c++
-caching
-Image optimization
- Minification
-Bundling
-Compressing the file
- Consistent Hashing
-code splitting
- differential bundling - it will give you the support older browser
-Https
-tree shaking - remove unused code
-different dev and prod bundler




Two types of Export/Import 
export default component;
import component from path;
- Named Export/Import
export const Component;
import {Component} from "path";


# React Hooks
(Normal Javascript utility functions)
- useState() - superpowerfull react variables
- useEffect() 
# 2 types of routing in a web app
- client side Routing
- server side Routing

# Lazy Loading
- it is used to increase an application's performance by redcing the initial loading time
- it use lazy(()=>import("path")) here import is a function
- Also we need to wrap up the component inside <Suspense fallback={}> component </Suspense> // here in fallback we can show shimmer or loading till component loads.
