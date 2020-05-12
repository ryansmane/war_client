(this["webpackJsonpwar-client"]=this["webpackJsonpwar-client"]||[]).push([[0],{100:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(46),c=t.n(l);t(56);var s=function(){return r.a.createElement("div",{className:"header-box"},r.a.createElement("img",{className:"logo",src:"/images/logo.png",alt:"a cute shark holding cards"}),r.a.createElement("div",{className:"title-box"},r.a.createElement("h1",null,"Shark Haven")))},i=t(4),m=t(27),o=t(12),u=t(58),d=u.lowercase,E=u.uppercase;var g=function(e){var a=e.socket,t=Object(n.useState)({}),l=Object(i.a)(t,2),c=l[0],s=l[1],u=Object(n.useState)(""),g=Object(i.a)(u,2),p=g[0],y=g[1],w=Object(n.useState)(2),v=Object(i.a)(w,2),b=v[0],f=v[1],h=Object(n.useState)(!1),N=Object(i.a)(h,2),j=N[0],O=N[1],k=Object(n.useState)(),P=Object(i.a)(k,2),S=P[0],_=P[1],C=Object(n.useState)(!1),W=Object(i.a)(C,2),F=W[0],L=W[1],R=Object(n.useState)(""),x=Object(i.a)(R,2),M=x[0],H=x[1];return Object(n.useEffect)((function(){_("".concat(o.sample(E)).concat(o.sample(d))),a.on("return-rooms",(function(e){s(e),console.log(e)})),a.on("all-players-in",(function(a){e.routerProps.history.push("/cardroom/".concat(a))}))}),[]),r.a.createElement("div",null,!j&&S&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"waiting-room"},r.a.createElement("h2",null,"Welcome, Shark ",r.a.createElement("em",null,S),"!"),r.a.createElement("h3",null,"Card Rooms:"),r.a.createElement("ul",null,0===Object.values(c).length&&r.a.createElement("li",null,"No Lobbies At This Time"),c&&Object.values(c).map((function(e){return r.a.createElement("li",null,"Room Name:",e.name," | Members:"," ",Object.keys(e.players).length," /"," ",e.capacity,e.capacity>Object.keys(e.players).length&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(t){return function(e,t,n){O(!0),n.preventDefault(),H(e),a.emit("join-room",{host:e,name:t,username:S})}(e.host,e.name,t)}},"Join Room")),e.capacity<=Object.keys(e.players).length&&r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"(Full)")))}))),r.a.createElement("button",{className:"button-create",onClick:function(){return function(){var e=document.querySelector(".create-box"),a=document.querySelector(".button-create");e.style.display="none"===e.style.display?"block":"none",a.style.display="none"}()}},"Create Room"),r.a.createElement("div",{style:{display:"none"},className:"create-box"},r.a.createElement("form",{className:"ifield"},r.a.createElement("div",null,r.a.createElement("label",null,"Room Name"),r.a.createElement("input",{type:"text",onChange:function(e){return y(e.target.value)}})),F&&r.a.createElement("p",{style:{textAlign:"center"}},"Room name cannot be empty."),r.a.createElement("div",{className:"form-cap"},r.a.createElement("label",null,"Players:"),r.a.createElement(m.a.Control,{onChange:function(e){return f(e.target.value)},as:"select"},r.a.createElement("option",null,"2"),r.a.createElement("option",null,"3"),r.a.createElement("option",null,"4"),r.a.createElement("option",null,"5"),r.a.createElement("option",null,"6"))),r.a.createElement("div",{className:"form-cap"},r.a.createElement("label",null,"Game:"),r.a.createElement(m.a.Control,{as:"select"},r.a.createElement("option",null,"War"))),r.a.createElement("button",{type:"button",onClick:function(e){return function(e){if(e.preventDefault(),""===p)L(!0);else{L(!1),O(!0),H(a.id);var t={host:a.id,name:p,assigned:!1,capacity:b,desiredName:S};a.emit("create-room",t)}}(e)}},"Create Room"))))),j&&Object.values(c).length>0&&r.a.createElement("div",null,r.a.createElement("h1",null,"Waiting for more players..."),r.a.createElement("h4",null,"Settings:"),r.a.createElement("p",null,"Room Name: ".concat(p)),c[M]&&r.a.createElement("p",null,"Joined Players: ".concat(Object.values(c[M].players).length,"/").concat(c[M].capacity)),r.a.createElement("p",null,"Game: War")))},p=t(12);var y=function(e){return r.a.createElement("div",{className:"enemy-unit"},e.warState&&!p.isEmpty(e.warringPlayers)&&e.warringPlayers[e.id]&&r.a.createElement("div",{className:"enemy-info-at-war"},e.winner===e.id&&r.a.createElement("img",{className:"crown",src:"/images/crown.png",alt:"winner"}),r.a.createElement("div",{className:"name-and-count"},r.a.createElement("span",null,e.name),e.warState&&!p.isEmpty(e.warringPlayers)&&e.warringPlayers[e.id]&&Object.values(e.warringPlayers).map((function(e){return r.a.createElement("img",{className:"sword",src:"/images/war_sword.png",alt:"sword"})})),r.a.createElement("span",null,"".concat(e.deckLength,"/52")))),!e.warState&&!e.warringPlayers[e.id]&&r.a.createElement("div",null,r.a.createElement("div",{className:"name-and-count"},r.a.createElement("span",null,e.name),e.warState&&!p.isEmpty(e.warringPlayers)&&e.warringPlayers[e.id]&&Object.values(e.warringPlayers).map((function(e){return r.a.createElement("img",{className:"sword",src:"/images/war_sword.png",alt:"sword"})})),r.a.createElement("span",null,"".concat(e.deckLength,"/52")))),!e.deactivationMap[e.id]&&r.a.createElement("img",{className:"card",src:"/images/card_back_war.png",alt:"enemy back"}),e.deactivationMap[e.id]&&r.a.createElement("img",{style:{opacity:".5"},className:"card",src:"/images/lost_card_back_war.png",alt:"enemy back"}))},w=t(62).getPath;t(12);var v=function(e){return r.a.createElement(r.a.Fragment,null,!e.lost&&r.a.createElement(r.a.Fragment,null,e.readyPlayers&&e.readyPlayers[e.id]&&r.a.createElement("img",{className:"card",src:w(e.readyPlayers[e.id].card.pip,e.readyPlayers[e.id].card.suit),alt:"".concat(e.readyPlayers[e.id].card.pip).concat(e.readyPlayers[e.id].card.suit)}),e.readyPlayers&&!e.readyPlayers[e.id]&&e.winner!==e.id&&r.a.createElement("img",{className:"card",src:"/images/empty_card.png",alt:"slot"}),!e.readyPlayers&&r.a.createElement("img",{className:"card",src:"/images/empty_card.png",alt:"slot"}),e.readyPlayers&&!e.readyPlayers[e.id]&&e.winner===e.id&&r.a.createElement("img",{className:"card",src:"/images/winner_card.png",alt:"slot"})),e.lost&&r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{className:"card",src:"/images/cross_out.png",alt:"loser"})))};var b=function(e){var a=e.host,t=e.socket,l=Object(n.useState)(),c=Object(i.a)(l,2),s=c[0],m=c[1],o=Object(n.useState)(""),u=Object(i.a)(o,2),d=u[0],E=u[1];return Object(n.useEffect)((function(){t.on("messages-update",(function(e){m(e)}))}),[]),r.a.createElement("div",{className:"chat-box"},r.a.createElement("form",null,r.a.createElement("input",{value:d,onChange:function(e){return E(e.target.value)}}),r.a.createElement("button",{onClick:function(n){return function(n){n.preventDefault(),t.emit("send-message",{message:d,host:a,id:e.id}),n.target.value="",E("")}(n)}},"Send")),r.a.createElement("div",null,s&&s.map((function(e){return r.a.createElement("p",null,"Shark ",e.sender,": ",e.message)}))),r.a.createElement("p",null,"Game Started"))};t(12);var f=function(e){return r.a.createElement(r.a.Fragment,null,!e.lost&&r.a.createElement("div",{className:"action-select"},!e.warState&&!e.acted&&r.a.createElement("img",{className:"card animation-card",src:"/images/card_back_war.png",alt:"alt",onClick:function(){return e.shoot()}}),!e.warState&&e.acted&&r.a.createElement("img",{className:"card",src:"/images/card_back_war.png",alt:"alt"}),e.warState&&e.warringPlayers&&e.warringPlayers[e.id]&&!e.acted&&r.a.createElement("img",{className:"card",src:"/images/card_back_war.png",alt:"alt",onClick:function(){return e.resolveWar()}}),e.warState&&e.warringPlayers&&e.warringPlayers[e.id]&&e.acted&&r.a.createElement("img",{className:"card",src:"/images/card_back_war.png",alt:"alt"}),e.warState&&e.warringPlayers&&!e.warringPlayers[e.id]&&r.a.createElement("img",{className:"card",src:"/images/card_back_war.png",alt:"alt"}),r.a.createElement("div",null)),e.lost&&r.a.createElement("img",{className:"card",src:"/images/lost_card_back_war.png",alt:"alt"}))};var h=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"A player from your game has disconnected."),r.a.createElement("h4",null,"Redirecting in five seconds..."))};var N=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Click your deck to ready up!"),r.a.createElement("img",{src:"/images/card_back_war.png",alt:"click here to ready up",onClick:function(){return e.initMyself()}}))};var j=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"WINNER"))},O=t(63),k=O.Howl,P=(O.Howler,t(12));var S=function(e){var a=e.socket,t=new k({src:["/sounds/card_deal.wav"],volume:1}),l=new k({src:["/sounds/war_sound.wav"],volume:1}),c=Object(n.useState)(),s=Object(i.a)(c,2),m=s[0],o=s[1],u=Object(n.useState)(),d=Object(i.a)(u,2),E=d[0],g=d[1],p=Object(n.useState)(!1),w=Object(i.a)(p,2),O=w[0],S=w[1],_=Object(n.useState)(),C=Object(i.a)(_,2),W=C[0],F=C[1],L=Object(n.useState)(!1),R=Object(i.a)(L,2),x=R[0],M=R[1],H=Object(n.useState)({}),T=Object(i.a)(H,2),A=T[0],J=T[1],D=Object(n.useState)(),I=Object(i.a)(D,2),q=I[0],G=I[1],B=Object(n.useState)(!1),U=Object(i.a)(B,2),z=U[0],K=U[1],Q=Object(n.useState)({}),Y=Object(i.a)(Q,2),$=Y[0],V=Y[1],X=Object(n.useState)(!1),Z=Object(i.a)(X,2),ee=Z[0],ae=Z[1],te=Object(n.useState)(!1),ne=Object(i.a)(te,2),re=(ne[0],ne[1]),le=Object(n.useState)(!1),ce=Object(i.a)(le,2),se=ce[0],ie=ce[1];function me(){t.play(),re(!0),a.emit("ready-up",m)}function oe(){t.play(),a.emit("need-resolution",{host:m,warringPlayers:A})}return Object(n.useEffect)((function(){o(e.routerProps.location.pathname.substring(10)),a.on("return-all-players",(function(e){g(e.players),G(e.deckLengths)})),a.on("one-ready",(function(t){F(t.players),G(t.deckLengths),Object.values(t.players).length!==t.roomCap||t.war||setTimeout((function(){a.emit("refresh-cards",e.routerProps.location.pathname.substring(10))}),1500)})),a.on("resolved",(function(e){e.deactivationMap&&V(e.deactivationMap),e.ultimateWinner&&ae(e.winner),e.warHistory?(M(!1),F(e.warHistory),J({}),setTimeout((function(){K(e.winner),G(e.deckLengths),F(e.players)}),1500)):(M(!1),F(e.players),K(e.winner),G(e.deckLengths))})),a.on("war",(function(e){setTimeout((function(){e.deactivationMap&&V(e.deactivationMap),K(!1),G(e.deckLengths),F(e.players),J(e.warPlayers),M(!0)}),100),l.play()})),a.on("disconnected",(function(a){ie(!0),setTimeout((function(){return e.routerProps.history.push("/")}),5e3)}))}),[]),r.a.createElement(r.a.Fragment,null,!se&&r.a.createElement("div",{className:"felt-container"},m&&!E&&!O&&r.a.createElement(N,{host:m,initMyself:function(){S(!0),a.emit("init-one-player",m)}}),m&&!E&&O&&r.a.createElement("h1",null,"Waiting for other players to ready up..."),m&&E&&O&&!ee&&r.a.createElement("div",{className:"felt"},r.a.createElement("div",{className:"enemy-side"},Object.values(E).map((function(e){if(e.id!==a.id)return r.a.createElement("div",{className:"enemy-unit-container"},r.a.createElement("div",{className:"enemy-slot"},r.a.createElement(y,{warringPlayers:A,warState:x,name:e.name,deckLength:q?q[e.id]:null,id:e.id,deactivationMap:$,winner:z}),r.a.createElement("div",{className:"enemystaging"},r.a.createElement(v,{lost:!(!$||!$[e.id]),winner:z,warState:x,warringPlayers:A,id:e.id,readyPlayers:W||!1}))))}))),r.a.createElement("div",{className:"felt-partition"},x&&r.a.createElement("p",{className:"war-statement"},"WAR!")),!$[a.id]&&r.a.createElement("div",{className:"side-container"},r.a.createElement(b,{socket:a,host:e.routerProps.location.pathname.substring(10),id:a.id}),r.a.createElement("div",{className:"my-side"},r.a.createElement("div",{className:"my-staging"},r.a.createElement("div",null,r.a.createElement("div",{className:"f"},x&&!P.isEmpty(A)&&A[a.id]&&Object.values(A).map((function(e){return r.a.createElement("img",{className:"sword",src:"/images/war_sword.png",alt:"sword"})})),r.a.createElement("span",null,r.a.createElement("em",null,"S. ",E[a.id].name))),r.a.createElement(f,{lost:!1,name:E?E[a.id].name:"No Name Selected",deckLength:q?q[a.id]:null,warState:x,shoot:me,resolveWar:oe,winner:z,warringPlayers:A,id:a.id,acted:W&&W[a.id]?W[a.id].changed:null})),r.a.createElement("div",{className:"action-partition"}),r.a.createElement("div",null,r.a.createElement("div",{style:{visibility:"hidden"},className:"f"},x&&!P.isEmpty(A)&&A[a.id]&&Object.values(A).map((function(e){return r.a.createElement("img",{className:"sword",src:"/images/war_sword.png",alt:"sword"})})),r.a.createElement("span",null,E[a.id].name)),r.a.createElement(v,{lost:!1,winner:z,warState:x,warringPlayers:A,id:a.id,readyPlayers:W||!1}))),r.a.createElement("p",null,q&&"Card Count: ".concat(q[a.id],"/52")))),$[a.id]&&r.a.createElement("div",{className:"side-container"},r.a.createElement(b,{socket:a,host:e.routerProps.location.pathname.substring(10),id:a.id}),r.a.createElement("div",{className:"my-side"},r.a.createElement("div",{className:"my-staging"},r.a.createElement("div",null,r.a.createElement("div",{className:"f"},r.a.createElement("span",null,r.a.createElement("em",null,"S. ",E[a.id].name))),r.a.createElement(f,{lost:!0,name:E?E[a.id].name:"No Name Selected",deckLength:q?q[a.id]:null,warState:x,shoot:me,resolveWar:oe,winner:z,warringPlayers:A,id:a.id,acted:W&&W[a.id]?W[a.id].changed:null}),"}"),r.a.createElement("div",{className:"action-partition"}),r.a.createElement("div",null,r.a.createElement(v,{lost:!0,winner:z,warState:x,warringPlayers:A,id:a.id,readyPlayers:W||!1}))),r.a.createElement("p",null,q&&"Card Count: 0/52"))),ee===a.id&&r.a.createElement("div",{className:"winning-screen"},r.a.createElement("h1",null,"YOU WIN"))),O&&r.a.createElement("p",{className:"instructions"},"Have fun!")),se&&r.a.createElement(h,null),ee&&r.a.createElement(j,null))},_=t(10),C=(t(64),t(65),t(48)),W=t.n(C)()("https://sharkhaven.herokuapp.com/");var F=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",null,r.a.createElement(s,null)),r.a.createElement("main",null,r.a.createElement(_.c,null,r.a.createElement(_.a,{exact:!0,path:"/",render:function(e){return r.a.createElement(g,{socket:W,routerProps:e})}}),r.a.createElement(_.a,{path:"/cardroom/:roomID",render:function(e){return r.a.createElement(S,{socket:W,routerProps:e})}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var L=t(24);c.a.render(r.a.createElement(L.a,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},51:function(e,a,t){e.exports=t(100)},56:function(e,a,t){},58:function(e,a){var t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],n=t.map((function(e){return e.toUpperCase()}));a.lowercase=t,a.uppercase=n},62:function(e,a){a.getPath=function(e,a){return e<11?"/images/card_sprites/"+e.toString()+a+".png":"/images/card_sprites/"+{11:"J",12:"Q",13:"K",14:"A"}[e]+a+".png"}},64:function(e,a,t){},95:function(e,a){}},[[51,1,2]]]);
//# sourceMappingURL=main.7b0721b1.chunk.js.map