var g=Object.defineProperty;var p=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var u=(e,t,n)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,q=(e,t)=>{for(var n in t||(t={}))h.call(t,n)&&u(e,n,t[n]);if(p)for(var n of p(t))R.call(t,n)&&u(e,n,t[n]);return e};import{c as B}from"./cms.ab095d49.js";import{_ as N}from"./index.6f067a4f.js";import{m as V,r as b,a0 as y,Y as x,A as s,B as C,C as T,D as a,E as o,O as i,P as m,a1 as A}from"./vendor.34d1beb4.js";import"./vendor-quasar.fc061f32.js";const D={setup(){let e=V({content:{},createdTime:null});const t=b(null);let n=b({});const c=()=>{t.value.start(),B.get(1).then(r=>{e.content=r.data,e.createdTime=r.data.createdTime;const l=t.value;l&&l.stop()})},f=y(e,"createdTime");return x(e),q({bar:t,content:n,getContent:c,createdTime:f},x(e))}},w=i("Get content");function z(e,t,n,c,f,j){const r=s("q-ajax-bar"),l=s("q-btn"),_=s("q-item-section"),d=s("q-item"),k=s("q-list"),v=s("q-page");return C(),T(v,{class:"q-ma-md"},{default:a(()=>[o(r,{ref:"bar",position:"bottom",color:"accent",size:"6px","skip-hijack":""},null,512),o(l,{onClick:c.getContent},{default:a(()=>[w]),_:1},8,["onClick"]),c.content.id?(C(),T(k,{key:0,bordered:"",separator:"",class:"q-mt-md"},{default:a(()=>[o(d,null,{default:a(()=>[o(_,null,{default:a(()=>[i("id: "+m(c.content.id),1)]),_:1})]),_:1}),o(d,null,{default:a(()=>[o(_,null,{default:a(()=>[i(" name: "+m(c.content.name),1)]),_:1})]),_:1}),o(d,null,{default:a(()=>[o(_,null,{default:a(()=>[i(" createdTime: "+m(c.createdTime),1)]),_:1})]),_:1})]),_:1})):A("",!0)]),_:1})}var Y=N(D,[["render",z]]);export{Y as default};