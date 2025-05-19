var d1 = Object.defineProperty;
var m1 = (t, i, a) => i in t ? d1(t, i, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[i] = a;
var It = (t, i, a) => m1(t, typeof i != "symbol" ? i + "" : i, a);
import * as H from "react";
import ie, { forwardRef as pu, useRef as pe, useCallback as ze, useEffect as Ve, useState as Ee, useMemo as Me, useLayoutEffect as Vf, useContext as Ke, createContext as ot, Fragment as Zt, isValidElement as g1, cloneElement as p1, createElement as h1, useId as Rn, useReducer as kf, useSyncExternalStore as v1, createRef as y1 } from "react";
import * as ou from "react-dom";
import b1, { createPortal as Uf, flushSync as fa } from "react-dom";
function S1(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var kc = { exports: {} }, dr = {}, Uc = { exports: {} }, Bc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qp;
function x1() {
  return qp || (qp = 1, function(t) {
    function i(X, W) {
      var Z = X.length;
      X.push(W);
      e: for (; 0 < Z; ) {
        var K = Z - 1 >>> 1, ae = X[K];
        if (0 < u(ae, W))
          X[K] = W, X[Z] = ae, Z = K;
        else break e;
      }
    }
    function a(X) {
      return X.length === 0 ? null : X[0];
    }
    function r(X) {
      if (X.length === 0) return null;
      var W = X[0], Z = X.pop();
      if (Z !== W) {
        X[0] = Z;
        e: for (var K = 0, ae = X.length, re = ae >>> 1; K < re; ) {
          var me = 2 * (K + 1) - 1, V = X[me], I = me + 1, de = X[I];
          if (0 > u(V, Z))
            I < ae && 0 > u(de, V) ? (X[K] = de, X[I] = Z, K = I) : (X[K] = V, X[me] = Z, K = me);
          else if (I < ae && 0 > u(de, Z))
            X[K] = de, X[I] = Z, K = I;
          else break e;
        }
      }
      return W;
    }
    function u(X, W) {
      var Z = X.sortIndex - W.sortIndex;
      return Z !== 0 ? Z : X.id - W.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      t.unstable_now = function() {
        return c.now();
      };
    } else {
      var d = Date, m = d.now();
      t.unstable_now = function() {
        return d.now() - m;
      };
    }
    var g = [], p = [], v = 1, w = null, S = 3, y = !1, b = !1, R = !1, M = typeof setTimeout == "function" ? setTimeout : null, N = typeof clearTimeout == "function" ? clearTimeout : null, j = typeof setImmediate < "u" ? setImmediate : null;
    function $(X) {
      for (var W = a(p); W !== null; ) {
        if (W.callback === null) r(p);
        else if (W.startTime <= X)
          r(p), W.sortIndex = W.expirationTime, i(g, W);
        else break;
        W = a(p);
      }
    }
    function B(X) {
      if (R = !1, $(X), !b)
        if (a(g) !== null)
          b = !0, se();
        else {
          var W = a(p);
          W !== null && ue(B, W.startTime - X);
        }
    }
    var Y = !1, Q = -1, ee = 5, O = -1;
    function C() {
      return !(t.unstable_now() - O < ee);
    }
    function _() {
      if (Y) {
        var X = t.unstable_now();
        O = X;
        var W = !0;
        try {
          e: {
            b = !1, R && (R = !1, N(Q), Q = -1), y = !0;
            var Z = S;
            try {
              t: {
                for ($(X), w = a(g); w !== null && !(w.expirationTime > X && C()); ) {
                  var K = w.callback;
                  if (typeof K == "function") {
                    w.callback = null, S = w.priorityLevel;
                    var ae = K(
                      w.expirationTime <= X
                    );
                    if (X = t.unstable_now(), typeof ae == "function") {
                      w.callback = ae, $(X), W = !0;
                      break t;
                    }
                    w === a(g) && r(g), $(X);
                  } else r(g);
                  w = a(g);
                }
                if (w !== null) W = !0;
                else {
                  var re = a(p);
                  re !== null && ue(
                    B,
                    re.startTime - X
                  ), W = !1;
                }
              }
              break e;
            } finally {
              w = null, S = Z, y = !1;
            }
            W = void 0;
          }
        } finally {
          W ? k() : Y = !1;
        }
      }
    }
    var k;
    if (typeof j == "function")
      k = function() {
        j(_);
      };
    else if (typeof MessageChannel < "u") {
      var U = new MessageChannel(), te = U.port2;
      U.port1.onmessage = _, k = function() {
        te.postMessage(null);
      };
    } else
      k = function() {
        M(_, 0);
      };
    function se() {
      Y || (Y = !0, k());
    }
    function ue(X, W) {
      Q = M(function() {
        X(t.unstable_now());
      }, W);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(X) {
      X.callback = null;
    }, t.unstable_continueExecution = function() {
      b || y || (b = !0, se());
    }, t.unstable_forceFrameRate = function(X) {
      0 > X || 125 < X ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ee = 0 < X ? Math.floor(1e3 / X) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, t.unstable_getFirstCallbackNode = function() {
      return a(g);
    }, t.unstable_next = function(X) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var W = 3;
          break;
        default:
          W = S;
      }
      var Z = S;
      S = W;
      try {
        return X();
      } finally {
        S = Z;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(X, W) {
      switch (X) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          X = 3;
      }
      var Z = S;
      S = X;
      try {
        return W();
      } finally {
        S = Z;
      }
    }, t.unstable_scheduleCallback = function(X, W, Z) {
      var K = t.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? K + Z : K) : Z = K, X) {
        case 1:
          var ae = -1;
          break;
        case 2:
          ae = 250;
          break;
        case 5:
          ae = 1073741823;
          break;
        case 4:
          ae = 1e4;
          break;
        default:
          ae = 5e3;
      }
      return ae = Z + ae, X = {
        id: v++,
        callback: W,
        priorityLevel: X,
        startTime: Z,
        expirationTime: ae,
        sortIndex: -1
      }, Z > K ? (X.sortIndex = Z, i(p, X), a(g) === null && X === a(p) && (R ? (N(Q), Q = -1) : R = !0, ue(B, Z - K))) : (X.sortIndex = ae, i(g, X), b || y || (b = !0, se())), X;
    }, t.unstable_shouldYield = C, t.unstable_wrapCallback = function(X) {
      var W = S;
      return function() {
        var Z = S;
        S = W;
        try {
          return X.apply(this, arguments);
        } finally {
          S = Z;
        }
      };
    };
  }(Bc)), Bc;
}
var Gp;
function w1() {
  return Gp || (Gp = 1, Uc.exports = x1()), Uc.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yp;
function E1() {
  if (Yp) return dr;
  Yp = 1;
  var t = w1(), i = ie, a = b1;
  function r(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        n += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  var c = Symbol.for("react.element"), d = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), S = Symbol.for("react.consumer"), y = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), $ = Symbol.for("react.offscreen"), B = Symbol.for("react.memo_cache_sentinel"), Y = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object" ? null : (e = Y && e[Y] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ee = Symbol.for("react.client.reference");
  function O(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ee ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case g:
        return "Fragment";
      case m:
        return "Portal";
      case v:
        return "Profiler";
      case p:
        return "StrictMode";
      case R:
        return "Suspense";
      case M:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case y:
          return (e.displayName || "Context") + ".Provider";
        case S:
          return (e._context.displayName || "Context") + ".Consumer";
        case b:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case N:
          return n = e.displayName || null, n !== null ? n : O(e.type) || "Memo";
        case j:
          n = e._payload, e = e._init;
          try {
            return O(e(n));
          } catch {
          }
      }
    return null;
  }
  var C = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _ = Object.assign, k, U;
  function te(e) {
    if (k === void 0)
      try {
        throw Error();
      } catch (l) {
        var n = l.stack.trim().match(/\n( *(at )?)/);
        k = n && n[1] || "", U = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + k + e + U;
  }
  var se = !1;
  function ue(e, n) {
    if (!e || se) return "";
    se = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var J = function() {
                throw Error();
              };
              if (Object.defineProperty(J.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(J, []);
                } catch (q) {
                  var F = q;
                }
                Reflect.construct(e, [], J);
              } else {
                try {
                  J.call();
                } catch (q) {
                  F = q;
                }
                e.call(J.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                F = q;
              }
              (J = e()) && typeof J.catch == "function" && J.catch(function() {
              });
            }
          } catch (q) {
            if (q && F && typeof q.stack == "string")
              return [q.stack, F.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = o.DetermineComponentFrameRoot(), h = f[0], x = f[1];
      if (h && x) {
        var T = h.split(`
`), D = x.split(`
`);
        for (s = o = 0; o < T.length && !T[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; s < D.length && !D[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (o === T.length || s === D.length)
          for (o = T.length - 1, s = D.length - 1; 1 <= o && 0 <= s && T[o] !== D[s]; )
            s--;
        for (; 1 <= o && 0 <= s; o--, s--)
          if (T[o] !== D[s]) {
            if (o !== 1 || s !== 1)
              do
                if (o--, s--, 0 > s || T[o] !== D[s]) {
                  var G = `
` + T[o].replace(" at new ", " at ");
                  return e.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", e.displayName)), G;
                }
              while (1 <= o && 0 <= s);
            break;
          }
      }
    } finally {
      se = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? te(l) : "";
  }
  function X(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return te(e.type);
      case 16:
        return te("Lazy");
      case 13:
        return te("Suspense");
      case 19:
        return te("SuspenseList");
      case 0:
      case 15:
        return e = ue(e.type, !1), e;
      case 11:
        return e = ue(e.type.render, !1), e;
      case 1:
        return e = ue(e.type, !0), e;
      default:
        return "";
    }
  }
  function W(e) {
    try {
      var n = "";
      do
        n += X(e), e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  function Z(e) {
    var n = e, l = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (l = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? l : null;
  }
  function K(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function ae(e) {
    if (Z(e) !== e)
      throw Error(r(188));
  }
  function re(e) {
    var n = e.alternate;
    if (!n) {
      if (n = Z(e), n === null) throw Error(r(188));
      return n !== e ? null : e;
    }
    for (var l = e, o = n; ; ) {
      var s = l.return;
      if (s === null) break;
      var f = s.alternate;
      if (f === null) {
        if (o = s.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (s.child === f.child) {
        for (f = s.child; f; ) {
          if (f === l) return ae(s), e;
          if (f === o) return ae(s), n;
          f = f.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== o.return) l = s, o = f;
      else {
        for (var h = !1, x = s.child; x; ) {
          if (x === l) {
            h = !0, l = s, o = f;
            break;
          }
          if (x === o) {
            h = !0, o = s, l = f;
            break;
          }
          x = x.sibling;
        }
        if (!h) {
          for (x = f.child; x; ) {
            if (x === l) {
              h = !0, l = f, o = s;
              break;
            }
            if (x === o) {
              h = !0, o = f, l = s;
              break;
            }
            x = x.sibling;
          }
          if (!h) throw Error(r(189));
        }
      }
      if (l.alternate !== o) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
    return l.stateNode.current === l ? e : n;
  }
  function me(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = me(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var V = Array.isArray, I = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, xe = [], _e = -1;
  function ne(e) {
    return { current: e };
  }
  function le(e) {
    0 > _e || (e.current = xe[_e], xe[_e] = null, _e--);
  }
  function oe(e, n) {
    _e++, xe[_e] = e.current, e.current = n;
  }
  var he = ne(null), Be = ne(null), qe = ne(null), $e = ne(null);
  function Fe(e, n) {
    switch (oe(qe, n), oe(Be, e), oe(he, null), e = n.nodeType, e) {
      case 9:
      case 11:
        n = (n = n.documentElement) && (n = n.namespaceURI) ? yp(n) : 0;
        break;
      default:
        if (e = e === 8 ? n.parentNode : n, n = e.tagName, e = e.namespaceURI)
          e = yp(e), n = bp(e, n);
        else
          switch (n) {
            case "svg":
              n = 1;
              break;
            case "math":
              n = 2;
              break;
            default:
              n = 0;
          }
    }
    le(he), oe(he, n);
  }
  function Re() {
    le(he), le(Be), le(qe);
  }
  function _t(e) {
    e.memoizedState !== null && oe($e, e);
    var n = he.current, l = bp(n, e.type);
    n !== l && (oe(Be, e), oe(he, l));
  }
  function we(e) {
    Be.current === e && (le(he), le(Be)), $e.current === e && (le($e), or._currentValue = de);
  }
  var Ie = Object.prototype.hasOwnProperty, Pt = t.unstable_scheduleCallback, Tn = t.unstable_cancelCallback, Wt = t.unstable_shouldYield, Ul = t.unstable_requestPaint, Xe = t.unstable_now, Jt = t.unstable_getCurrentPriorityLevel, nt = t.unstable_ImmediatePriority, bt = t.unstable_UserBlockingPriority, Lt = t.unstable_NormalPriority, pi = t.unstable_LowPriority, hi = t.unstable_IdlePriority, il = t.log, en = t.unstable_setDisableYieldValue, vn = null, Et = null;
  function Q0(e) {
    if (Et && typeof Et.onCommitFiberRoot == "function")
      try {
        Et.onCommitFiberRoot(
          vn,
          e,
          void 0,
          (e.current.flags & 128) === 128
        );
      } catch {
      }
  }
  function rl(e) {
    if (typeof il == "function" && en(e), Et && typeof Et.setStrictMode == "function")
      try {
        Et.setStrictMode(vn, e);
      } catch {
      }
  }
  var kt = Math.clz32 ? Math.clz32 : W0, K0 = Math.log, P0 = Math.LN2;
  function W0(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (K0(e) / P0 | 0) | 0;
  }
  var kr = 128, Ur = 4194304;
  function Bl(e) {
    var n = e & 42;
    if (n !== 0) return n;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194176;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Br(e, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var o = 0, s = e.suspendedLanes, f = e.pingedLanes, h = e.warmLanes;
    e = e.finishedLanes !== 0;
    var x = l & 134217727;
    return x !== 0 ? (l = x & ~s, l !== 0 ? o = Bl(l) : (f &= x, f !== 0 ? o = Bl(f) : e || (h = x & ~h, h !== 0 && (o = Bl(h))))) : (x = l & ~s, x !== 0 ? o = Bl(x) : f !== 0 ? o = Bl(f) : e || (h = l & ~h, h !== 0 && (o = Bl(h)))), o === 0 ? 0 : n !== 0 && n !== o && (n & s) === 0 && (s = o & -o, h = n & -n, s >= h || s === 32 && (h & 4194176) !== 0) ? n : o;
  }
  function vi(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function J0(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
        return n + 250;
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function sd() {
    var e = kr;
    return kr <<= 1, (kr & 4194176) === 0 && (kr = 128), e;
  }
  function cd() {
    var e = Ur;
    return Ur <<= 1, (Ur & 62914560) === 0 && (Ur = 4194304), e;
  }
  function zu(e) {
    for (var n = [], l = 0; 31 > l; l++) n.push(e);
    return n;
  }
  function yi(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ey(e, n, l, o, s, f) {
    var h = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var x = e.entanglements, T = e.expirationTimes, D = e.hiddenUpdates;
    for (l = h & ~l; 0 < l; ) {
      var G = 31 - kt(l), J = 1 << G;
      x[G] = 0, T[G] = -1;
      var F = D[G];
      if (F !== null)
        for (D[G] = null, G = 0; G < F.length; G++) {
          var q = F[G];
          q !== null && (q.lane &= -536870913);
        }
      l &= ~J;
    }
    o !== 0 && fd(e, o, 0), f !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(h & ~n));
  }
  function fd(e, n, l) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var o = 31 - kt(n);
    e.entangledLanes |= n, e.entanglements[o] = e.entanglements[o] | 1073741824 | l & 4194218;
  }
  function dd(e, n) {
    var l = e.entangledLanes |= n;
    for (e = e.entanglements; l; ) {
      var o = 31 - kt(l), s = 1 << o;
      s & n | e[o] & n && (e[o] |= n), l &= ~s;
    }
  }
  function md(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function gd() {
    var e = I.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Hp(e.type));
  }
  function ty(e, n) {
    var l = I.p;
    try {
      return I.p = e, n();
    } finally {
      I.p = l;
    }
  }
  var ol = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + ol, Ht = "__reactProps$" + ol, wa = "__reactContainer$" + ol, $u = "__reactEvents$" + ol, ny = "__reactListeners$" + ol, ly = "__reactHandles$" + ol, pd = "__reactResources$" + ol, bi = "__reactMarker$" + ol;
  function Lu(e) {
    delete e[Ct], delete e[Ht], delete e[$u], delete e[ny], delete e[ly];
  }
  function ql(e) {
    var n = e[Ct];
    if (n) return n;
    for (var l = e.parentNode; l; ) {
      if (n = l[wa] || l[Ct]) {
        if (l = n.alternate, n.child !== null || l !== null && l.child !== null)
          for (e = wp(e); e !== null; ) {
            if (l = e[Ct]) return l;
            e = wp(e);
          }
        return n;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Ea(e) {
    if (e = e[Ct] || e[wa]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Si(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Ca(e) {
    var n = e[pd];
    return n || (n = e[pd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function mt(e) {
    e[bi] = !0;
  }
  var hd = /* @__PURE__ */ new Set(), vd = {};
  function Gl(e, n) {
    Ra(e, n), Ra(e + "Capture", n);
  }
  function Ra(e, n) {
    for (vd[e] = n, e = 0; e < n.length; e++)
      hd.add(n[e]);
  }
  var Fn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ay = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), yd = {}, bd = {};
  function iy(e) {
    return Ie.call(bd, e) ? !0 : Ie.call(yd, e) ? !1 : ay.test(e) ? bd[e] = !0 : (yd[e] = !0, !1);
  }
  function qr(e, n, l) {
    if (iy(n))
      if (l === null) e.removeAttribute(n);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + l);
      }
  }
  function Gr(e, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + l);
    }
  }
  function Vn(e, n, l, o) {
    if (o === null) e.removeAttribute(l);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(n, l, "" + o);
    }
  }
  function tn(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Sd(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ry(e) {
    var n = Sd(e) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    ), o = "" + e[n];
    if (!e.hasOwnProperty(n) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var s = l.get, f = l.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(h) {
          o = "" + h, f.call(this, h);
        }
      }), Object.defineProperty(e, n, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return o;
        },
        setValue: function(h) {
          o = "" + h;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function Yr(e) {
    e._valueTracker || (e._valueTracker = ry(e));
  }
  function xd(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var l = n.getValue(), o = "";
    return e && (o = Sd(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== l ? (n.setValue(e), !0) : !1;
  }
  function Ir(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var oy = /[\n"\\]/g;
  function nn(e) {
    return e.replace(
      oy,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hu(e, n, l, o, s, f, h, x) {
    e.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"), n != null ? h === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + tn(n)) : e.value !== "" + tn(n) && (e.value = "" + tn(n)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"), n != null ? Fu(e, h, tn(n)) : l != null ? Fu(e, h, tn(l)) : o != null && e.removeAttribute("value"), s == null && f != null && (e.defaultChecked = !!f), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + tn(x) : e.removeAttribute("name");
  }
  function wd(e, n, l, o, s, f, h, x) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || l != null) {
      if (!(f !== "submit" && f !== "reset" || n != null))
        return;
      l = l != null ? "" + tn(l) : "", n = n != null ? "" + tn(n) : l, x || n === e.value || (e.value = n), e.defaultValue = n;
    }
    o = o ?? s, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = x ? e.checked : !!o, e.defaultChecked = !!o, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h);
  }
  function Fu(e, n, l) {
    n === "number" && Ir(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function Ta(e, n, l, o) {
    if (e = e.options, n) {
      n = {};
      for (var s = 0; s < l.length; s++)
        n["$" + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        s = n.hasOwnProperty("$" + e[l].value), e[l].selected !== s && (e[l].selected = s), s && o && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + tn(l), n = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          e[s].selected = !0, o && (e[s].defaultSelected = !0);
          return;
        }
        n !== null || e[s].disabled || (n = e[s]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Ed(e, n, l) {
    if (n != null && (n = "" + tn(n), n !== e.value && (e.value = n), l == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = l != null ? "" + tn(l) : "";
  }
  function Cd(e, n, l, o) {
    if (n == null) {
      if (o != null) {
        if (l != null) throw Error(r(92));
        if (V(o)) {
          if (1 < o.length) throw Error(r(93));
          o = o[0];
        }
        l = o;
      }
      l == null && (l = ""), n = l;
    }
    l = tn(n), e.defaultValue = l, o = e.textContent, o === l && o !== "" && o !== null && (e.value = o);
  }
  function Ma(e, n) {
    if (n) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var uy = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Rd(e, n, l) {
    var o = n.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? o ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : o ? e.setProperty(n, l) : typeof l != "number" || l === 0 || uy.has(n) ? n === "float" ? e.cssFloat = l : e[n] = ("" + l).trim() : e[n] = l + "px";
  }
  function Td(e, n, l) {
    if (n != null && typeof n != "object")
      throw Error(r(62));
    if (e = e.style, l != null) {
      for (var o in l)
        !l.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var s in n)
        o = n[s], n.hasOwnProperty(s) && l[s] !== o && Rd(e, s, o);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && Rd(e, f, n[f]);
  }
  function Vu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var sy = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), cy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xr(e) {
    return cy.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  var ku = null;
  function Uu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Oa = null, _a = null;
  function Md(e) {
    var n = Ea(e);
    if (n && (e = n.stateNode)) {
      var l = e[Ht] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Hu(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), n = l.name, l.type === "radio" && n != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + nn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < l.length; n++) {
              var o = l[n];
              if (o !== e && o.form === e.form) {
                var s = o[Ht] || null;
                if (!s) throw Error(r(90));
                Hu(
                  o,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (n = 0; n < l.length; n++)
              o = l[n], o.form === e.form && xd(o);
          }
          break e;
        case "textarea":
          Ed(e, l.value, l.defaultValue);
          break e;
        case "select":
          n = l.value, n != null && Ta(e, !!l.multiple, n, !1);
      }
    }
  }
  var Bu = !1;
  function Od(e, n, l) {
    if (Bu) return e(n, l);
    Bu = !0;
    try {
      var o = e(n);
      return o;
    } finally {
      if (Bu = !1, (Oa !== null || _a !== null) && (jo(), Oa && (n = Oa, e = _a, _a = Oa = null, Md(n), e)))
        for (n = 0; n < e.length; n++) Md(e[n]);
    }
  }
  function xi(e, n) {
    var l = e.stateNode;
    if (l === null) return null;
    var o = l[Ht] || null;
    if (o === null) return null;
    l = o[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        r(231, n, typeof l)
      );
    return l;
  }
  var qu = !1;
  if (Fn)
    try {
      var wi = {};
      Object.defineProperty(wi, "passive", {
        get: function() {
          qu = !0;
        }
      }), window.addEventListener("test", wi, wi), window.removeEventListener("test", wi, wi);
    } catch {
      qu = !1;
    }
  var ul = null, Gu = null, Zr = null;
  function _d() {
    if (Zr) return Zr;
    var e, n = Gu, l = n.length, o, s = "value" in ul ? ul.value : ul.textContent, f = s.length;
    for (e = 0; e < l && n[e] === s[e]; e++) ;
    var h = l - e;
    for (o = 1; o <= h && n[l - o] === s[f - o]; o++) ;
    return Zr = s.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Qr(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Kr() {
    return !0;
  }
  function Ad() {
    return !1;
  }
  function Ft(e) {
    function n(l, o, s, f, h) {
      this._reactName = l, this._targetInst = s, this.type = o, this.nativeEvent = f, this.target = h, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (l = e[x], this[x] = l ? l(f) : f[x]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Kr : Ad, this.isPropagationStopped = Ad, this;
    }
    return _(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Kr);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Kr);
      },
      persist: function() {
      },
      isPersistent: Kr
    }), n;
  }
  var Yl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Pr = Ft(Yl), Ei = _({}, Yl, { view: 0, detail: 0 }), fy = Ft(Ei), Yu, Iu, Ci, Wr = _({}, Ei, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Zu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ci && (Ci && e.type === "mousemove" ? (Yu = e.screenX - Ci.screenX, Iu = e.screenY - Ci.screenY) : Iu = Yu = 0, Ci = e), Yu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Iu;
    }
  }), Dd = Ft(Wr), dy = _({}, Wr, { dataTransfer: 0 }), my = Ft(dy), gy = _({}, Ei, { relatedTarget: 0 }), Xu = Ft(gy), py = _({}, Yl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), hy = Ft(py), vy = _({}, Yl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), yy = Ft(vy), by = _({}, Yl, { data: 0 }), Nd = Ft(by), Sy = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, xy = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, wy = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ey(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = wy[e]) ? !!n[e] : !1;
  }
  function Zu() {
    return Ey;
  }
  var Cy = _({}, Ei, {
    key: function(e) {
      if (e.key) {
        var n = Sy[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Qr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? xy[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Zu,
    charCode: function(e) {
      return e.type === "keypress" ? Qr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ry = Ft(Cy), Ty = _({}, Wr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), jd = Ft(Ty), My = _({}, Ei, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zu
  }), Oy = Ft(My), _y = _({}, Yl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ay = Ft(_y), Dy = _({}, Wr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ny = Ft(Dy), jy = _({}, Yl, {
    newState: 0,
    oldState: 0
  }), zy = Ft(jy), $y = [9, 13, 27, 32], Qu = Fn && "CompositionEvent" in window, Ri = null;
  Fn && "documentMode" in document && (Ri = document.documentMode);
  var Ly = Fn && "TextEvent" in window && !Ri, zd = Fn && (!Qu || Ri && 8 < Ri && 11 >= Ri), $d = " ", Ld = !1;
  function Hd(e, n) {
    switch (e) {
      case "keyup":
        return $y.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Fd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Aa = !1;
  function Hy(e, n) {
    switch (e) {
      case "compositionend":
        return Fd(n);
      case "keypress":
        return n.which !== 32 ? null : (Ld = !0, $d);
      case "textInput":
        return e = n.data, e === $d && Ld ? null : e;
      default:
        return null;
    }
  }
  function Fy(e, n) {
    if (Aa)
      return e === "compositionend" || !Qu && Hd(e, n) ? (e = _d(), Zr = Gu = ul = null, Aa = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return zd && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Vy = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Vd(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Vy[e.type] : n === "textarea";
  }
  function kd(e, n, l, o) {
    Oa ? _a ? _a.push(o) : _a = [o] : Oa = o, n = Fo(n, "onChange"), 0 < n.length && (l = new Pr(
      "onChange",
      "change",
      null,
      l,
      o
    ), e.push({ event: l, listeners: n }));
  }
  var Ti = null, Mi = null;
  function ky(e) {
    mp(e, 0);
  }
  function Jr(e) {
    var n = Si(e);
    if (xd(n)) return e;
  }
  function Ud(e, n) {
    if (e === "change") return n;
  }
  var Bd = !1;
  if (Fn) {
    var Ku;
    if (Fn) {
      var Pu = "oninput" in document;
      if (!Pu) {
        var qd = document.createElement("div");
        qd.setAttribute("oninput", "return;"), Pu = typeof qd.oninput == "function";
      }
      Ku = Pu;
    } else Ku = !1;
    Bd = Ku && (!document.documentMode || 9 < document.documentMode);
  }
  function Gd() {
    Ti && (Ti.detachEvent("onpropertychange", Yd), Mi = Ti = null);
  }
  function Yd(e) {
    if (e.propertyName === "value" && Jr(Mi)) {
      var n = [];
      kd(
        n,
        Mi,
        e,
        Uu(e)
      ), Od(ky, n);
    }
  }
  function Uy(e, n, l) {
    e === "focusin" ? (Gd(), Ti = n, Mi = l, Ti.attachEvent("onpropertychange", Yd)) : e === "focusout" && Gd();
  }
  function By(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Jr(Mi);
  }
  function qy(e, n) {
    if (e === "click") return Jr(n);
  }
  function Gy(e, n) {
    if (e === "input" || e === "change")
      return Jr(n);
  }
  function Yy(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Ut = typeof Object.is == "function" ? Object.is : Yy;
  function Oi(e, n) {
    if (Ut(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var l = Object.keys(e), o = Object.keys(n);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var s = l[o];
      if (!Ie.call(n, s) || !Ut(e[s], n[s]))
        return !1;
    }
    return !0;
  }
  function Id(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Xd(e, n) {
    var l = Id(e);
    e = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = e + l.textContent.length, e <= n && o >= n)
          return { node: l, offset: n - e };
        e = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Id(l);
    }
  }
  function Zd(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Zd(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Qd(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Ir(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof n.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = n.contentWindow;
      else break;
      n = Ir(e.document);
    }
    return n;
  }
  function Wu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  function Iy(e, n) {
    var l = Qd(n);
    n = e.focusedElem;
    var o = e.selectionRange;
    if (l !== n && n && n.ownerDocument && Zd(n.ownerDocument.documentElement, n)) {
      if (o !== null && Wu(n)) {
        if (e = o.start, l = o.end, l === void 0 && (l = e), "selectionStart" in n)
          n.selectionStart = e, n.selectionEnd = Math.min(
            l,
            n.value.length
          );
        else if (l = (e = n.ownerDocument || document) && e.defaultView || window, l.getSelection) {
          l = l.getSelection();
          var s = n.textContent.length, f = Math.min(o.start, s);
          o = o.end === void 0 ? f : Math.min(o.end, s), !l.extend && f > o && (s = o, o = f, f = s), s = Xd(n, f);
          var h = Xd(
            n,
            o
          );
          s && h && (l.rangeCount !== 1 || l.anchorNode !== s.node || l.anchorOffset !== s.offset || l.focusNode !== h.node || l.focusOffset !== h.offset) && (e = e.createRange(), e.setStart(s.node, s.offset), l.removeAllRanges(), f > o ? (l.addRange(e), l.extend(h.node, h.offset)) : (e.setEnd(
            h.node,
            h.offset
          ), l.addRange(e)));
        }
      }
      for (e = [], l = n; l = l.parentNode; )
        l.nodeType === 1 && e.push({
          element: l,
          left: l.scrollLeft,
          top: l.scrollTop
        });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++)
        l = e[n], l.element.scrollLeft = l.left, l.element.scrollTop = l.top;
    }
  }
  var Xy = Fn && "documentMode" in document && 11 >= document.documentMode, Da = null, Ju = null, _i = null, es = !1;
  function Kd(e, n, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    es || Da == null || Da !== Ir(o) || (o = Da, "selectionStart" in o && Wu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), _i && Oi(_i, o) || (_i = o, o = Fo(Ju, "onSelect"), 0 < o.length && (n = new Pr(
      "onSelect",
      "select",
      null,
      n,
      l
    ), e.push({ event: n, listeners: o }), n.target = Da)));
  }
  function Il(e, n) {
    var l = {};
    return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
  }
  var Na = {
    animationend: Il("Animation", "AnimationEnd"),
    animationiteration: Il("Animation", "AnimationIteration"),
    animationstart: Il("Animation", "AnimationStart"),
    transitionrun: Il("Transition", "TransitionRun"),
    transitionstart: Il("Transition", "TransitionStart"),
    transitioncancel: Il("Transition", "TransitionCancel"),
    transitionend: Il("Transition", "TransitionEnd")
  }, ts = {}, Pd = {};
  Fn && (Pd = document.createElement("div").style, "AnimationEvent" in window || (delete Na.animationend.animation, delete Na.animationiteration.animation, delete Na.animationstart.animation), "TransitionEvent" in window || delete Na.transitionend.transition);
  function Xl(e) {
    if (ts[e]) return ts[e];
    if (!Na[e]) return e;
    var n = Na[e], l;
    for (l in n)
      if (n.hasOwnProperty(l) && l in Pd)
        return ts[e] = n[l];
    return e;
  }
  var Wd = Xl("animationend"), Jd = Xl("animationiteration"), em = Xl("animationstart"), Zy = Xl("transitionrun"), Qy = Xl("transitionstart"), Ky = Xl("transitioncancel"), tm = Xl("transitionend"), nm = /* @__PURE__ */ new Map(), lm = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
    " "
  );
  function yn(e, n) {
    nm.set(e, n), Gl(n, [e]);
  }
  var ln = [], ja = 0, ns = 0;
  function eo() {
    for (var e = ja, n = ns = ja = 0; n < e; ) {
      var l = ln[n];
      ln[n++] = null;
      var o = ln[n];
      ln[n++] = null;
      var s = ln[n];
      ln[n++] = null;
      var f = ln[n];
      if (ln[n++] = null, o !== null && s !== null) {
        var h = o.pending;
        h === null ? s.next = s : (s.next = h.next, h.next = s), o.pending = s;
      }
      f !== 0 && am(l, s, f);
    }
  }
  function to(e, n, l, o) {
    ln[ja++] = e, ln[ja++] = n, ln[ja++] = l, ln[ja++] = o, ns |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function ls(e, n, l, o) {
    return to(e, n, l, o), no(e);
  }
  function sl(e, n) {
    return to(e, null, null, n), no(e);
  }
  function am(e, n, l) {
    e.lanes |= l;
    var o = e.alternate;
    o !== null && (o.lanes |= l);
    for (var s = !1, f = e.return; f !== null; )
      f.childLanes |= l, o = f.alternate, o !== null && (o.childLanes |= l), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (s = !0)), e = f, f = f.return;
    s && n !== null && e.tag === 3 && (f = e.stateNode, s = 31 - kt(l), f = f.hiddenUpdates, e = f[s], e === null ? f[s] = [n] : e.push(n), n.lane = l | 536870912);
  }
  function no(e) {
    if (50 < er)
      throw er = 0, sc = null, Error(r(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var za = {}, im = /* @__PURE__ */ new WeakMap();
  function an(e, n) {
    if (typeof e == "object" && e !== null) {
      var l = im.get(e);
      return l !== void 0 ? l : (n = {
        value: e,
        source: n,
        stack: W(n)
      }, im.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: W(n)
    };
  }
  var $a = [], La = 0, lo = null, ao = 0, rn = [], on = 0, Zl = null, kn = 1, Un = "";
  function Ql(e, n) {
    $a[La++] = ao, $a[La++] = lo, lo = e, ao = n;
  }
  function rm(e, n, l) {
    rn[on++] = kn, rn[on++] = Un, rn[on++] = Zl, Zl = e;
    var o = kn;
    e = Un;
    var s = 32 - kt(o) - 1;
    o &= ~(1 << s), l += 1;
    var f = 32 - kt(n) + s;
    if (30 < f) {
      var h = s - s % 5;
      f = (o & (1 << h) - 1).toString(32), o >>= h, s -= h, kn = 1 << 32 - kt(n) + s | l << s | o, Un = f + e;
    } else
      kn = 1 << f | l << s | o, Un = e;
  }
  function as(e) {
    e.return !== null && (Ql(e, 1), rm(e, 1, 0));
  }
  function is(e) {
    for (; e === lo; )
      lo = $a[--La], $a[La] = null, ao = $a[--La], $a[La] = null;
    for (; e === Zl; )
      Zl = rn[--on], rn[on] = null, Un = rn[--on], rn[on] = null, kn = rn[--on], rn[on] = null;
  }
  var At = null, St = null, Le = !1, bn = null, Mn = !1, rs = Error(r(519));
  function Kl(e) {
    var n = Error(r(418, ""));
    throw Ni(an(n, e)), rs;
  }
  function om(e) {
    var n = e.stateNode, l = e.type, o = e.memoizedProps;
    switch (n[Ct] = e, n[Ht] = o, l) {
      case "dialog":
        De("cancel", n), De("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        De("load", n);
        break;
      case "video":
      case "audio":
        for (l = 0; l < nr.length; l++)
          De(nr[l], n);
        break;
      case "source":
        De("error", n);
        break;
      case "img":
      case "image":
      case "link":
        De("error", n), De("load", n);
        break;
      case "details":
        De("toggle", n);
        break;
      case "input":
        De("invalid", n), wd(
          n,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        ), Yr(n);
        break;
      case "select":
        De("invalid", n);
        break;
      case "textarea":
        De("invalid", n), Cd(n, o.value, o.defaultValue, o.children), Yr(n);
    }
    l = o.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || n.textContent === "" + l || o.suppressHydrationWarning === !0 || vp(n.textContent, l) ? (o.popover != null && (De("beforetoggle", n), De("toggle", n)), o.onScroll != null && De("scroll", n), o.onScrollEnd != null && De("scrollend", n), o.onClick != null && (n.onclick = Vo), n = !0) : n = !1, n || Kl(e);
  }
  function um(e) {
    for (At = e.return; At; )
      switch (At.tag) {
        case 3:
        case 27:
          Mn = !0;
          return;
        case 5:
        case 13:
          Mn = !1;
          return;
        default:
          At = At.return;
      }
  }
  function Ai(e) {
    if (e !== At) return !1;
    if (!Le) return um(e), Le = !0, !1;
    var n = !1, l;
    if ((l = e.tag !== 3 && e.tag !== 27) && ((l = e.tag === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Tc(e.type, e.memoizedProps)), l = !l), l && (n = !0), n && St && Kl(e), um(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8)
            if (l = e.data, l === "/$") {
              if (n === 0) {
                St = xn(e.nextSibling);
                break e;
              }
              n--;
            } else
              l !== "$" && l !== "$!" && l !== "$?" || n++;
          e = e.nextSibling;
        }
        St = null;
      }
    } else
      St = At ? xn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Di() {
    St = At = null, Le = !1;
  }
  function Ni(e) {
    bn === null ? bn = [e] : bn.push(e);
  }
  var ji = Error(r(460)), sm = Error(r(474)), io = Error(r(542)), os = { then: function() {
  } };
  function cm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function ro() {
  }
  function fm(e, n, l) {
    switch (l = e[l], l === void 0 ? e.push(n) : l !== n && (n.then(ro, ro), n = l), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, mm(e), e;
      default:
        if (typeof n.status == "string") n.then(ro, ro);
        else {
          if (e = Qe, e !== null && 100 < e.shellSuspendCounter)
            throw Error(r(482));
          e = n, e.status = "pending", e.then(
            function(o) {
              if (n.status === "pending") {
                var s = n;
                s.status = "fulfilled", s.value = o;
              }
            },
            function(o) {
              if (n.status === "pending") {
                var s = n;
                s.status = "rejected", s.reason = o;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, mm(e), e;
        }
        throw zi = n, ji;
    }
  }
  var zi = null;
  function dm() {
    if (zi === null) throw Error(r(459));
    var e = zi;
    return zi = null, e;
  }
  function mm(e) {
    if (e === ji || e === io)
      throw Error(r(483));
  }
  var Py = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(l, o) {
        e.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, Wy = t.unstable_scheduleCallback, Jy = t.unstable_NormalPriority, ct = {
    $$typeof: y,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function us() {
    return {
      controller: new Py(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function $i(e) {
    e.refCount--, e.refCount === 0 && Wy(Jy, function() {
      e.controller.abort();
    });
  }
  var Li = null, ss = 0, Ha = 0, Fa = null;
  function eb(e, n) {
    if (Li === null) {
      var l = Li = [];
      ss = 0, Ha = vc(), Fa = {
        status: "pending",
        value: void 0,
        then: function(o) {
          l.push(o);
        }
      };
    }
    return ss++, n.then(gm, gm), n;
  }
  function gm() {
    if (--ss === 0 && Li !== null) {
      Fa !== null && (Fa.status = "fulfilled");
      var e = Li;
      Li = null, Ha = 0, Fa = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function tb(e, n) {
    var l = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        l.push(s);
      }
    };
    return e.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var s = 0; s < l.length; s++) (0, l[s])(n);
      },
      function(s) {
        for (o.status = "rejected", o.reason = s, s = 0; s < l.length; s++)
          (0, l[s])(void 0);
      }
    ), o;
  }
  var Va = ne(null), oo = ne(0);
  function pm(e, n) {
    e = Pn, oe(oo, e), oe(Va, n), Pn = e | n.baseLanes;
  }
  function cs() {
    oe(oo, Pn), oe(Va, Va.current);
  }
  function fs() {
    Pn = oo.current, le(Va), le(oo);
  }
  var hm = C.S;
  C.S = function(e, n) {
    typeof n == "object" && n !== null && typeof n.then == "function" && eb(e, n), hm !== null && hm(e, n);
  };
  var Pl = ne(null);
  function ds() {
    var e = Pl.current;
    return e !== null ? e : Qe.pooledCache;
  }
  function uo(e, n) {
    n === null ? oe(Pl, Pl.current) : oe(Pl, n.pool);
  }
  function vm() {
    var e = ds();
    return e === null ? null : { parent: ct._currentValue, pool: e };
  }
  var cl = 0, Te = null, Ge = null, at = null, so = !1, ka = !1, Wl = !1, co = 0, Hi = 0, Ua = null, nb = 0;
  function lt() {
    throw Error(r(321));
  }
  function ms(e, n) {
    if (n === null) return !1;
    for (var l = 0; l < n.length && l < e.length; l++)
      if (!Ut(e[l], n[l])) return !1;
    return !0;
  }
  function gs(e, n, l, o, s, f) {
    return cl = f, Te = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, C.H = e === null || e.memoizedState === null ? Jl : fl, Wl = !1, f = l(o, s), Wl = !1, ka && (f = bm(
      n,
      l,
      o,
      s
    )), ym(e), f;
  }
  function ym(e) {
    C.H = On;
    var n = Ge !== null && Ge.next !== null;
    if (cl = 0, at = Ge = Te = null, so = !1, Hi = 0, Ua = null, n) throw Error(r(300));
    e === null || gt || (e = e.dependencies, e !== null && Co(e) && (gt = !0));
  }
  function bm(e, n, l, o) {
    Te = e;
    var s = 0;
    do {
      if (ka && (Ua = null), Hi = 0, ka = !1, 25 <= s) throw Error(r(301));
      if (s += 1, at = Ge = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      C.H = ea, f = n(l, o);
    } while (ka);
    return f;
  }
  function lb() {
    var e = C.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Fi(n) : n, e = e.useState()[0], (Ge !== null ? Ge.memoizedState : null) !== e && (Te.flags |= 1024), n;
  }
  function ps() {
    var e = co !== 0;
    return co = 0, e;
  }
  function hs(e, n, l) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l;
  }
  function vs(e) {
    if (so) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      so = !1;
    }
    cl = 0, at = Ge = Te = null, ka = !1, Hi = co = 0, Ua = null;
  }
  function Vt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return at === null ? Te.memoizedState = at = e : at = at.next = e, at;
  }
  function it() {
    if (Ge === null) {
      var e = Te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ge.next;
    var n = at === null ? Te.memoizedState : at.next;
    if (n !== null)
      at = n, Ge = e;
    else {
      if (e === null)
        throw Te.alternate === null ? Error(r(467)) : Error(r(310));
      Ge = e, e = {
        memoizedState: Ge.memoizedState,
        baseState: Ge.baseState,
        baseQueue: Ge.baseQueue,
        queue: Ge.queue,
        next: null
      }, at === null ? Te.memoizedState = at = e : at = at.next = e;
    }
    return at;
  }
  var fo;
  fo = function() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  };
  function Fi(e) {
    var n = Hi;
    return Hi += 1, Ua === null && (Ua = []), e = fm(Ua, e, n), n = Te, (at === null ? n.memoizedState : at.next) === null && (n = n.alternate, C.H = n === null || n.memoizedState === null ? Jl : fl), e;
  }
  function mo(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Fi(e);
      if (e.$$typeof === y) return Rt(e);
    }
    throw Error(r(438, String(e)));
  }
  function ys(e) {
    var n = null, l = Te.updateQueue;
    if (l !== null && (n = l.memoCache), n == null) {
      var o = Te.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), l === null && (l = fo(), Te.updateQueue = l), l.memoCache = n, l = n.data[n.index], l === void 0)
      for (l = n.data[n.index] = Array(e), o = 0; o < e; o++)
        l[o] = B;
    return n.index++, l;
  }
  function Bn(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function go(e) {
    var n = it();
    return bs(n, Ge, e);
  }
  function bs(e, n, l) {
    var o = e.queue;
    if (o === null) throw Error(r(311));
    o.lastRenderedReducer = l;
    var s = e.baseQueue, f = o.pending;
    if (f !== null) {
      if (s !== null) {
        var h = s.next;
        s.next = f.next, f.next = h;
      }
      n.baseQueue = s = f, o.pending = null;
    }
    if (f = e.baseState, s === null) e.memoizedState = f;
    else {
      n = s.next;
      var x = h = null, T = null, D = n, G = !1;
      do {
        var J = D.lane & -536870913;
        if (J !== D.lane ? (je & J) === J : (cl & J) === J) {
          var F = D.revertLane;
          if (F === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null
            }), J === Ha && (G = !0);
          else if ((cl & F) === F) {
            D = D.next, F === Ha && (G = !0);
            continue;
          } else
            J = {
              lane: 0,
              revertLane: D.revertLane,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null
            }, T === null ? (x = T = J, h = f) : T = T.next = J, Te.lanes |= F, El |= F;
          J = D.action, Wl && l(f, J), f = D.hasEagerState ? D.eagerState : l(f, J);
        } else
          F = {
            lane: J,
            revertLane: D.revertLane,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null
          }, T === null ? (x = T = F, h = f) : T = T.next = F, Te.lanes |= J, El |= J;
        D = D.next;
      } while (D !== null && D !== n);
      if (T === null ? h = f : T.next = x, !Ut(f, e.memoizedState) && (gt = !0, G && (l = Fa, l !== null)))
        throw l;
      e.memoizedState = f, e.baseState = h, e.baseQueue = T, o.lastRenderedState = f;
    }
    return s === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function Ss(e) {
    var n = it(), l = n.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = e;
    var o = l.dispatch, s = l.pending, f = n.memoizedState;
    if (s !== null) {
      l.pending = null;
      var h = s = s.next;
      do
        f = e(f, h.action), h = h.next;
      while (h !== s);
      Ut(f, n.memoizedState) || (gt = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), l.lastRenderedState = f;
    }
    return [f, o];
  }
  function Sm(e, n, l) {
    var o = Te, s = it(), f = Le;
    if (f) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = n();
    var h = !Ut(
      (Ge || s).memoizedState,
      l
    );
    if (h && (s.memoizedState = l, gt = !0), s = s.queue, Es(Em.bind(null, o, s, e), [
      e
    ]), s.getSnapshot !== n || h || at !== null && at.memoizedState.tag & 1) {
      if (o.flags |= 2048, Ba(
        9,
        po(),
        wm.bind(
          null,
          o,
          s,
          l,
          n
        ),
        null
      ), Qe === null) throw Error(r(349));
      f || (cl & 60) !== 0 || xm(o, n, l);
    }
    return l;
  }
  function xm(e, n, l) {
    e.flags |= 16384, e = { getSnapshot: n, value: l }, n = Te.updateQueue, n === null ? (n = fo(), Te.updateQueue = n, n.stores = [e]) : (l = n.stores, l === null ? n.stores = [e] : l.push(e));
  }
  function wm(e, n, l, o) {
    n.value = l, n.getSnapshot = o, Cm(n) && Rm(e);
  }
  function Em(e, n, l) {
    return l(function() {
      Cm(n) && Rm(e);
    });
  }
  function Cm(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var l = n();
      return !Ut(e, l);
    } catch {
      return !0;
    }
  }
  function Rm(e) {
    var n = sl(e, 2);
    n !== null && Dt(n, e, 2);
  }
  function xs(e) {
    var n = Vt();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Wl) {
        rl(!0);
        try {
          l();
        } finally {
          rl(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bn,
      lastRenderedState: e
    }, n;
  }
  function Tm(e, n, l, o) {
    return e.baseState = l, bs(
      e,
      Ge,
      typeof o == "function" ? o : Bn
    );
  }
  function ab(e, n, l, o, s) {
    if (yo(e)) throw Error(r(485));
    if (e = n.action, e !== null) {
      var f = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(h) {
          f.listeners.push(h);
        }
      };
      C.T !== null ? l(!0) : f.isTransition = !1, o(f), l = n.pending, l === null ? (f.next = n.pending = f, Mm(n, f)) : (f.next = l.next, n.pending = l.next = f);
    }
  }
  function Mm(e, n) {
    var l = n.action, o = n.payload, s = e.state;
    if (n.isTransition) {
      var f = C.T, h = {};
      C.T = h;
      try {
        var x = l(s, o), T = C.S;
        T !== null && T(h, x), Om(e, n, x);
      } catch (D) {
        ws(e, n, D);
      } finally {
        C.T = f;
      }
    } else
      try {
        f = l(s, o), Om(e, n, f);
      } catch (D) {
        ws(e, n, D);
      }
  }
  function Om(e, n, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(o) {
        _m(e, n, o);
      },
      function(o) {
        return ws(e, n, o);
      }
    ) : _m(e, n, l);
  }
  function _m(e, n, l) {
    n.status = "fulfilled", n.value = l, Am(n), e.state = l, n = e.pending, n !== null && (l = n.next, l === n ? e.pending = null : (l = l.next, n.next = l, Mm(e, l)));
  }
  function ws(e, n, l) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = l, Am(n), n = n.next;
      while (n !== o);
    }
    e.action = null;
  }
  function Am(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Dm(e, n) {
    return n;
  }
  function Nm(e, n) {
    if (Le) {
      var l = Qe.formState;
      if (l !== null) {
        e: {
          var o = Te;
          if (Le) {
            if (St) {
              t: {
                for (var s = St, f = Mn; s.nodeType !== 8; ) {
                  if (!f) {
                    s = null;
                    break t;
                  }
                  if (s = xn(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                f = s.data, s = f === "F!" || f === "F" ? s : null;
              }
              if (s) {
                St = xn(
                  s.nextSibling
                ), o = s.data === "F!";
                break e;
              }
            }
            Kl(o);
          }
          o = !1;
        }
        o && (n = l[0]);
      }
    }
    return l = Vt(), l.memoizedState = l.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Dm,
      lastRenderedState: n
    }, l.queue = o, l = Km.bind(
      null,
      Te,
      o
    ), o.dispatch = l, o = xs(!1), f = Os.bind(
      null,
      Te,
      !1,
      o.queue
    ), o = Vt(), s = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = s, l = ab.bind(
      null,
      Te,
      s,
      f,
      l
    ), s.dispatch = l, o.memoizedState = e, [n, l, !1];
  }
  function jm(e) {
    var n = it();
    return zm(n, Ge, e);
  }
  function zm(e, n, l) {
    if (n = bs(
      e,
      n,
      Dm
    )[0], e = go(Bn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Fi(n);
      } catch (h) {
        throw h === ji ? io : h;
      }
    else o = n;
    n = it();
    var s = n.queue, f = s.dispatch;
    return l !== n.memoizedState && (Te.flags |= 2048, Ba(
      9,
      po(),
      ib.bind(null, s, l),
      null
    )), [o, f, e];
  }
  function ib(e, n) {
    e.action = n;
  }
  function $m(e) {
    var n = it(), l = Ge;
    if (l !== null)
      return zm(n, l, e);
    it(), n = n.memoizedState, l = it();
    var o = l.queue.dispatch;
    return l.memoizedState = e, [n, o, !1];
  }
  function Ba(e, n, l, o) {
    return e = { tag: e, create: l, deps: o, inst: n, next: null }, n = Te.updateQueue, n === null && (n = fo(), Te.updateQueue = n), l = n.lastEffect, l === null ? n.lastEffect = e.next = e : (o = l.next, l.next = e, e.next = o, n.lastEffect = e), e;
  }
  function po() {
    return { destroy: void 0, resource: void 0 };
  }
  function Lm() {
    return it().memoizedState;
  }
  function ho(e, n, l, o) {
    var s = Vt();
    o = o === void 0 ? null : o, Te.flags |= e, s.memoizedState = Ba(
      1 | n,
      po(),
      l,
      o
    );
  }
  function vo(e, n, l, o) {
    var s = it();
    o = o === void 0 ? null : o;
    var f = s.memoizedState.inst;
    Ge !== null && o !== null && ms(o, Ge.memoizedState.deps) ? s.memoizedState = Ba(n, f, l, o) : (Te.flags |= e, s.memoizedState = Ba(
      1 | n,
      f,
      l,
      o
    ));
  }
  function Hm(e, n) {
    ho(8390656, 8, e, n);
  }
  function Es(e, n) {
    vo(2048, 8, e, n);
  }
  function Fm(e, n) {
    return vo(4, 2, e, n);
  }
  function Vm(e, n) {
    return vo(4, 4, e, n);
  }
  function km(e, n) {
    if (typeof n == "function") {
      e = e();
      var l = n(e);
      return function() {
        typeof l == "function" ? l() : n(null);
      };
    }
    if (n != null)
      return e = e(), n.current = e, function() {
        n.current = null;
      };
  }
  function Um(e, n, l) {
    l = l != null ? l.concat([e]) : null, vo(4, 4, km.bind(null, n, e), l);
  }
  function Cs() {
  }
  function Bm(e, n) {
    var l = it();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    return n !== null && ms(n, o[1]) ? o[0] : (l.memoizedState = [e, n], e);
  }
  function qm(e, n) {
    var l = it();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    if (n !== null && ms(n, o[1]))
      return o[0];
    if (o = e(), Wl) {
      rl(!0);
      try {
        e();
      } finally {
        rl(!1);
      }
    }
    return l.memoizedState = [o, n], o;
  }
  function Rs(e, n, l) {
    return l === void 0 || (cl & 1073741824) !== 0 ? e.memoizedState = n : (e.memoizedState = l, e = Qg(), Te.lanes |= e, El |= e, l);
  }
  function Gm(e, n, l, o) {
    return Ut(l, n) ? l : Va.current !== null ? (e = Rs(e, l, o), Ut(e, n) || (gt = !0), e) : (cl & 42) === 0 ? (gt = !0, e.memoizedState = l) : (e = Qg(), Te.lanes |= e, El |= e, n);
  }
  function Ym(e, n, l, o, s) {
    var f = I.p;
    I.p = f !== 0 && 8 > f ? f : 8;
    var h = C.T, x = {};
    C.T = x, Os(e, !1, n, l);
    try {
      var T = s(), D = C.S;
      if (D !== null && D(x, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var G = tb(
          T,
          o
        );
        Vi(
          e,
          n,
          G,
          Yt(e)
        );
      } else
        Vi(
          e,
          n,
          o,
          Yt(e)
        );
    } catch (J) {
      Vi(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: J },
        Yt()
      );
    } finally {
      I.p = f, C.T = h;
    }
  }
  function rb() {
  }
  function Ts(e, n, l, o) {
    if (e.tag !== 5) throw Error(r(476));
    var s = Im(e).queue;
    Ym(
      e,
      s,
      n,
      de,
      l === null ? rb : function() {
        return Xm(e), l(o);
      }
    );
  }
  function Im(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: de,
      baseState: de,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: de
      },
      next: null
    };
    var l = {};
    return n.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Xm(e) {
    var n = Im(e).next.queue;
    Vi(e, n, {}, Yt());
  }
  function Ms() {
    return Rt(or);
  }
  function Zm() {
    return it().memoizedState;
  }
  function Qm() {
    return it().memoizedState;
  }
  function ob(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var l = Yt();
          e = hl(l);
          var o = vl(n, e, l);
          o !== null && (Dt(o, n, l), Gi(o, n, l)), n = { cache: us() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function ub(e, n, l) {
    var o = Yt();
    l = {
      lane: o,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, yo(e) ? Pm(n, l) : (l = ls(e, n, l, o), l !== null && (Dt(l, e, o), Wm(l, n, o)));
  }
  function Km(e, n, l) {
    var o = Yt();
    Vi(e, n, l, o);
  }
  function Vi(e, n, l, o) {
    var s = {
      lane: o,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (yo(e)) Pm(n, s);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var h = n.lastRenderedState, x = f(h, l);
          if (s.hasEagerState = !0, s.eagerState = x, Ut(x, h))
            return to(e, n, s, 0), Qe === null && eo(), !1;
        } catch {
        } finally {
        }
      if (l = ls(e, n, s, o), l !== null)
        return Dt(l, e, o), Wm(l, n, o), !0;
    }
    return !1;
  }
  function Os(e, n, l, o) {
    if (o = {
      lane: 2,
      revertLane: vc(),
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, yo(e)) {
      if (n) throw Error(r(479));
    } else
      n = ls(
        e,
        l,
        o,
        2
      ), n !== null && Dt(n, e, 2);
  }
  function yo(e) {
    var n = e.alternate;
    return e === Te || n !== null && n === Te;
  }
  function Pm(e, n) {
    ka = so = !0;
    var l = e.pending;
    l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
  }
  function Wm(e, n, l) {
    if ((l & 4194176) !== 0) {
      var o = n.lanes;
      o &= e.pendingLanes, l |= o, n.lanes = l, dd(e, l);
    }
  }
  var On = {
    readContext: Rt,
    use: mo,
    useCallback: lt,
    useContext: lt,
    useEffect: lt,
    useImperativeHandle: lt,
    useLayoutEffect: lt,
    useInsertionEffect: lt,
    useMemo: lt,
    useReducer: lt,
    useRef: lt,
    useState: lt,
    useDebugValue: lt,
    useDeferredValue: lt,
    useTransition: lt,
    useSyncExternalStore: lt,
    useId: lt
  };
  On.useCacheRefresh = lt, On.useMemoCache = lt, On.useHostTransitionStatus = lt, On.useFormState = lt, On.useActionState = lt, On.useOptimistic = lt;
  var Jl = {
    readContext: Rt,
    use: mo,
    useCallback: function(e, n) {
      return Vt().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: Rt,
    useEffect: Hm,
    useImperativeHandle: function(e, n, l) {
      l = l != null ? l.concat([e]) : null, ho(
        4194308,
        4,
        km.bind(null, n, e),
        l
      );
    },
    useLayoutEffect: function(e, n) {
      return ho(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      ho(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var l = Vt();
      n = n === void 0 ? null : n;
      var o = e();
      if (Wl) {
        rl(!0);
        try {
          e();
        } finally {
          rl(!1);
        }
      }
      return l.memoizedState = [o, n], o;
    },
    useReducer: function(e, n, l) {
      var o = Vt();
      if (l !== void 0) {
        var s = l(n);
        if (Wl) {
          rl(!0);
          try {
            l(n);
          } finally {
            rl(!1);
          }
        }
      } else s = n;
      return o.memoizedState = o.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, o.queue = e, e = e.dispatch = ub.bind(
        null,
        Te,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var n = Vt();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = xs(e);
      var n = e.queue, l = Km.bind(null, Te, n);
      return n.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Cs,
    useDeferredValue: function(e, n) {
      var l = Vt();
      return Rs(l, e, n);
    },
    useTransition: function() {
      var e = xs(!1);
      return e = Ym.bind(
        null,
        Te,
        e.queue,
        !0,
        !1
      ), Vt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, l) {
      var o = Te, s = Vt();
      if (Le) {
        if (l === void 0)
          throw Error(r(407));
        l = l();
      } else {
        if (l = n(), Qe === null) throw Error(r(349));
        (je & 60) !== 0 || xm(o, n, l);
      }
      s.memoizedState = l;
      var f = { value: l, getSnapshot: n };
      return s.queue = f, Hm(Em.bind(null, o, f, e), [
        e
      ]), o.flags |= 2048, Ba(
        9,
        po(),
        wm.bind(
          null,
          o,
          f,
          l,
          n
        ),
        null
      ), l;
    },
    useId: function() {
      var e = Vt(), n = Qe.identifierPrefix;
      if (Le) {
        var l = Un, o = kn;
        l = (o & ~(1 << 32 - kt(o) - 1)).toString(32) + l, n = ":" + n + "R" + l, l = co++, 0 < l && (n += "H" + l.toString(32)), n += ":";
      } else
        l = nb++, n = ":" + n + "r" + l.toString(32) + ":";
      return e.memoizedState = n;
    },
    useCacheRefresh: function() {
      return Vt().memoizedState = ob.bind(
        null,
        Te
      );
    }
  };
  Jl.useMemoCache = ys, Jl.useHostTransitionStatus = Ms, Jl.useFormState = Nm, Jl.useActionState = Nm, Jl.useOptimistic = function(e) {
    var n = Vt();
    n.memoizedState = n.baseState = e;
    var l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return n.queue = l, n = Os.bind(
      null,
      Te,
      !0,
      l
    ), l.dispatch = n, [e, n];
  };
  var fl = {
    readContext: Rt,
    use: mo,
    useCallback: Bm,
    useContext: Rt,
    useEffect: Es,
    useImperativeHandle: Um,
    useInsertionEffect: Fm,
    useLayoutEffect: Vm,
    useMemo: qm,
    useReducer: go,
    useRef: Lm,
    useState: function() {
      return go(Bn);
    },
    useDebugValue: Cs,
    useDeferredValue: function(e, n) {
      var l = it();
      return Gm(
        l,
        Ge.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = go(Bn)[0], n = it().memoizedState;
      return [
        typeof e == "boolean" ? e : Fi(e),
        n
      ];
    },
    useSyncExternalStore: Sm,
    useId: Zm
  };
  fl.useCacheRefresh = Qm, fl.useMemoCache = ys, fl.useHostTransitionStatus = Ms, fl.useFormState = jm, fl.useActionState = jm, fl.useOptimistic = function(e, n) {
    var l = it();
    return Tm(l, Ge, e, n);
  };
  var ea = {
    readContext: Rt,
    use: mo,
    useCallback: Bm,
    useContext: Rt,
    useEffect: Es,
    useImperativeHandle: Um,
    useInsertionEffect: Fm,
    useLayoutEffect: Vm,
    useMemo: qm,
    useReducer: Ss,
    useRef: Lm,
    useState: function() {
      return Ss(Bn);
    },
    useDebugValue: Cs,
    useDeferredValue: function(e, n) {
      var l = it();
      return Ge === null ? Rs(l, e, n) : Gm(
        l,
        Ge.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Ss(Bn)[0], n = it().memoizedState;
      return [
        typeof e == "boolean" ? e : Fi(e),
        n
      ];
    },
    useSyncExternalStore: Sm,
    useId: Zm
  };
  ea.useCacheRefresh = Qm, ea.useMemoCache = ys, ea.useHostTransitionStatus = Ms, ea.useFormState = $m, ea.useActionState = $m, ea.useOptimistic = function(e, n) {
    var l = it();
    return Ge !== null ? Tm(l, Ge, e, n) : (l.baseState = e, [e, l.queue.dispatch]);
  };
  var qa = null, ki = 0;
  function bo(e) {
    var n = ki;
    return ki += 1, qa === null && (qa = []), fm(qa, e, n);
  }
  function Ui(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function So(e, n) {
    throw n.$$typeof === c ? Error(r(525)) : (e = Object.prototype.toString.call(n), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Jm(e) {
    var n = e._init;
    return n(e._payload);
  }
  function eg(e) {
    function n(z, A) {
      if (e) {
        var L = z.deletions;
        L === null ? (z.deletions = [A], z.flags |= 16) : L.push(A);
      }
    }
    function l(z, A) {
      if (!e) return null;
      for (; A !== null; )
        n(z, A), A = A.sibling;
      return null;
    }
    function o(z) {
      for (var A = /* @__PURE__ */ new Map(); z !== null; )
        z.key !== null ? A.set(z.key, z) : A.set(z.index, z), z = z.sibling;
      return A;
    }
    function s(z, A) {
      return z = xl(z, A), z.index = 0, z.sibling = null, z;
    }
    function f(z, A, L) {
      return z.index = L, e ? (L = z.alternate, L !== null ? (L = L.index, L < A ? (z.flags |= 33554434, A) : L) : (z.flags |= 33554434, A)) : (z.flags |= 1048576, A);
    }
    function h(z) {
      return e && z.alternate === null && (z.flags |= 33554434), z;
    }
    function x(z, A, L, P) {
      return A === null || A.tag !== 6 ? (A = tc(L, z.mode, P), A.return = z, A) : (A = s(A, L), A.return = z, A);
    }
    function T(z, A, L, P) {
      var ce = L.type;
      return ce === g ? G(
        z,
        A,
        L.props.children,
        P,
        L.key
      ) : A !== null && (A.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === j && Jm(ce) === A.type) ? (A = s(A, L.props), Ui(A, L), A.return = z, A) : (A = Oo(
        L.type,
        L.key,
        L.props,
        null,
        z.mode,
        P
      ), Ui(A, L), A.return = z, A);
    }
    function D(z, A, L, P) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== L.containerInfo || A.stateNode.implementation !== L.implementation ? (A = nc(L, z.mode, P), A.return = z, A) : (A = s(A, L.children || []), A.return = z, A);
    }
    function G(z, A, L, P, ce) {
      return A === null || A.tag !== 7 ? (A = ra(
        L,
        z.mode,
        P,
        ce
      ), A.return = z, A) : (A = s(A, L), A.return = z, A);
    }
    function J(z, A, L) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = tc(
          "" + A,
          z.mode,
          L
        ), A.return = z, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case d:
            return L = Oo(
              A.type,
              A.key,
              A.props,
              null,
              z.mode,
              L
            ), Ui(L, A), L.return = z, L;
          case m:
            return A = nc(
              A,
              z.mode,
              L
            ), A.return = z, A;
          case j:
            var P = A._init;
            return A = P(A._payload), J(z, A, L);
        }
        if (V(A) || Q(A))
          return A = ra(
            A,
            z.mode,
            L,
            null
          ), A.return = z, A;
        if (typeof A.then == "function")
          return J(z, bo(A), L);
        if (A.$$typeof === y)
          return J(
            z,
            Ro(z, A),
            L
          );
        So(z, A);
      }
      return null;
    }
    function F(z, A, L, P) {
      var ce = A !== null ? A.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return ce !== null ? null : x(z, A, "" + L, P);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case d:
            return L.key === ce ? T(z, A, L, P) : null;
          case m:
            return L.key === ce ? D(z, A, L, P) : null;
          case j:
            return ce = L._init, L = ce(L._payload), F(z, A, L, P);
        }
        if (V(L) || Q(L))
          return ce !== null ? null : G(z, A, L, P, null);
        if (typeof L.then == "function")
          return F(
            z,
            A,
            bo(L),
            P
          );
        if (L.$$typeof === y)
          return F(
            z,
            A,
            Ro(z, L),
            P
          );
        So(z, L);
      }
      return null;
    }
    function q(z, A, L, P, ce) {
      if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint")
        return z = z.get(L) || null, x(A, z, "" + P, ce);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case d:
            return z = z.get(
              P.key === null ? L : P.key
            ) || null, T(A, z, P, ce);
          case m:
            return z = z.get(
              P.key === null ? L : P.key
            ) || null, D(A, z, P, ce);
          case j:
            var Oe = P._init;
            return P = Oe(P._payload), q(
              z,
              A,
              L,
              P,
              ce
            );
        }
        if (V(P) || Q(P))
          return z = z.get(L) || null, G(A, z, P, ce, null);
        if (typeof P.then == "function")
          return q(
            z,
            A,
            L,
            bo(P),
            ce
          );
        if (P.$$typeof === y)
          return q(
            z,
            A,
            L,
            Ro(A, P),
            ce
          );
        So(A, P);
      }
      return null;
    }
    function fe(z, A, L, P) {
      for (var ce = null, Oe = null, ge = A, ye = A = 0, ht = null; ge !== null && ye < L.length; ye++) {
        ge.index > ye ? (ht = ge, ge = null) : ht = ge.sibling;
        var He = F(
          z,
          ge,
          L[ye],
          P
        );
        if (He === null) {
          ge === null && (ge = ht);
          break;
        }
        e && ge && He.alternate === null && n(z, ge), A = f(He, A, ye), Oe === null ? ce = He : Oe.sibling = He, Oe = He, ge = ht;
      }
      if (ye === L.length)
        return l(z, ge), Le && Ql(z, ye), ce;
      if (ge === null) {
        for (; ye < L.length; ye++)
          ge = J(z, L[ye], P), ge !== null && (A = f(
            ge,
            A,
            ye
          ), Oe === null ? ce = ge : Oe.sibling = ge, Oe = ge);
        return Le && Ql(z, ye), ce;
      }
      for (ge = o(ge); ye < L.length; ye++)
        ht = q(
          ge,
          z,
          ye,
          L[ye],
          P
        ), ht !== null && (e && ht.alternate !== null && ge.delete(
          ht.key === null ? ye : ht.key
        ), A = f(
          ht,
          A,
          ye
        ), Oe === null ? ce = ht : Oe.sibling = ht, Oe = ht);
      return e && ge.forEach(function(Al) {
        return n(z, Al);
      }), Le && Ql(z, ye), ce;
    }
    function Ce(z, A, L, P) {
      if (L == null) throw Error(r(151));
      for (var ce = null, Oe = null, ge = A, ye = A = 0, ht = null, He = L.next(); ge !== null && !He.done; ye++, He = L.next()) {
        ge.index > ye ? (ht = ge, ge = null) : ht = ge.sibling;
        var Al = F(z, ge, He.value, P);
        if (Al === null) {
          ge === null && (ge = ht);
          break;
        }
        e && ge && Al.alternate === null && n(z, ge), A = f(Al, A, ye), Oe === null ? ce = Al : Oe.sibling = Al, Oe = Al, ge = ht;
      }
      if (He.done)
        return l(z, ge), Le && Ql(z, ye), ce;
      if (ge === null) {
        for (; !He.done; ye++, He = L.next())
          He = J(z, He.value, P), He !== null && (A = f(He, A, ye), Oe === null ? ce = He : Oe.sibling = He, Oe = He);
        return Le && Ql(z, ye), ce;
      }
      for (ge = o(ge); !He.done; ye++, He = L.next())
        He = q(ge, z, ye, He.value, P), He !== null && (e && He.alternate !== null && ge.delete(He.key === null ? ye : He.key), A = f(He, A, ye), Oe === null ? ce = He : Oe.sibling = He, Oe = He);
      return e && ge.forEach(function(f1) {
        return n(z, f1);
      }), Le && Ql(z, ye), ce;
    }
    function tt(z, A, L, P) {
      if (typeof L == "object" && L !== null && L.type === g && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case d:
            e: {
              for (var ce = L.key; A !== null; ) {
                if (A.key === ce) {
                  if (ce = L.type, ce === g) {
                    if (A.tag === 7) {
                      l(
                        z,
                        A.sibling
                      ), P = s(
                        A,
                        L.props.children
                      ), P.return = z, z = P;
                      break e;
                    }
                  } else if (A.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === j && Jm(ce) === A.type) {
                    l(
                      z,
                      A.sibling
                    ), P = s(A, L.props), Ui(P, L), P.return = z, z = P;
                    break e;
                  }
                  l(z, A);
                  break;
                } else n(z, A);
                A = A.sibling;
              }
              L.type === g ? (P = ra(
                L.props.children,
                z.mode,
                P,
                L.key
              ), P.return = z, z = P) : (P = Oo(
                L.type,
                L.key,
                L.props,
                null,
                z.mode,
                P
              ), Ui(P, L), P.return = z, z = P);
            }
            return h(z);
          case m:
            e: {
              for (ce = L.key; A !== null; ) {
                if (A.key === ce)
                  if (A.tag === 4 && A.stateNode.containerInfo === L.containerInfo && A.stateNode.implementation === L.implementation) {
                    l(
                      z,
                      A.sibling
                    ), P = s(A, L.children || []), P.return = z, z = P;
                    break e;
                  } else {
                    l(z, A);
                    break;
                  }
                else n(z, A);
                A = A.sibling;
              }
              P = nc(L, z.mode, P), P.return = z, z = P;
            }
            return h(z);
          case j:
            return ce = L._init, L = ce(L._payload), tt(
              z,
              A,
              L,
              P
            );
        }
        if (V(L))
          return fe(
            z,
            A,
            L,
            P
          );
        if (Q(L)) {
          if (ce = Q(L), typeof ce != "function") throw Error(r(150));
          return L = ce.call(L), Ce(
            z,
            A,
            L,
            P
          );
        }
        if (typeof L.then == "function")
          return tt(
            z,
            A,
            bo(L),
            P
          );
        if (L.$$typeof === y)
          return tt(
            z,
            A,
            Ro(z, L),
            P
          );
        So(z, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint" ? (L = "" + L, A !== null && A.tag === 6 ? (l(z, A.sibling), P = s(A, L), P.return = z, z = P) : (l(z, A), P = tc(L, z.mode, P), P.return = z, z = P), h(z)) : l(z, A);
    }
    return function(z, A, L, P) {
      try {
        ki = 0;
        var ce = tt(
          z,
          A,
          L,
          P
        );
        return qa = null, ce;
      } catch (ge) {
        if (ge === ji || ge === io) throw ge;
        var Oe = fn(29, ge, null, z.mode);
        return Oe.lanes = P, Oe.return = z, Oe;
      } finally {
      }
    };
  }
  var ta = eg(!0), tg = eg(!1), un = ne(null), _n = null;
  function dl(e) {
    var n = e.alternate;
    oe(ft, ft.current & 1), oe(un, e), _n === null && (n === null || Va.current !== null || n.memoizedState !== null) && (_n = e);
  }
  function ng(e) {
    if (e.tag === 22) {
      if (oe(ft, ft.current), oe(un, e), _n === null) {
        var n = e.alternate;
        n !== null && n.memoizedState !== null && (_n = e);
      }
    } else ml();
  }
  function ml() {
    oe(ft, ft.current), oe(un, un.current);
  }
  function qn(e) {
    le(un), _n === e && (_n = null), le(ft);
  }
  var ft = ne(0);
  function xo(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var l = n.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || Ac(l)))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  function _s(e, n, l, o) {
    n = e.memoizedState, l = l(o, n), l = l == null ? n : _({}, n, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var As = {
    isMounted: function(e) {
      return (e = e._reactInternals) ? Z(e) === e : !1;
    },
    enqueueSetState: function(e, n, l) {
      e = e._reactInternals;
      var o = Yt(), s = hl(o);
      s.payload = n, l != null && (s.callback = l), n = vl(e, s, o), n !== null && (Dt(n, e, o), Gi(n, e, o));
    },
    enqueueReplaceState: function(e, n, l) {
      e = e._reactInternals;
      var o = Yt(), s = hl(o);
      s.tag = 1, s.payload = n, l != null && (s.callback = l), n = vl(e, s, o), n !== null && (Dt(n, e, o), Gi(n, e, o));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var l = Yt(), o = hl(l);
      o.tag = 2, n != null && (o.callback = n), n = vl(e, o, l), n !== null && (Dt(n, e, l), Gi(n, e, l));
    }
  };
  function lg(e, n, l, o, s, f, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, f, h) : n.prototype && n.prototype.isPureReactComponent ? !Oi(l, o) || !Oi(s, f) : !0;
  }
  function ag(e, n, l, o) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, o), n.state !== e && As.enqueueReplaceState(n, n.state, null);
  }
  function na(e, n) {
    var l = n;
    if ("ref" in n) {
      l = {};
      for (var o in n)
        o !== "ref" && (l[o] = n[o]);
    }
    if (e = e.defaultProps) {
      l === n && (l = _({}, l));
      for (var s in e)
        l[s] === void 0 && (l[s] = e[s]);
    }
    return l;
  }
  var wo = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  };
  function ig(e) {
    wo(e);
  }
  function rg(e) {
    console.error(e);
  }
  function og(e) {
    wo(e);
  }
  function Eo(e, n) {
    try {
      var l = e.onUncaughtError;
      l(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function ug(e, n, l) {
    try {
      var o = e.onCaughtError;
      o(l.value, {
        componentStack: l.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Ds(e, n, l) {
    return l = hl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Eo(e, n);
    }, l;
  }
  function sg(e) {
    return e = hl(e), e.tag = 3, e;
  }
  function cg(e, n, l, o) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var f = o.value;
      e.payload = function() {
        return s(f);
      }, e.callback = function() {
        ug(n, l, o);
      };
    }
    var h = l.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
      ug(n, l, o), typeof s != "function" && (Cl === null ? Cl = /* @__PURE__ */ new Set([this]) : Cl.add(this));
      var x = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function sb(e, n, l, o, s) {
    if (l.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = l.alternate, n !== null && qi(
        n,
        l,
        s,
        !0
      ), l = un.current, l !== null) {
        switch (l.tag) {
          case 13:
            return _n === null ? dc() : l.alternate === null && et === 0 && (et = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, o === os ? l.flags |= 16384 : (n = l.updateQueue, n === null ? l.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), gc(e, o, s)), !1;
          case 22:
            return l.flags |= 65536, o === os ? l.flags |= 16384 : (n = l.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, l.updateQueue = n) : (l = n.retryQueue, l === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : l.add(o)), gc(e, o, s)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return gc(e, o, s), dc(), !1;
    }
    if (Le)
      return n = un.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = s, o !== rs && (e = Error(r(422), { cause: o }), Ni(an(e, l)))) : (o !== rs && (n = Error(r(423), {
        cause: o
      }), Ni(
        an(n, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, o = an(o, l), s = Ds(
        e.stateNode,
        o,
        s
      ), Is(e, s), et !== 4 && (et = 2)), !1;
    var f = Error(r(520), { cause: o });
    if (f = an(f, l), Wi === null ? Wi = [f] : Wi.push(f), et !== 4 && (et = 2), n === null) return !0;
    o = an(o, l), l = n;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = Ds(l.stateNode, o, e), Is(l, e), !1;
        case 1:
          if (n = l.type, f = l.stateNode, (l.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Cl === null || !Cl.has(f))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = sg(s), cg(
              s,
              e,
              l,
              o
            ), Is(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var fg = Error(r(461)), gt = !1;
  function xt(e, n, l, o) {
    n.child = e === null ? tg(n, null, l, o) : ta(
      n,
      e.child,
      l,
      o
    );
  }
  function dg(e, n, l, o, s) {
    l = l.render;
    var f = n.ref;
    if ("ref" in o) {
      var h = {};
      for (var x in o)
        x !== "ref" && (h[x] = o[x]);
    } else h = o;
    return aa(n), o = gs(
      e,
      n,
      l,
      h,
      f,
      s
    ), x = ps(), e !== null && !gt ? (hs(e, n, s), Gn(e, n, s)) : (Le && x && as(n), n.flags |= 1, xt(e, n, o, s), n.child);
  }
  function mg(e, n, l, o, s) {
    if (e === null) {
      var f = l.type;
      return typeof f == "function" && !ec(f) && f.defaultProps === void 0 && l.compare === null ? (n.tag = 15, n.type = f, gg(
        e,
        n,
        f,
        o,
        s
      )) : (e = Oo(
        l.type,
        null,
        o,
        n,
        n.mode,
        s
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !ks(e, s)) {
      var h = f.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Oi, l(h, o) && e.ref === n.ref)
        return Gn(e, n, s);
    }
    return n.flags |= 1, e = xl(f, o), e.ref = n.ref, e.return = n, n.child = e;
  }
  function gg(e, n, l, o, s) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Oi(f, o) && e.ref === n.ref)
        if (gt = !1, n.pendingProps = o = f, ks(e, s))
          (e.flags & 131072) !== 0 && (gt = !0);
        else
          return n.lanes = e.lanes, Gn(e, n, s);
    }
    return Ns(
      e,
      n,
      l,
      o,
      s
    );
  }
  function pg(e, n, l) {
    var o = n.pendingProps, s = o.children, f = (n.stateNode._pendingVisibility & 2) !== 0, h = e !== null ? e.memoizedState : null;
    if (Bi(e, n), o.mode === "hidden" || f) {
      if ((n.flags & 128) !== 0) {
        if (o = h !== null ? h.baseLanes | l : l, e !== null) {
          for (s = n.child = e.child, f = 0; s !== null; )
            f = f | s.lanes | s.childLanes, s = s.sibling;
          n.childLanes = f & ~o;
        } else n.childLanes = 0, n.child = null;
        return hg(
          e,
          n,
          o,
          l
        );
      }
      if ((l & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && uo(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? pm(n, h) : cs(), ng(n);
      else
        return n.lanes = n.childLanes = 536870912, hg(
          e,
          n,
          h !== null ? h.baseLanes | l : l,
          l
        );
    } else
      h !== null ? (uo(n, h.cachePool), pm(n, h), ml(), n.memoizedState = null) : (e !== null && uo(n, null), cs(), ml());
    return xt(e, n, s, l), n.child;
  }
  function hg(e, n, l, o) {
    var s = ds();
    return s = s === null ? null : { parent: ct._currentValue, pool: s }, n.memoizedState = {
      baseLanes: l,
      cachePool: s
    }, e !== null && uo(n, null), cs(), ng(n), e !== null && qi(e, n, o, !0), null;
  }
  function Bi(e, n) {
    var l = n.ref;
    if (l === null)
      e !== null && e.ref !== null && (n.flags |= 2097664);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (e === null || e.ref !== l) && (n.flags |= 2097664);
    }
  }
  function Ns(e, n, l, o, s) {
    return aa(n), l = gs(
      e,
      n,
      l,
      o,
      void 0,
      s
    ), o = ps(), e !== null && !gt ? (hs(e, n, s), Gn(e, n, s)) : (Le && o && as(n), n.flags |= 1, xt(e, n, l, s), n.child);
  }
  function vg(e, n, l, o, s, f) {
    return aa(n), n.updateQueue = null, l = bm(
      n,
      o,
      l,
      s
    ), ym(e), o = ps(), e !== null && !gt ? (hs(e, n, f), Gn(e, n, f)) : (Le && o && as(n), n.flags |= 1, xt(e, n, l, f), n.child);
  }
  function yg(e, n, l, o, s) {
    if (aa(n), n.stateNode === null) {
      var f = za, h = l.contextType;
      typeof h == "object" && h !== null && (f = Rt(h)), f = new l(o, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = As, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = o, f.state = n.memoizedState, f.refs = {}, Gs(n), h = l.contextType, f.context = typeof h == "object" && h !== null ? Rt(h) : za, f.state = n.memoizedState, h = l.getDerivedStateFromProps, typeof h == "function" && (_s(
        n,
        l,
        h,
        o
      ), f.state = n.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (h = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), h !== f.state && As.enqueueReplaceState(f, f.state, null), Ii(n, o, f, s), Yi(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (e === null) {
      f = n.stateNode;
      var x = n.memoizedProps, T = na(l, x);
      f.props = T;
      var D = f.context, G = l.contextType;
      h = za, typeof G == "object" && G !== null && (h = Rt(G));
      var J = l.getDerivedStateFromProps;
      G = typeof J == "function" || typeof f.getSnapshotBeforeUpdate == "function", x = n.pendingProps !== x, G || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x || D !== h) && ag(
        n,
        f,
        o,
        h
      ), pl = !1;
      var F = n.memoizedState;
      f.state = F, Ii(n, o, f, s), Yi(), D = n.memoizedState, x || F !== D || pl ? (typeof J == "function" && (_s(
        n,
        l,
        J,
        o
      ), D = n.memoizedState), (T = pl || lg(
        n,
        l,
        T,
        o,
        F,
        D,
        h
      )) ? (G || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = D), f.props = o, f.state = D, f.context = h, o = T) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      f = n.stateNode, Ys(e, n), h = n.memoizedProps, G = na(l, h), f.props = G, J = n.pendingProps, F = f.context, D = l.contextType, T = za, typeof D == "object" && D !== null && (T = Rt(D)), x = l.getDerivedStateFromProps, (D = typeof x == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (h !== J || F !== T) && ag(
        n,
        f,
        o,
        T
      ), pl = !1, F = n.memoizedState, f.state = F, Ii(n, o, f, s), Yi();
      var q = n.memoizedState;
      h !== J || F !== q || pl || e !== null && e.dependencies !== null && Co(e.dependencies) ? (typeof x == "function" && (_s(
        n,
        l,
        x,
        o
      ), q = n.memoizedState), (G = pl || lg(
        n,
        l,
        G,
        o,
        F,
        q,
        T
      ) || e !== null && e.dependencies !== null && Co(e.dependencies)) ? (D || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, q, T), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        o,
        q,
        T
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || h === e.memoizedProps && F === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && F === e.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = q), f.props = o, f.state = q, f.context = T, o = G) : (typeof f.componentDidUpdate != "function" || h === e.memoizedProps && F === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && F === e.memoizedState || (n.flags |= 1024), o = !1);
    }
    return f = o, Bi(e, n), o = (n.flags & 128) !== 0, f || o ? (f = n.stateNode, l = o && typeof l.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && o ? (n.child = ta(
      n,
      e.child,
      null,
      s
    ), n.child = ta(
      n,
      null,
      l,
      s
    )) : xt(e, n, l, s), n.memoizedState = f.state, e = n.child) : e = Gn(
      e,
      n,
      s
    ), e;
  }
  function bg(e, n, l, o) {
    return Di(), n.flags |= 256, xt(e, n, l, o), n.child;
  }
  var js = { dehydrated: null, treeContext: null, retryLane: 0 };
  function zs(e) {
    return { baseLanes: e, cachePool: vm() };
  }
  function $s(e, n, l) {
    return e = e !== null ? e.childLanes & ~l : 0, n && (e |= dn), e;
  }
  function Sg(e, n, l) {
    var o = n.pendingProps, s = !1, f = (n.flags & 128) !== 0, h;
    if ((h = f) || (h = e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0), h && (s = !0, n.flags &= -129), h = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Le) {
        if (s ? dl(n) : ml(), Le) {
          var x = St, T;
          if (T = x) {
            e: {
              for (T = x, x = Mn; T.nodeType !== 8; ) {
                if (!x) {
                  x = null;
                  break e;
                }
                if (T = xn(
                  T.nextSibling
                ), T === null) {
                  x = null;
                  break e;
                }
              }
              x = T;
            }
            x !== null ? (n.memoizedState = {
              dehydrated: x,
              treeContext: Zl !== null ? { id: kn, overflow: Un } : null,
              retryLane: 536870912
            }, T = fn(
              18,
              null,
              null,
              0
            ), T.stateNode = x, T.return = n, n.child = T, At = n, St = null, T = !0) : T = !1;
          }
          T || Kl(n);
        }
        if (x = n.memoizedState, x !== null && (x = x.dehydrated, x !== null))
          return Ac(x) ? n.lanes = 16 : n.lanes = 536870912, null;
        qn(n);
      }
      return x = o.children, o = o.fallback, s ? (ml(), s = n.mode, x = Hs(
        { mode: "hidden", children: x },
        s
      ), o = ra(
        o,
        s,
        l,
        null
      ), x.return = n, o.return = n, x.sibling = o, n.child = x, s = n.child, s.memoizedState = zs(l), s.childLanes = $s(
        e,
        h,
        l
      ), n.memoizedState = js, o) : (dl(n), Ls(n, x));
    }
    if (T = e.memoizedState, T !== null && (x = T.dehydrated, x !== null)) {
      if (f)
        n.flags & 256 ? (dl(n), n.flags &= -257, n = Fs(
          e,
          n,
          l
        )) : n.memoizedState !== null ? (ml(), n.child = e.child, n.flags |= 128, n = null) : (ml(), s = o.fallback, x = n.mode, o = Hs(
          { mode: "visible", children: o.children },
          x
        ), s = ra(
          s,
          x,
          l,
          null
        ), s.flags |= 2, o.return = n, s.return = n, o.sibling = s, n.child = o, ta(
          n,
          e.child,
          null,
          l
        ), o = n.child, o.memoizedState = zs(l), o.childLanes = $s(
          e,
          h,
          l
        ), n.memoizedState = js, n = s);
      else if (dl(n), Ac(x)) {
        if (h = x.nextSibling && x.nextSibling.dataset, h) var D = h.dgst;
        h = D, o = Error(r(419)), o.stack = "", o.digest = h, Ni({ value: o, source: null, stack: null }), n = Fs(
          e,
          n,
          l
        );
      } else if (gt || qi(e, n, l, !1), h = (l & e.childLanes) !== 0, gt || h) {
        if (h = Qe, h !== null) {
          if (o = l & -l, (o & 42) !== 0) o = 1;
          else
            switch (o) {
              case 2:
                o = 1;
                break;
              case 8:
                o = 4;
                break;
              case 32:
                o = 16;
                break;
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
                o = 64;
                break;
              case 268435456:
                o = 134217728;
                break;
              default:
                o = 0;
            }
          if (o = (o & (h.suspendedLanes | l)) !== 0 ? 0 : o, o !== 0 && o !== T.retryLane)
            throw T.retryLane = o, sl(e, o), Dt(h, e, o), fg;
        }
        x.data === "$?" || dc(), n = Fs(
          e,
          n,
          l
        );
      } else
        x.data === "$?" ? (n.flags |= 192, n.child = e.child, n = null) : (e = T.treeContext, St = xn(
          x.nextSibling
        ), At = n, Le = !0, bn = null, Mn = !1, e !== null && (rn[on++] = kn, rn[on++] = Un, rn[on++] = Zl, kn = e.id, Un = e.overflow, Zl = n), n = Ls(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return s ? (ml(), s = o.fallback, x = n.mode, T = e.child, D = T.sibling, o = xl(T, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = T.subtreeFlags & 31457280, D !== null ? s = xl(D, s) : (s = ra(
      s,
      x,
      l,
      null
    ), s.flags |= 2), s.return = n, o.return = n, o.sibling = s, n.child = o, o = s, s = n.child, x = e.child.memoizedState, x === null ? x = zs(l) : (T = x.cachePool, T !== null ? (D = ct._currentValue, T = T.parent !== D ? { parent: D, pool: D } : T) : T = vm(), x = {
      baseLanes: x.baseLanes | l,
      cachePool: T
    }), s.memoizedState = x, s.childLanes = $s(
      e,
      h,
      l
    ), n.memoizedState = js, o) : (dl(n), l = e.child, e = l.sibling, l = xl(l, {
      mode: "visible",
      children: o.children
    }), l.return = n, l.sibling = null, e !== null && (h = n.deletions, h === null ? (n.deletions = [e], n.flags |= 16) : h.push(e)), n.child = l, n.memoizedState = null, l);
  }
  function Ls(e, n) {
    return n = Hs(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function Hs(e, n) {
    return Ig(e, n, 0, null);
  }
  function Fs(e, n, l) {
    return ta(n, e.child, null, l), e = Ls(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function xg(e, n, l) {
    e.lanes |= n;
    var o = e.alternate;
    o !== null && (o.lanes |= n), Bs(e.return, n, l);
  }
  function Vs(e, n, l, o, s) {
    var f = e.memoizedState;
    f === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: l,
      tailMode: s
    } : (f.isBackwards = n, f.rendering = null, f.renderingStartTime = 0, f.last = o, f.tail = l, f.tailMode = s);
  }
  function wg(e, n, l) {
    var o = n.pendingProps, s = o.revealOrder, f = o.tail;
    if (xt(e, n, o.children, l), o = ft.current, (o & 2) !== 0)
      o = o & 1 | 2, n.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = n.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && xg(e, l, n);
          else if (e.tag === 19)
            xg(e, l, n);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === n) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === n)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      o &= 1;
    }
    switch (oe(ft, o), s) {
      case "forwards":
        for (l = n.child, s = null; l !== null; )
          e = l.alternate, e !== null && xo(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = n.child, n.child = null) : (s = l.sibling, l.sibling = null), Vs(
          n,
          !1,
          s,
          l,
          f
        );
        break;
      case "backwards":
        for (l = null, s = n.child, n.child = null; s !== null; ) {
          if (e = s.alternate, e !== null && xo(e) === null) {
            n.child = s;
            break;
          }
          e = s.sibling, s.sibling = l, l = s, s = e;
        }
        Vs(
          n,
          !0,
          l,
          null,
          f
        );
        break;
      case "together":
        Vs(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Gn(e, n, l) {
    if (e !== null && (n.dependencies = e.dependencies), El |= n.lanes, (l & n.childLanes) === 0)
      if (e !== null) {
        if (qi(
          e,
          n,
          l,
          !1
        ), (l & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(r(153));
    if (n.child !== null) {
      for (e = n.child, l = xl(e, e.pendingProps), n.child = l, l.return = n; e.sibling !== null; )
        e = e.sibling, l = l.sibling = xl(e, e.pendingProps), l.return = n;
      l.sibling = null;
    }
    return n.child;
  }
  function ks(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Co(e)));
  }
  function cb(e, n, l) {
    switch (n.tag) {
      case 3:
        Fe(n, n.stateNode.containerInfo), gl(n, ct, e.memoizedState.cache), Di();
        break;
      case 27:
      case 5:
        _t(n);
        break;
      case 4:
        Fe(n, n.stateNode.containerInfo);
        break;
      case 10:
        gl(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (dl(n), n.flags |= 128, null) : (l & n.child.childLanes) !== 0 ? Sg(e, n, l) : (dl(n), e = Gn(
            e,
            n,
            l
          ), e !== null ? e.sibling : null);
        dl(n);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (o = (l & n.childLanes) !== 0, o || (qi(
          e,
          n,
          l,
          !1
        ), o = (l & n.childLanes) !== 0), s) {
          if (o)
            return wg(
              e,
              n,
              l
            );
          n.flags |= 128;
        }
        if (s = n.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), oe(ft, ft.current), o) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, pg(e, n, l);
      case 24:
        gl(n, ct, e.memoizedState.cache);
    }
    return Gn(e, n, l);
  }
  function Eg(e, n, l) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        gt = !0;
      else {
        if (!ks(e, l) && (n.flags & 128) === 0)
          return gt = !1, cb(
            e,
            n,
            l
          );
        gt = (e.flags & 131072) !== 0;
      }
    else
      gt = !1, Le && (n.flags & 1048576) !== 0 && rm(n, ao, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          e = n.pendingProps;
          var o = n.elementType, s = o._init;
          if (o = s(o._payload), n.type = o, typeof o == "function")
            ec(o) ? (e = na(o, e), n.tag = 1, n = yg(
              null,
              n,
              o,
              e,
              l
            )) : (n.tag = 0, n = Ns(
              null,
              n,
              o,
              e,
              l
            ));
          else {
            if (o != null) {
              if (s = o.$$typeof, s === b) {
                n.tag = 11, n = dg(
                  null,
                  n,
                  o,
                  e,
                  l
                );
                break e;
              } else if (s === N) {
                n.tag = 14, n = mg(
                  null,
                  n,
                  o,
                  e,
                  l
                );
                break e;
              }
            }
            throw n = O(o) || o, Error(r(306, n, ""));
          }
        }
        return n;
      case 0:
        return Ns(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 1:
        return o = n.type, s = na(
          o,
          n.pendingProps
        ), yg(
          e,
          n,
          o,
          s,
          l
        );
      case 3:
        e: {
          if (Fe(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(r(387));
          var f = n.pendingProps;
          s = n.memoizedState, o = s.element, Ys(e, n), Ii(n, f, null, l);
          var h = n.memoizedState;
          if (f = h.cache, gl(n, ct, f), f !== s.cache && qs(
            n,
            [ct],
            l,
            !0
          ), Yi(), f = h.element, s.isDehydrated)
            if (s = {
              element: f,
              isDehydrated: !1,
              cache: h.cache
            }, n.updateQueue.baseState = s, n.memoizedState = s, n.flags & 256) {
              n = bg(
                e,
                n,
                f,
                l
              );
              break e;
            } else if (f !== o) {
              o = an(
                Error(r(424)),
                n
              ), Ni(o), n = bg(
                e,
                n,
                f,
                l
              );
              break e;
            } else
              for (St = xn(
                n.stateNode.containerInfo.firstChild
              ), At = n, Le = !0, bn = null, Mn = !0, l = tg(
                n,
                null,
                f,
                l
              ), n.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Di(), f === o) {
              n = Gn(
                e,
                n,
                l
              );
              break e;
            }
            xt(e, n, f, l);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Bi(e, n), e === null ? (l = Tp(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = l : Le || (l = n.type, e = n.pendingProps, o = ko(
          qe.current
        ).createElement(l), o[Ct] = n, o[Ht] = e, wt(o, l, e), mt(o), n.stateNode = o) : n.memoizedState = Tp(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return _t(n), e === null && Le && (o = n.stateNode = Ep(
          n.type,
          n.pendingProps,
          qe.current
        ), At = n, Mn = !0, St = xn(
          o.firstChild
        )), o = n.pendingProps.children, e !== null || Le ? xt(
          e,
          n,
          o,
          l
        ) : n.child = ta(
          n,
          null,
          o,
          l
        ), Bi(e, n), n.child;
      case 5:
        return e === null && Le && ((s = o = St) && (o = kb(
          o,
          n.type,
          n.pendingProps,
          Mn
        ), o !== null ? (n.stateNode = o, At = n, St = xn(
          o.firstChild
        ), Mn = !1, s = !0) : s = !1), s || Kl(n)), _t(n), s = n.type, f = n.pendingProps, h = e !== null ? e.memoizedProps : null, o = f.children, Tc(s, f) ? o = null : h !== null && Tc(s, h) && (n.flags |= 32), n.memoizedState !== null && (s = gs(
          e,
          n,
          lb,
          null,
          null,
          l
        ), or._currentValue = s), Bi(e, n), xt(e, n, o, l), n.child;
      case 6:
        return e === null && Le && ((e = l = St) && (l = Ub(
          l,
          n.pendingProps,
          Mn
        ), l !== null ? (n.stateNode = l, At = n, St = null, e = !0) : e = !1), e || Kl(n)), null;
      case 13:
        return Sg(e, n, l);
      case 4:
        return Fe(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, e === null ? n.child = ta(
          n,
          null,
          o,
          l
        ) : xt(
          e,
          n,
          o,
          l
        ), n.child;
      case 11:
        return dg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 7:
        return xt(
          e,
          n,
          n.pendingProps,
          l
        ), n.child;
      case 8:
        return xt(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 12:
        return xt(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 10:
        return o = n.pendingProps, gl(n, n.type, o.value), xt(
          e,
          n,
          o.children,
          l
        ), n.child;
      case 9:
        return s = n.type._context, o = n.pendingProps.children, aa(n), s = Rt(s), o = o(s), n.flags |= 1, xt(e, n, o, l), n.child;
      case 14:
        return mg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 15:
        return gg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 19:
        return wg(e, n, l);
      case 22:
        return pg(e, n, l);
      case 24:
        return aa(n), o = Rt(ct), e === null ? (s = ds(), s === null && (s = Qe, f = us(), s.pooledCache = f, f.refCount++, f !== null && (s.pooledCacheLanes |= l), s = f), n.memoizedState = {
          parent: o,
          cache: s
        }, Gs(n), gl(n, ct, s)) : ((e.lanes & l) !== 0 && (Ys(e, n), Ii(n, null, null, l), Yi()), s = e.memoizedState, f = n.memoizedState, s.parent !== o ? (s = { parent: o, cache: o }, n.memoizedState = s, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = s), gl(n, ct, o)) : (o = f.cache, gl(n, ct, o), o !== s.cache && qs(
          n,
          [ct],
          l,
          !0
        ))), xt(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(r(156, n.tag));
  }
  var Us = ne(null), la = null, Yn = null;
  function gl(e, n, l) {
    oe(Us, n._currentValue), n._currentValue = l;
  }
  function In(e) {
    e._currentValue = Us.current, le(Us);
  }
  function Bs(e, n, l) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), e === l) break;
      e = e.return;
    }
  }
  function qs(e, n, l, o) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var f = s.dependencies;
      if (f !== null) {
        var h = s.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var x = f;
          f = s;
          for (var T = 0; T < n.length; T++)
            if (x.context === n[T]) {
              f.lanes |= l, x = f.alternate, x !== null && (x.lanes |= l), Bs(
                f.return,
                l,
                e
              ), o || (h = null);
              break e;
            }
          f = x.next;
        }
      } else if (s.tag === 18) {
        if (h = s.return, h === null) throw Error(r(341));
        h.lanes |= l, f = h.alternate, f !== null && (f.lanes |= l), Bs(h, l, e), h = null;
      } else h = s.child;
      if (h !== null) h.return = s;
      else
        for (h = s; h !== null; ) {
          if (h === e) {
            h = null;
            break;
          }
          if (s = h.sibling, s !== null) {
            s.return = h.return, h = s;
            break;
          }
          h = h.return;
        }
      s = h;
    }
  }
  function qi(e, n, l, o) {
    e = null;
    for (var s = n, f = !1; s !== null; ) {
      if (!f) {
        if ((s.flags & 524288) !== 0) f = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var h = s.alternate;
        if (h === null) throw Error(r(387));
        if (h = h.memoizedProps, h !== null) {
          var x = s.type;
          Ut(s.pendingProps.value, h.value) || (e !== null ? e.push(x) : e = [x]);
        }
      } else if (s === $e.current) {
        if (h = s.alternate, h === null) throw Error(r(387));
        h.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(or) : e = [or]);
      }
      s = s.return;
    }
    e !== null && qs(
      n,
      e,
      l,
      o
    ), n.flags |= 262144;
  }
  function Co(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ut(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function aa(e) {
    la = e, Yn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Rt(e) {
    return Cg(la, e);
  }
  function Ro(e, n) {
    return la === null && aa(e), Cg(e, n);
  }
  function Cg(e, n) {
    var l = n._currentValue;
    if (n = { context: n, memoizedValue: l, next: null }, Yn === null) {
      if (e === null) throw Error(r(308));
      Yn = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Yn = Yn.next = n;
    return l;
  }
  var pl = !1;
  function Gs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ys(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function hl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function vl(e, n, l) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (We & 2) !== 0) {
      var s = o.pending;
      return s === null ? n.next = n : (n.next = s.next, s.next = n), o.pending = n, n = no(e), am(e, null, l), n;
    }
    return to(e, o, n, l), no(e);
  }
  function Gi(e, n, l) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (l & 4194176) !== 0)) {
      var o = n.lanes;
      o &= e.pendingLanes, l |= o, n.lanes = l, dd(e, l);
    }
  }
  function Is(e, n) {
    var l = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var s = null, f = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var h = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          f === null ? s = f = h : f = f.next = h, l = l.next;
        } while (l !== null);
        f === null ? s = f = n : f = f.next = n;
      } else s = f = n;
      l = {
        baseState: o.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: f,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = n : e.next = n, l.lastBaseUpdate = n;
  }
  var Xs = !1;
  function Yi() {
    if (Xs) {
      var e = Fa;
      if (e !== null) throw e;
    }
  }
  function Ii(e, n, l, o) {
    Xs = !1;
    var s = e.updateQueue;
    pl = !1;
    var f = s.firstBaseUpdate, h = s.lastBaseUpdate, x = s.shared.pending;
    if (x !== null) {
      s.shared.pending = null;
      var T = x, D = T.next;
      T.next = null, h === null ? f = D : h.next = D, h = T;
      var G = e.alternate;
      G !== null && (G = G.updateQueue, x = G.lastBaseUpdate, x !== h && (x === null ? G.firstBaseUpdate = D : x.next = D, G.lastBaseUpdate = T));
    }
    if (f !== null) {
      var J = s.baseState;
      h = 0, G = D = T = null, x = f;
      do {
        var F = x.lane & -536870913, q = F !== x.lane;
        if (q ? (je & F) === F : (o & F) === F) {
          F !== 0 && F === Ha && (Xs = !0), G !== null && (G = G.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var fe = e, Ce = x;
            F = n;
            var tt = l;
            switch (Ce.tag) {
              case 1:
                if (fe = Ce.payload, typeof fe == "function") {
                  J = fe.call(tt, J, F);
                  break e;
                }
                J = fe;
                break e;
              case 3:
                fe.flags = fe.flags & -65537 | 128;
              case 0:
                if (fe = Ce.payload, F = typeof fe == "function" ? fe.call(tt, J, F) : fe, F == null) break e;
                J = _({}, J, F);
                break e;
              case 2:
                pl = !0;
            }
          }
          F = x.callback, F !== null && (e.flags |= 64, q && (e.flags |= 8192), q = s.callbacks, q === null ? s.callbacks = [F] : q.push(F));
        } else
          q = {
            lane: F,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, G === null ? (D = G = q, T = J) : G = G.next = q, h |= F;
        if (x = x.next, x === null) {
          if (x = s.shared.pending, x === null)
            break;
          q = x, x = q.next, q.next = null, s.lastBaseUpdate = q, s.shared.pending = null;
        }
      } while (!0);
      G === null && (T = J), s.baseState = T, s.firstBaseUpdate = D, s.lastBaseUpdate = G, f === null && (s.shared.lanes = 0), El |= h, e.lanes = h, e.memoizedState = J;
    }
  }
  function Rg(e, n) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(n);
  }
  function Tg(e, n) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Rg(l[e], n);
  }
  function Xi(e, n) {
    try {
      var l = n.updateQueue, o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var s = o.next;
        l = s;
        do {
          if ((l.tag & e) === e) {
            o = void 0;
            var f = l.create, h = l.inst;
            o = f(), h.destroy = o;
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (x) {
      Ze(n, n.return, x);
    }
  }
  function yl(e, n, l) {
    try {
      var o = n.updateQueue, s = o !== null ? o.lastEffect : null;
      if (s !== null) {
        var f = s.next;
        o = f;
        do {
          if ((o.tag & e) === e) {
            var h = o.inst, x = h.destroy;
            if (x !== void 0) {
              h.destroy = void 0, s = n;
              var T = l;
              try {
                x();
              } catch (D) {
                Ze(
                  s,
                  T,
                  D
                );
              }
            }
          }
          o = o.next;
        } while (o !== f);
      }
    } catch (D) {
      Ze(n, n.return, D);
    }
  }
  function Mg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var l = e.stateNode;
      try {
        Tg(n, l);
      } catch (o) {
        Ze(e, e.return, o);
      }
    }
  }
  function Og(e, n, l) {
    l.props = na(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (o) {
      Ze(e, n, o);
    }
  }
  function ia(e, n) {
    try {
      var l = e.ref;
      if (l !== null) {
        var o = e.stateNode;
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var s = o;
            break;
          default:
            s = o;
        }
        typeof l == "function" ? e.refCleanup = l(s) : l.current = s;
      }
    } catch (f) {
      Ze(e, n, f);
    }
  }
  function Bt(e, n) {
    var l = e.ref, o = e.refCleanup;
    if (l !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (s) {
          Ze(e, n, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (s) {
          Ze(e, n, s);
        }
      else l.current = null;
  }
  function _g(e) {
    var n = e.type, l = e.memoizedProps, o = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && o.focus();
          break e;
        case "img":
          l.src ? o.src = l.src : l.srcSet && (o.srcset = l.srcSet);
      }
    } catch (s) {
      Ze(e, e.return, s);
    }
  }
  function Ag(e, n, l) {
    try {
      var o = e.stateNode;
      $b(o, e.type, l, n), o[Ht] = n;
    } catch (s) {
      Ze(e, e.return, s);
    }
  }
  function Dg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 || e.tag === 4;
  }
  function Zs(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Dg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 27 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Qs(e, n, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? l.nodeType === 8 ? l.parentNode.insertBefore(e, n) : l.insertBefore(e, n) : (l.nodeType === 8 ? (n = l.parentNode, n.insertBefore(e, l)) : (n = l, n.appendChild(e)), l = l._reactRootContainer, l != null || n.onclick !== null || (n.onclick = Vo));
    else if (o !== 4 && o !== 27 && (e = e.child, e !== null))
      for (Qs(e, n, l), e = e.sibling; e !== null; )
        Qs(e, n, l), e = e.sibling;
  }
  function To(e, n, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? l.insertBefore(e, n) : l.appendChild(e);
    else if (o !== 4 && o !== 27 && (e = e.child, e !== null))
      for (To(e, n, l), e = e.sibling; e !== null; )
        To(e, n, l), e = e.sibling;
  }
  var Xn = !1, Je = !1, Ks = !1, Ng = typeof WeakSet == "function" ? WeakSet : Set, pt = null, jg = !1;
  function fb(e, n) {
    if (e = e.containerInfo, Cc = Io, e = Qd(e), Wu(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var o = l.getSelection && l.getSelection();
          if (o && o.rangeCount !== 0) {
            l = o.anchorNode;
            var s = o.anchorOffset, f = o.focusNode;
            o = o.focusOffset;
            try {
              l.nodeType, f.nodeType;
            } catch {
              l = null;
              break e;
            }
            var h = 0, x = -1, T = -1, D = 0, G = 0, J = e, F = null;
            t: for (; ; ) {
              for (var q; J !== l || s !== 0 && J.nodeType !== 3 || (x = h + s), J !== f || o !== 0 && J.nodeType !== 3 || (T = h + o), J.nodeType === 3 && (h += J.nodeValue.length), (q = J.firstChild) !== null; )
                F = J, J = q;
              for (; ; ) {
                if (J === e) break t;
                if (F === l && ++D === s && (x = h), F === f && ++G === o && (T = h), (q = J.nextSibling) !== null) break;
                J = F, F = J.parentNode;
              }
              J = q;
            }
            l = x === -1 || T === -1 ? null : { start: x, end: T };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Rc = { focusedElem: e, selectionRange: l }, Io = !1, pt = n; pt !== null; )
      if (n = pt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, pt = e;
      else
        for (; pt !== null; ) {
          switch (n = pt, f = n.alternate, e = n.flags, n.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, l = n, s = f.memoizedProps, f = f.memoizedState, o = l.stateNode;
                try {
                  var fe = na(
                    l.type,
                    s,
                    l.elementType === l.type
                  );
                  e = o.getSnapshotBeforeUpdate(
                    fe,
                    f
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ce) {
                  Ze(
                    l,
                    l.return,
                    Ce
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, l = e.nodeType, l === 9)
                  _c(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _c(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, pt = e;
            break;
          }
          pt = n.return;
        }
    return fe = jg, jg = !1, fe;
  }
  function zg(e, n, l) {
    var o = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Qn(e, l), o & 4 && Xi(5, l);
        break;
      case 1:
        if (Qn(e, l), o & 4)
          if (e = l.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              Ze(l, l.return, x);
            }
          else {
            var s = na(
              l.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                s,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              Ze(
                l,
                l.return,
                x
              );
            }
          }
        o & 64 && Mg(l), o & 512 && ia(l, l.return);
        break;
      case 3:
        if (Qn(e, l), o & 64 && (o = l.updateQueue, o !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Tg(o, e);
          } catch (x) {
            Ze(l, l.return, x);
          }
        }
        break;
      case 26:
        Qn(e, l), o & 512 && ia(l, l.return);
        break;
      case 27:
      case 5:
        Qn(e, l), n === null && o & 4 && _g(l), o & 512 && ia(l, l.return);
        break;
      case 12:
        Qn(e, l);
        break;
      case 13:
        Qn(e, l), o & 4 && Hg(e, l), o & 64 && (o = l.memoizedState, o !== null && (o = o.dehydrated, o !== null && (l = Cb.bind(
          null,
          l
        ), Bb(o, l))));
        break;
      case 22:
        if (s = l.memoizedState !== null || Xn, !s) {
          n = n !== null && n.memoizedState !== null || Je;
          var f = Xn, h = Je;
          Xn = s, (Je = n) && !h ? bl(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Qn(e, l), Xn = f, Je = h;
        }
        o & 512 && (l.memoizedProps.mode === "manual" ? ia(l, l.return) : Bt(l, l.return));
        break;
      default:
        Qn(e, l);
    }
  }
  function $g(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, $g(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Lu(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var rt = null, qt = !1;
  function Zn(e, n, l) {
    for (l = l.child; l !== null; )
      Lg(e, n, l), l = l.sibling;
  }
  function Lg(e, n, l) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(vn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Je || Bt(l, n), Zn(
          e,
          n,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Je || Bt(l, n);
        var o = rt, s = qt;
        for (rt = l.stateNode, Zn(
          e,
          n,
          l
        ), l = l.stateNode, n = l.attributes; n.length; )
          l.removeAttributeNode(n[0]);
        Lu(l), rt = o, qt = s;
        break;
      case 5:
        Je || Bt(l, n);
      case 6:
        s = rt;
        var f = qt;
        if (rt = null, Zn(
          e,
          n,
          l
        ), rt = s, qt = f, rt !== null)
          if (qt)
            try {
              e = rt, o = l.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(o) : e.removeChild(o);
            } catch (h) {
              Ze(
                l,
                n,
                h
              );
            }
          else
            try {
              rt.removeChild(l.stateNode);
            } catch (h) {
              Ze(
                l,
                n,
                h
              );
            }
        break;
      case 18:
        rt !== null && (qt ? (n = rt, l = l.stateNode, n.nodeType === 8 ? Oc(
          n.parentNode,
          l
        ) : n.nodeType === 1 && Oc(n, l), fr(n)) : Oc(rt, l.stateNode));
        break;
      case 4:
        o = rt, s = qt, rt = l.stateNode.containerInfo, qt = !0, Zn(
          e,
          n,
          l
        ), rt = o, qt = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Je || yl(2, l, n), Je || yl(4, l, n), Zn(
          e,
          n,
          l
        );
        break;
      case 1:
        Je || (Bt(l, n), o = l.stateNode, typeof o.componentWillUnmount == "function" && Og(
          l,
          n,
          o
        )), Zn(
          e,
          n,
          l
        );
        break;
      case 21:
        Zn(
          e,
          n,
          l
        );
        break;
      case 22:
        Je || Bt(l, n), Je = (o = Je) || l.memoizedState !== null, Zn(
          e,
          n,
          l
        ), Je = o;
        break;
      default:
        Zn(
          e,
          n,
          l
        );
    }
  }
  function Hg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        fr(e);
      } catch (l) {
        Ze(n, n.return, l);
      }
  }
  function db(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Ng()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Ng()), n;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Ps(e, n) {
    var l = db(e);
    n.forEach(function(o) {
      var s = Rb.bind(null, e, o);
      l.has(o) || (l.add(o), o.then(s, s));
    });
  }
  function sn(e, n) {
    var l = n.deletions;
    if (l !== null)
      for (var o = 0; o < l.length; o++) {
        var s = l[o], f = e, h = n, x = h;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
            case 5:
              rt = x.stateNode, qt = !1;
              break e;
            case 3:
              rt = x.stateNode.containerInfo, qt = !0;
              break e;
            case 4:
              rt = x.stateNode.containerInfo, qt = !0;
              break e;
          }
          x = x.return;
        }
        if (rt === null) throw Error(r(160));
        Lg(f, h, s), rt = null, qt = !1, f = s.alternate, f !== null && (f.return = null), s.return = null;
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; )
        Fg(n, e), n = n.sibling;
  }
  var Sn = null;
  function Fg(e, n) {
    var l = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        sn(n, e), cn(e), o & 4 && (yl(3, e, e.return), Xi(3, e), yl(5, e, e.return));
        break;
      case 1:
        sn(n, e), cn(e), o & 512 && (Je || l === null || Bt(l, l.return)), o & 64 && Xn && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? o : l.concat(o))));
        break;
      case 26:
        var s = Sn;
        if (sn(n, e), cn(e), o & 512 && (Je || l === null || Bt(l, l.return)), o & 4) {
          var f = l !== null ? l.memoizedState : null;
          if (o = e.memoizedState, l === null)
            if (o === null)
              if (e.stateNode === null) {
                e: {
                  o = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (o) {
                    case "title":
                      f = s.getElementsByTagName("title")[0], (!f || f[bi] || f[Ct] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = s.createElement(o), s.head.insertBefore(
                        f,
                        s.querySelector("head > title")
                      )), wt(f, o, l), f[Ct] = e, mt(f), o = f;
                      break e;
                    case "link":
                      var h = _p(
                        "link",
                        "href",
                        s
                      ).get(o + (l.href || ""));
                      if (h) {
                        for (var x = 0; x < h.length; x++)
                          if (f = h[x], f.getAttribute("href") === (l.href == null ? null : l.href) && f.getAttribute("rel") === (l.rel == null ? null : l.rel) && f.getAttribute("title") === (l.title == null ? null : l.title) && f.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            h.splice(x, 1);
                            break t;
                          }
                      }
                      f = s.createElement(o), wt(f, o, l), s.head.appendChild(f);
                      break;
                    case "meta":
                      if (h = _p(
                        "meta",
                        "content",
                        s
                      ).get(o + (l.content || ""))) {
                        for (x = 0; x < h.length; x++)
                          if (f = h[x], f.getAttribute("content") === (l.content == null ? null : "" + l.content) && f.getAttribute("name") === (l.name == null ? null : l.name) && f.getAttribute("property") === (l.property == null ? null : l.property) && f.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && f.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            h.splice(x, 1);
                            break t;
                          }
                      }
                      f = s.createElement(o), wt(f, o, l), s.head.appendChild(f);
                      break;
                    default:
                      throw Error(r(468, o));
                  }
                  f[Ct] = e, mt(f), o = f;
                }
                e.stateNode = o;
              } else
                Ap(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Op(
                s,
                o,
                e.memoizedProps
              );
          else
            f !== o ? (f === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : f.count--, o === null ? Ap(
              s,
              e.type,
              e.stateNode
            ) : Op(
              s,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && Ag(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        if (o & 4 && e.alternate === null) {
          s = e.stateNode, f = e.memoizedProps;
          try {
            for (var T = s.firstChild; T; ) {
              var D = T.nextSibling, G = T.nodeName;
              T[bi] || G === "HEAD" || G === "BODY" || G === "SCRIPT" || G === "STYLE" || G === "LINK" && T.rel.toLowerCase() === "stylesheet" || s.removeChild(T), T = D;
            }
            for (var J = e.type, F = s.attributes; F.length; )
              s.removeAttributeNode(F[0]);
            wt(s, J, f), s[Ct] = e, s[Ht] = f;
          } catch (fe) {
            Ze(e, e.return, fe);
          }
        }
      case 5:
        if (sn(n, e), cn(e), o & 512 && (Je || l === null || Bt(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            Ma(s, "");
          } catch (fe) {
            Ze(e, e.return, fe);
          }
        }
        o & 4 && e.stateNode != null && (s = e.memoizedProps, Ag(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), o & 1024 && (Ks = !0);
        break;
      case 6:
        if (sn(n, e), cn(e), o & 4) {
          if (e.stateNode === null)
            throw Error(r(162));
          o = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = o;
          } catch (fe) {
            Ze(e, e.return, fe);
          }
        }
        break;
      case 3:
        if (qo = null, s = Sn, Sn = Uo(n.containerInfo), sn(n, e), Sn = s, cn(e), o & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            fr(n.containerInfo);
          } catch (fe) {
            Ze(e, e.return, fe);
          }
        Ks && (Ks = !1, Vg(e));
        break;
      case 4:
        o = Sn, Sn = Uo(
          e.stateNode.containerInfo
        ), sn(n, e), cn(e), Sn = o;
        break;
      case 12:
        sn(n, e), cn(e);
        break;
      case 13:
        sn(n, e), cn(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (rc = Xe()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ps(e, o)));
        break;
      case 22:
        if (o & 512 && (Je || l === null || Bt(l, l.return)), T = e.memoizedState !== null, D = l !== null && l.memoizedState !== null, G = Xn, J = Je, Xn = G || T, Je = J || D, sn(n, e), Je = J, Xn = G, cn(e), n = e.stateNode, n._current = e, n._visibility &= -3, n._visibility |= n._pendingVisibility & 2, o & 8192 && (n._visibility = T ? n._visibility & -2 : n._visibility | 1, T && (n = Xn || Je, l === null || D || n || Ga(e)), e.memoizedProps === null || e.memoizedProps.mode !== "manual"))
          e: for (l = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26 || n.tag === 27) {
              if (l === null) {
                D = l = n;
                try {
                  if (s = D.stateNode, T)
                    f = s.style, typeof f.setProperty == "function" ? f.setProperty(
                      "display",
                      "none",
                      "important"
                    ) : f.display = "none";
                  else {
                    h = D.stateNode, x = D.memoizedProps.style;
                    var q = x != null && x.hasOwnProperty("display") ? x.display : null;
                    h.style.display = q == null || typeof q == "boolean" ? "" : ("" + q).trim();
                  }
                } catch (fe) {
                  Ze(D, D.return, fe);
                }
              }
            } else if (n.tag === 6) {
              if (l === null) {
                D = n;
                try {
                  D.stateNode.nodeValue = T ? "" : D.memoizedProps;
                } catch (fe) {
                  Ze(D, D.return, fe);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === e) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              l === n && (l = null), n = n.return;
            }
            l === n && (l = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = e.updateQueue, o !== null && (l = o.retryQueue, l !== null && (o.retryQueue = null, Ps(e, l))));
        break;
      case 19:
        sn(n, e), cn(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ps(e, o)));
        break;
      case 21:
        break;
      default:
        sn(n, e), cn(e);
    }
  }
  function cn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        if (e.tag !== 27) {
          e: {
            for (var l = e.return; l !== null; ) {
              if (Dg(l)) {
                var o = l;
                break e;
              }
              l = l.return;
            }
            throw Error(r(160));
          }
          switch (o.tag) {
            case 27:
              var s = o.stateNode, f = Zs(e);
              To(e, f, s);
              break;
            case 5:
              var h = o.stateNode;
              o.flags & 32 && (Ma(h, ""), o.flags &= -33);
              var x = Zs(e);
              To(e, x, h);
              break;
            case 3:
            case 4:
              var T = o.stateNode.containerInfo, D = Zs(e);
              Qs(
                e,
                D,
                T
              );
              break;
            default:
              throw Error(r(161));
          }
        }
      } catch (G) {
        Ze(e, e.return, G);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Vg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Vg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Qn(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        zg(e, n.alternate, n), n = n.sibling;
  }
  function Ga(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          yl(4, n, n.return), Ga(n);
          break;
        case 1:
          Bt(n, n.return);
          var l = n.stateNode;
          typeof l.componentWillUnmount == "function" && Og(
            n,
            n.return,
            l
          ), Ga(n);
          break;
        case 26:
        case 27:
        case 5:
          Bt(n, n.return), Ga(n);
          break;
        case 22:
          Bt(n, n.return), n.memoizedState === null && Ga(n);
          break;
        default:
          Ga(n);
      }
      e = e.sibling;
    }
  }
  function bl(e, n, l) {
    for (l = l && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, s = e, f = n, h = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          bl(
            s,
            f,
            l
          ), Xi(4, f);
          break;
        case 1:
          if (bl(
            s,
            f,
            l
          ), o = f, s = o.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (D) {
              Ze(o, o.return, D);
            }
          if (o = f, s = o.updateQueue, s !== null) {
            var x = o.stateNode;
            try {
              var T = s.shared.hiddenCallbacks;
              if (T !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < T.length; s++)
                  Rg(T[s], x);
            } catch (D) {
              Ze(o, o.return, D);
            }
          }
          l && h & 64 && Mg(f), ia(f, f.return);
          break;
        case 26:
        case 27:
        case 5:
          bl(
            s,
            f,
            l
          ), l && o === null && h & 4 && _g(f), ia(f, f.return);
          break;
        case 12:
          bl(
            s,
            f,
            l
          );
          break;
        case 13:
          bl(
            s,
            f,
            l
          ), l && h & 4 && Hg(s, f);
          break;
        case 22:
          f.memoizedState === null && bl(
            s,
            f,
            l
          ), ia(f, f.return);
          break;
        default:
          bl(
            s,
            f,
            l
          );
      }
      n = n.sibling;
    }
  }
  function Ws(e, n) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && $i(l));
  }
  function Js(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && $i(e));
  }
  function Sl(e, n, l, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        kg(
          e,
          n,
          l,
          o
        ), n = n.sibling;
  }
  function kg(e, n, l, o) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Sl(
          e,
          n,
          l,
          o
        ), s & 2048 && Xi(9, n);
        break;
      case 3:
        Sl(
          e,
          n,
          l,
          o
        ), s & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && $i(e)));
        break;
      case 12:
        if (s & 2048) {
          Sl(
            e,
            n,
            l,
            o
          ), e = n.stateNode;
          try {
            var f = n.memoizedProps, h = f.id, x = f.onPostCommit;
            typeof x == "function" && x(
              h,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (T) {
            Ze(n, n.return, T);
          }
        } else
          Sl(
            e,
            n,
            l,
            o
          );
        break;
      case 23:
        break;
      case 22:
        f = n.stateNode, n.memoizedState !== null ? f._visibility & 4 ? Sl(
          e,
          n,
          l,
          o
        ) : Zi(e, n) : f._visibility & 4 ? Sl(
          e,
          n,
          l,
          o
        ) : (f._visibility |= 4, Ya(
          e,
          n,
          l,
          o,
          (n.subtreeFlags & 10256) !== 0
        )), s & 2048 && Ws(
          n.alternate,
          n
        );
        break;
      case 24:
        Sl(
          e,
          n,
          l,
          o
        ), s & 2048 && Js(n.alternate, n);
        break;
      default:
        Sl(
          e,
          n,
          l,
          o
        );
    }
  }
  function Ya(e, n, l, o, s) {
    for (s = s && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var f = e, h = n, x = l, T = o, D = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          Ya(
            f,
            h,
            x,
            T,
            s
          ), Xi(8, h);
          break;
        case 23:
          break;
        case 22:
          var G = h.stateNode;
          h.memoizedState !== null ? G._visibility & 4 ? Ya(
            f,
            h,
            x,
            T,
            s
          ) : Zi(
            f,
            h
          ) : (G._visibility |= 4, Ya(
            f,
            h,
            x,
            T,
            s
          )), s && D & 2048 && Ws(
            h.alternate,
            h
          );
          break;
        case 24:
          Ya(
            f,
            h,
            x,
            T,
            s
          ), s && D & 2048 && Js(h.alternate, h);
          break;
        default:
          Ya(
            f,
            h,
            x,
            T,
            s
          );
      }
      n = n.sibling;
    }
  }
  function Zi(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var l = e, o = n, s = o.flags;
        switch (o.tag) {
          case 22:
            Zi(l, o), s & 2048 && Ws(
              o.alternate,
              o
            );
            break;
          case 24:
            Zi(l, o), s & 2048 && Js(o.alternate, o);
            break;
          default:
            Zi(l, o);
        }
        n = n.sibling;
      }
  }
  var Qi = 8192;
  function Ia(e) {
    if (e.subtreeFlags & Qi)
      for (e = e.child; e !== null; )
        Ug(e), e = e.sibling;
  }
  function Ug(e) {
    switch (e.tag) {
      case 26:
        Ia(e), e.flags & Qi && e.memoizedState !== null && t1(
          Sn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ia(e);
        break;
      case 3:
      case 4:
        var n = Sn;
        Sn = Uo(e.stateNode.containerInfo), Ia(e), Sn = n;
        break;
      case 22:
        e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Qi, Qi = 16777216, Ia(e), Qi = n) : Ia(e));
        break;
      default:
        Ia(e);
    }
  }
  function Bg(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function Ki(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          pt = o, Gg(
            o,
            e
          );
        }
      Bg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        qg(e), e = e.sibling;
  }
  function qg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ki(e), e.flags & 2048 && yl(9, e, e.return);
        break;
      case 3:
        Ki(e);
        break;
      case 12:
        Ki(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 4 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -5, Mo(e)) : Ki(e);
        break;
      default:
        Ki(e);
    }
  }
  function Mo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          pt = o, Gg(
            o,
            e
          );
        }
      Bg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          yl(8, n, n.return), Mo(n);
          break;
        case 22:
          l = n.stateNode, l._visibility & 4 && (l._visibility &= -5, Mo(n));
          break;
        default:
          Mo(n);
      }
      e = e.sibling;
    }
  }
  function Gg(e, n) {
    for (; pt !== null; ) {
      var l = pt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          yl(8, l, n);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var o = l.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          $i(l.memoizedState.cache);
      }
      if (o = l.child, o !== null) o.return = l, pt = o;
      else
        e: for (l = e; pt !== null; ) {
          o = pt;
          var s = o.sibling, f = o.return;
          if ($g(o), o === l) {
            pt = null;
            break e;
          }
          if (s !== null) {
            s.return = f, pt = s;
            break e;
          }
          pt = f;
        }
    }
  }
  function mb(e, n, l, o) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function fn(e, n, l, o) {
    return new mb(e, n, l, o);
  }
  function ec(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xl(e, n) {
    var l = e.alternate;
    return l === null ? (l = fn(
      e.tag,
      n,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 31457280, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, n = e.dependencies, l.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function Yg(e, n) {
    e.flags &= 31457282;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, n = l.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Oo(e, n, l, o, s, f) {
    var h = 0;
    if (o = e, typeof e == "function") ec(e) && (h = 1);
    else if (typeof e == "string")
      h = Jb(
        e,
        l,
        he.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case g:
          return ra(l.children, s, f, n);
        case p:
          h = 8, s |= 24;
          break;
        case v:
          return e = fn(12, l, n, s | 2), e.elementType = v, e.lanes = f, e;
        case R:
          return e = fn(13, l, n, s), e.elementType = R, e.lanes = f, e;
        case M:
          return e = fn(19, l, n, s), e.elementType = M, e.lanes = f, e;
        case $:
          return Ig(l, s, f, n);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case w:
              case y:
                h = 10;
                break e;
              case S:
                h = 9;
                break e;
              case b:
                h = 11;
                break e;
              case N:
                h = 14;
                break e;
              case j:
                h = 16, o = null;
                break e;
            }
          h = 29, l = Error(
            r(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return n = fn(h, l, n, s), n.elementType = e, n.type = o, n.lanes = f, n;
  }
  function ra(e, n, l, o) {
    return e = fn(7, e, o, n), e.lanes = l, e;
  }
  function Ig(e, n, l, o) {
    e = fn(22, e, o, n), e.elementType = $, e.lanes = l;
    var s = {
      _visibility: 1,
      _pendingVisibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
      _current: null,
      detach: function() {
        var f = s._current;
        if (f === null) throw Error(r(456));
        if ((s._pendingVisibility & 2) === 0) {
          var h = sl(f, 2);
          h !== null && (s._pendingVisibility |= 2, Dt(h, f, 2));
        }
      },
      attach: function() {
        var f = s._current;
        if (f === null) throw Error(r(456));
        if ((s._pendingVisibility & 2) !== 0) {
          var h = sl(f, 2);
          h !== null && (s._pendingVisibility &= -3, Dt(h, f, 2));
        }
      }
    };
    return e.stateNode = s, e;
  }
  function tc(e, n, l) {
    return e = fn(6, e, null, n), e.lanes = l, e;
  }
  function nc(e, n, l) {
    return n = fn(
      4,
      e.children !== null ? e.children : [],
      e.key,
      n
    ), n.lanes = l, n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, n;
  }
  function Kn(e) {
    e.flags |= 4;
  }
  function Xg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Dp(n)) {
      if (n = un.current, n !== null && ((je & 4194176) === je ? _n !== null : (je & 62914560) !== je && (je & 536870912) === 0 || n !== _n))
        throw zi = os, sm;
      e.flags |= 8192;
    }
  }
  function _o(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? cd() : 536870912, e.lanes |= n, Za |= n);
  }
  function Pi(e, n) {
    if (!Le)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var o = null; l !== null; )
            l.alternate !== null && (o = l), l = l.sibling;
          o === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
  }
  function Pe(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, l = 0, o = 0;
    if (n)
      for (var s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, o |= s.subtreeFlags & 31457280, o |= s.flags & 31457280, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, o |= s.subtreeFlags, o |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= o, e.childLanes = l, n;
  }
  function gb(e, n, l) {
    var o = n.pendingProps;
    switch (is(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Pe(n), null;
      case 1:
        return Pe(n), null;
      case 3:
        return l = n.stateNode, o = null, e !== null && (o = e.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), In(ct), Re(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Ai(n) ? Kn(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, bn !== null && (cc(bn), bn = null))), Pe(n), null;
      case 26:
        return l = n.memoizedState, e === null ? (Kn(n), l !== null ? (Pe(n), Xg(n, l)) : (Pe(n), n.flags &= -16777217)) : l ? l !== e.memoizedState ? (Kn(n), Pe(n), Xg(n, l)) : (Pe(n), n.flags &= -16777217) : (e.memoizedProps !== o && Kn(n), Pe(n), n.flags &= -16777217), null;
      case 27:
        we(n), l = qe.current;
        var s = n.type;
        if (e !== null && n.stateNode != null)
          e.memoizedProps !== o && Kn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(r(166));
            return Pe(n), null;
          }
          e = he.current, Ai(n) ? om(n) : (e = Ep(s, o, l), n.stateNode = e, Kn(n));
        }
        return Pe(n), null;
      case 5:
        if (we(n), l = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && Kn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(r(166));
            return Pe(n), null;
          }
          if (e = he.current, Ai(n))
            om(n);
          else {
            switch (s = ko(
              qe.current
            ), e) {
              case 1:
                e = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  l
                );
                break;
              case 2:
                e = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  l
                );
                break;
              default:
                switch (l) {
                  case "svg":
                    e = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      l
                    );
                    break;
                  case "math":
                    e = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    );
                    break;
                  case "script":
                    e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                    break;
                  case "select":
                    e = typeof o.is == "string" ? s.createElement("select", { is: o.is }) : s.createElement("select"), o.multiple ? e.multiple = !0 : o.size && (e.size = o.size);
                    break;
                  default:
                    e = typeof o.is == "string" ? s.createElement(l, { is: o.is }) : s.createElement(l);
                }
            }
            e[Ct] = n, e[Ht] = o;
            e: for (s = n.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                e.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === n) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === n)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            n.stateNode = e;
            e: switch (wt(e, l, o), l) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!o.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Kn(n);
          }
        }
        return Pe(n), n.flags &= -16777217, null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== o && Kn(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(r(166));
          if (e = qe.current, Ai(n)) {
            if (e = n.stateNode, l = n.memoizedProps, o = null, s = At, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  o = s.memoizedProps;
              }
            e[Ct] = n, e = !!(e.nodeValue === l || o !== null && o.suppressHydrationWarning === !0 || vp(e.nodeValue, l)), e || Kl(n);
          } else
            e = ko(e).createTextNode(
              o
            ), e[Ct] = n, n.stateNode = e;
        }
        return Pe(n), null;
      case 13:
        if (o = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Ai(n), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(r(318));
              if (s = n.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(r(317));
              s[Ct] = n;
            } else
              Di(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Pe(n), s = !1;
          } else
            bn !== null && (cc(bn), bn = null), s = !0;
          if (!s)
            return n.flags & 256 ? (qn(n), n) : (qn(n), null);
        }
        if (qn(n), (n.flags & 128) !== 0)
          return n.lanes = l, n;
        if (l = o !== null, e = e !== null && e.memoizedState !== null, l) {
          o = n.child, s = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (s = o.alternate.memoizedState.cachePool.pool);
          var f = null;
          o.memoizedState !== null && o.memoizedState.cachePool !== null && (f = o.memoizedState.cachePool.pool), f !== s && (o.flags |= 2048);
        }
        return l !== e && l && (n.child.flags |= 8192), _o(n, n.updateQueue), Pe(n), null;
      case 4:
        return Re(), e === null && xc(n.stateNode.containerInfo), Pe(n), null;
      case 10:
        return In(n.type), Pe(n), null;
      case 19:
        if (le(ft), s = n.memoizedState, s === null) return Pe(n), null;
        if (o = (n.flags & 128) !== 0, f = s.rendering, f === null)
          if (o) Pi(s, !1);
          else {
            if (et !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = xo(e), f !== null) {
                  for (n.flags |= 128, Pi(s, !1), e = f.updateQueue, n.updateQueue = e, _o(n, e), n.subtreeFlags = 0, e = l, l = n.child; l !== null; )
                    Yg(l, e), l = l.sibling;
                  return oe(
                    ft,
                    ft.current & 1 | 2
                  ), n.child;
                }
                e = e.sibling;
              }
            s.tail !== null && Xe() > Ao && (n.flags |= 128, o = !0, Pi(s, !1), n.lanes = 4194304);
          }
        else {
          if (!o)
            if (e = xo(f), e !== null) {
              if (n.flags |= 128, o = !0, e = e.updateQueue, n.updateQueue = e, _o(n, e), Pi(s, !0), s.tail === null && s.tailMode === "hidden" && !f.alternate && !Le)
                return Pe(n), null;
            } else
              2 * Xe() - s.renderingStartTime > Ao && l !== 536870912 && (n.flags |= 128, o = !0, Pi(s, !1), n.lanes = 4194304);
          s.isBackwards ? (f.sibling = n.child, n.child = f) : (e = s.last, e !== null ? e.sibling = f : n.child = f, s.last = f);
        }
        return s.tail !== null ? (n = s.tail, s.rendering = n, s.tail = n.sibling, s.renderingStartTime = Xe(), n.sibling = null, e = ft.current, oe(ft, o ? e & 1 | 2 : e & 1), n) : (Pe(n), null);
      case 22:
      case 23:
        return qn(n), fs(), o = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (l & 536870912) !== 0 && (n.flags & 128) === 0 && (Pe(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Pe(n), l = n.updateQueue, l !== null && _o(n, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== l && (n.flags |= 2048), e !== null && le(Pl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), In(ct), Pe(n), null;
      case 25:
        return null;
    }
    throw Error(r(156, n.tag));
  }
  function pb(e, n) {
    switch (is(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return In(ct), Re(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return we(n), null;
      case 13:
        if (qn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(r(340));
          Di();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return le(ft), null;
      case 4:
        return Re(), null;
      case 10:
        return In(n.type), null;
      case 22:
      case 23:
        return qn(n), fs(), e !== null && le(Pl), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return In(ct), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zg(e, n) {
    switch (is(n), n.tag) {
      case 3:
        In(ct), Re();
        break;
      case 26:
      case 27:
      case 5:
        we(n);
        break;
      case 4:
        Re();
        break;
      case 13:
        qn(n);
        break;
      case 19:
        le(ft);
        break;
      case 10:
        In(n.type);
        break;
      case 22:
      case 23:
        qn(n), fs(), e !== null && le(Pl);
        break;
      case 24:
        In(ct);
    }
  }
  var hb = {
    getCacheForType: function(e) {
      var n = Rt(ct), l = n.data.get(e);
      return l === void 0 && (l = e(), n.data.set(e, l)), l;
    }
  }, vb = typeof WeakMap == "function" ? WeakMap : Map, We = 0, Qe = null, Ae = null, je = 0, Ue = 0, Gt = null, wl = !1, Xa = !1, lc = !1, Pn = 0, et = 0, El = 0, oa = 0, ac = 0, dn = 0, Za = 0, Wi = null, An = null, ic = !1, rc = 0, Ao = 1 / 0, Do = null, Cl = null, No = !1, ua = null, Ji = 0, oc = 0, uc = null, er = 0, sc = null;
  function Yt() {
    if ((We & 2) !== 0 && je !== 0)
      return je & -je;
    if (C.T !== null) {
      var e = Ha;
      return e !== 0 ? e : vc();
    }
    return gd();
  }
  function Qg() {
    dn === 0 && (dn = (je & 536870912) === 0 || Le ? sd() : 536870912);
    var e = un.current;
    return e !== null && (e.flags |= 32), dn;
  }
  function Dt(e, n, l) {
    (e === Qe && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null) && (Qa(e, 0), Rl(
      e,
      je,
      dn,
      !1
    )), yi(e, l), ((We & 2) === 0 || e !== Qe) && (e === Qe && ((We & 2) === 0 && (oa |= l), et === 4 && Rl(
      e,
      je,
      dn,
      !1
    )), Dn(e));
  }
  function Kg(e, n, l) {
    if ((We & 6) !== 0) throw Error(r(327));
    var o = !l && (n & 60) === 0 && (n & e.expiredLanes) === 0 || vi(e, n), s = o ? Sb(e, n) : mc(e, n, !0), f = o;
    do {
      if (s === 0) {
        Xa && !o && Rl(e, n, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, f && !yb(l)) {
          s = mc(e, n, !1), f = !1;
          continue;
        }
        if (s === 2) {
          if (f = n, e.errorRecoveryDisabledLanes & f)
            var h = 0;
          else
            h = e.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
          if (h !== 0) {
            n = h;
            e: {
              var x = e;
              s = Wi;
              var T = x.current.memoizedState.isDehydrated;
              if (T && (Qa(x, h).flags |= 256), h = mc(
                x,
                h,
                !1
              ), h !== 2) {
                if (lc && !T) {
                  x.errorRecoveryDisabledLanes |= f, oa |= f, s = 4;
                  break e;
                }
                f = An, An = s, f !== null && cc(f);
              }
              s = h;
            }
            if (f = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Qa(e, 0), Rl(e, n, 0, !0);
          break;
        }
        e: {
          switch (o = e, f = s, f) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((n & 4194176) !== n) break;
            case 6:
              Rl(
                o,
                n,
                dn,
                !wl
              );
              break e;
            case 2:
              An = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if (o.finishedWork = l, o.finishedLanes = n, (n & 62914560) === n && (s = rc + 300 - Xe(), 10 < s)) {
            if (Rl(
              o,
              n,
              dn,
              !wl
            ), Br(o, 0) !== 0) break e;
            o.timeoutHandle = Sp(
              Pg.bind(
                null,
                o,
                l,
                An,
                Do,
                ic,
                n,
                dn,
                oa,
                Za,
                wl,
                f,
                2,
                -0,
                0
              ),
              s
            );
            break e;
          }
          Pg(
            o,
            l,
            An,
            Do,
            ic,
            n,
            dn,
            oa,
            Za,
            wl,
            f,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Dn(e);
  }
  function cc(e) {
    An === null ? An = e : An.push.apply(
      An,
      e
    );
  }
  function Pg(e, n, l, o, s, f, h, x, T, D, G, J, F, q) {
    var fe = n.subtreeFlags;
    if ((fe & 8192 || (fe & 16785408) === 16785408) && (rr = { stylesheets: null, count: 0, unsuspend: e1 }, Ug(n), n = n1(), n !== null)) {
      e.cancelPendingCommit = n(
        ap.bind(
          null,
          e,
          l,
          o,
          s,
          h,
          x,
          T,
          G,
          1,
          F,
          q
        )
      ), Rl(e, f, h, !D);
      return;
    }
    ap(
      e,
      l,
      o,
      s,
      h,
      x,
      T,
      G,
      J,
      F,
      q
    );
  }
  function yb(e) {
    for (var n = e; ; ) {
      var l = n.tag;
      if ((l === 0 || l === 11 || l === 15) && n.flags & 16384 && (l = n.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var o = 0; o < l.length; o++) {
          var s = l[o], f = s.getSnapshot;
          s = s.value;
          try {
            if (!Ut(f(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = n.child, n.subtreeFlags & 16384 && l !== null)
        l.return = n, n = l;
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Rl(e, n, l, o) {
    n &= ~ac, n &= ~oa, e.suspendedLanes |= n, e.pingedLanes &= ~n, o && (e.warmLanes |= n), o = e.expirationTimes;
    for (var s = n; 0 < s; ) {
      var f = 31 - kt(s), h = 1 << f;
      o[f] = -1, s &= ~h;
    }
    l !== 0 && fd(e, l, n);
  }
  function jo() {
    return (We & 6) === 0 ? (tr(0), !1) : !0;
  }
  function fc() {
    if (Ae !== null) {
      if (Ue === 0)
        var e = Ae.return;
      else
        e = Ae, Yn = la = null, vs(e), qa = null, ki = 0, e = Ae;
      for (; e !== null; )
        Zg(e.alternate, e), e = e.return;
      Ae = null;
    }
  }
  function Qa(e, n) {
    e.finishedWork = null, e.finishedLanes = 0;
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, Hb(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), fc(), Qe = e, Ae = l = xl(e.current, null), je = n, Ue = 0, Gt = null, wl = !1, Xa = vi(e, n), lc = !1, Za = dn = ac = oa = El = et = 0, An = Wi = null, ic = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= n; 0 < o; ) {
        var s = 31 - kt(o), f = 1 << s;
        n |= e[s], o &= ~f;
      }
    return Pn = n, eo(), l;
  }
  function Wg(e, n) {
    Te = null, C.H = On, n === ji || n === io ? (n = dm(), Ue = 3) : n === sm ? (n = dm(), Ue = 4) : Ue = n === fg ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Gt = n, Ae === null && (et = 1, Eo(
      e,
      an(n, e.current)
    ));
  }
  function Jg() {
    var e = C.H;
    return C.H = On, e === null ? On : e;
  }
  function ep() {
    var e = C.A;
    return C.A = hb, e;
  }
  function dc() {
    et = 4, wl || (je & 4194176) !== je && un.current !== null || (Xa = !0), (El & 134217727) === 0 && (oa & 134217727) === 0 || Qe === null || Rl(
      Qe,
      je,
      dn,
      !1
    );
  }
  function mc(e, n, l) {
    var o = We;
    We |= 2;
    var s = Jg(), f = ep();
    (Qe !== e || je !== n) && (Do = null, Qa(e, n)), n = !1;
    var h = et;
    e: do
      try {
        if (Ue !== 0 && Ae !== null) {
          var x = Ae, T = Gt;
          switch (Ue) {
            case 8:
              fc(), h = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              un.current === null && (n = !0);
              var D = Ue;
              if (Ue = 0, Gt = null, Ka(e, x, T, D), l && Xa) {
                h = 0;
                break e;
              }
              break;
            default:
              D = Ue, Ue = 0, Gt = null, Ka(e, x, T, D);
          }
        }
        bb(), h = et;
        break;
      } catch (G) {
        Wg(e, G);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Yn = la = null, We = o, C.H = s, C.A = f, Ae === null && (Qe = null, je = 0, eo()), h;
  }
  function bb() {
    for (; Ae !== null; ) tp(Ae);
  }
  function Sb(e, n) {
    var l = We;
    We |= 2;
    var o = Jg(), s = ep();
    Qe !== e || je !== n ? (Do = null, Ao = Xe() + 500, Qa(e, n)) : Xa = vi(
      e,
      n
    );
    e: do
      try {
        if (Ue !== 0 && Ae !== null) {
          n = Ae;
          var f = Gt;
          t: switch (Ue) {
            case 1:
              Ue = 0, Gt = null, Ka(e, n, f, 1);
              break;
            case 2:
            case 9:
              if (cm(f)) {
                Ue = 0, Gt = null, np(n);
                break;
              }
              n = function() {
                Ue !== 2 && Ue !== 9 || Qe !== e || (Ue = 7), Dn(e);
              }, f.then(n, n);
              break e;
            case 3:
              Ue = 7;
              break e;
            case 4:
              Ue = 5;
              break e;
            case 7:
              cm(f) ? (Ue = 0, Gt = null, np(n)) : (Ue = 0, Gt = null, Ka(e, n, f, 7));
              break;
            case 5:
              var h = null;
              switch (Ae.tag) {
                case 26:
                  h = Ae.memoizedState;
                case 5:
                case 27:
                  var x = Ae;
                  if (!h || Dp(h)) {
                    Ue = 0, Gt = null;
                    var T = x.sibling;
                    if (T !== null) Ae = T;
                    else {
                      var D = x.return;
                      D !== null ? (Ae = D, zo(D)) : Ae = null;
                    }
                    break t;
                  }
              }
              Ue = 0, Gt = null, Ka(e, n, f, 5);
              break;
            case 6:
              Ue = 0, Gt = null, Ka(e, n, f, 6);
              break;
            case 8:
              fc(), et = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        xb();
        break;
      } catch (G) {
        Wg(e, G);
      }
    while (!0);
    return Yn = la = null, C.H = o, C.A = s, We = l, Ae !== null ? 0 : (Qe = null, je = 0, eo(), et);
  }
  function xb() {
    for (; Ae !== null && !Wt(); )
      tp(Ae);
  }
  function tp(e) {
    var n = Eg(e.alternate, e, Pn);
    e.memoizedProps = e.pendingProps, n === null ? zo(e) : Ae = n;
  }
  function np(e) {
    var n = e, l = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = vg(
          l,
          n,
          n.pendingProps,
          n.type,
          void 0,
          je
        );
        break;
      case 11:
        n = vg(
          l,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          je
        );
        break;
      case 5:
        vs(n);
      default:
        Zg(l, n), n = Ae = Yg(n, Pn), n = Eg(l, n, Pn);
    }
    e.memoizedProps = e.pendingProps, n === null ? zo(e) : Ae = n;
  }
  function Ka(e, n, l, o) {
    Yn = la = null, vs(n), qa = null, ki = 0;
    var s = n.return;
    try {
      if (sb(
        e,
        s,
        n,
        l,
        je
      )) {
        et = 1, Eo(
          e,
          an(l, e.current)
        ), Ae = null;
        return;
      }
    } catch (f) {
      if (s !== null) throw Ae = s, f;
      et = 1, Eo(
        e,
        an(l, e.current)
      ), Ae = null;
      return;
    }
    n.flags & 32768 ? (Le || o === 1 ? e = !0 : Xa || (je & 536870912) !== 0 ? e = !1 : (wl = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = un.current, o !== null && o.tag === 13 && (o.flags |= 16384))), lp(n, e)) : zo(n);
  }
  function zo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        lp(
          n,
          wl
        );
        return;
      }
      e = n.return;
      var l = gb(
        n.alternate,
        n,
        Pn
      );
      if (l !== null) {
        Ae = l;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ae = n;
        return;
      }
      Ae = n = e;
    } while (n !== null);
    et === 0 && (et = 5);
  }
  function lp(e, n) {
    do {
      var l = pb(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, Ae = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !n && (e = e.sibling, e !== null)) {
        Ae = e;
        return;
      }
      Ae = e = l;
    } while (e !== null);
    et = 6, Ae = null;
  }
  function ap(e, n, l, o, s, f, h, x, T, D, G) {
    var J = C.T, F = I.p;
    try {
      I.p = 2, C.T = null, wb(
        e,
        n,
        l,
        o,
        F,
        s,
        f,
        h,
        x,
        T,
        D,
        G
      );
    } finally {
      C.T = J, I.p = F;
    }
  }
  function wb(e, n, l, o, s, f, h, x) {
    do
      Pa();
    while (ua !== null);
    if ((We & 6) !== 0) throw Error(r(327));
    var T = e.finishedWork;
    if (o = e.finishedLanes, T === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, T === e.current) throw Error(r(177));
    e.callbackNode = null, e.callbackPriority = 0, e.cancelPendingCommit = null;
    var D = T.lanes | T.childLanes;
    if (D |= ns, ey(
      e,
      o,
      D,
      f,
      h,
      x
    ), e === Qe && (Ae = Qe = null, je = 0), (T.subtreeFlags & 10256) === 0 && (T.flags & 10256) === 0 || No || (No = !0, oc = D, uc = l, Tb(Lt, function() {
      return Pa(), null;
    })), l = (T.flags & 15990) !== 0, (T.subtreeFlags & 15990) !== 0 || l ? (l = C.T, C.T = null, f = I.p, I.p = 2, h = We, We |= 4, fb(e, T), Fg(T, e), Iy(Rc, e.containerInfo), Io = !!Cc, Rc = Cc = null, e.current = T, zg(e, T.alternate, T), Ul(), We = h, I.p = f, C.T = l) : e.current = T, No ? (No = !1, ua = e, Ji = o) : ip(e, D), D = e.pendingLanes, D === 0 && (Cl = null), Q0(T.stateNode), Dn(e), n !== null)
      for (s = e.onRecoverableError, T = 0; T < n.length; T++)
        D = n[T], s(D.value, {
          componentStack: D.stack
        });
    return (Ji & 3) !== 0 && Pa(), D = e.pendingLanes, (o & 4194218) !== 0 && (D & 42) !== 0 ? e === sc ? er++ : (er = 0, sc = e) : er = 0, tr(0), null;
  }
  function ip(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, $i(n)));
  }
  function Pa() {
    if (ua !== null) {
      var e = ua, n = oc;
      oc = 0;
      var l = md(Ji), o = C.T, s = I.p;
      try {
        if (I.p = 32 > l ? 32 : l, C.T = null, ua === null)
          var f = !1;
        else {
          l = uc, uc = null;
          var h = ua, x = Ji;
          if (ua = null, Ji = 0, (We & 6) !== 0)
            throw Error(r(331));
          var T = We;
          if (We |= 4, qg(h.current), kg(h, h.current, x, l), We = T, tr(0, !1), Et && typeof Et.onPostCommitFiberRoot == "function")
            try {
              Et.onPostCommitFiberRoot(vn, h);
            } catch {
            }
          f = !0;
        }
        return f;
      } finally {
        I.p = s, C.T = o, ip(e, n);
      }
    }
    return !1;
  }
  function rp(e, n, l) {
    n = an(l, n), n = Ds(e.stateNode, n, 2), e = vl(e, n, 2), e !== null && (yi(e, 2), Dn(e));
  }
  function Ze(e, n, l) {
    if (e.tag === 3)
      rp(e, e, l);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          rp(
            n,
            e,
            l
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Cl === null || !Cl.has(o))) {
            e = an(l, e), l = sg(2), o = vl(n, l, 2), o !== null && (cg(
              l,
              o,
              n,
              e
            ), yi(o, 2), Dn(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function gc(e, n, l) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new vb();
      var s = /* @__PURE__ */ new Set();
      o.set(n, s);
    } else
      s = o.get(n), s === void 0 && (s = /* @__PURE__ */ new Set(), o.set(n, s));
    s.has(l) || (lc = !0, s.add(l), e = Eb.bind(null, e, n, l), n.then(e, e));
  }
  function Eb(e, n, l) {
    var o = e.pingCache;
    o !== null && o.delete(n), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Qe === e && (je & l) === l && (et === 4 || et === 3 && (je & 62914560) === je && 300 > Xe() - rc ? (We & 2) === 0 && Qa(e, 0) : ac |= l, Za === je && (Za = 0)), Dn(e);
  }
  function op(e, n) {
    n === 0 && (n = cd()), e = sl(e, n), e !== null && (yi(e, n), Dn(e));
  }
  function Cb(e) {
    var n = e.memoizedState, l = 0;
    n !== null && (l = n.retryLane), op(e, l);
  }
  function Rb(e, n) {
    var l = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode, s = e.memoizedState;
        s !== null && (l = s.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      case 22:
        o = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    o !== null && o.delete(n), op(e, l);
  }
  function Tb(e, n) {
    return Pt(e, n);
  }
  var $o = null, Wa = null, pc = !1, Lo = !1, hc = !1, sa = 0;
  function Dn(e) {
    e !== Wa && e.next === null && (Wa === null ? $o = Wa = e : Wa = Wa.next = e), Lo = !0, pc || (pc = !0, Ob(Mb));
  }
  function tr(e, n) {
    if (!hc && Lo) {
      hc = !0;
      do
        for (var l = !1, o = $o; o !== null; ) {
          if (e !== 0) {
            var s = o.pendingLanes;
            if (s === 0) var f = 0;
            else {
              var h = o.suspendedLanes, x = o.pingedLanes;
              f = (1 << 31 - kt(42 | e) + 1) - 1, f &= s & ~(h & ~x), f = f & 201326677 ? f & 201326677 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (l = !0, cp(o, f));
          } else
            f = je, f = Br(
              o,
              o === Qe ? f : 0
            ), (f & 3) === 0 || vi(o, f) || (l = !0, cp(o, f));
          o = o.next;
        }
      while (l);
      hc = !1;
    }
  }
  function Mb() {
    Lo = pc = !1;
    var e = 0;
    sa !== 0 && (Lb() && (e = sa), sa = 0);
    for (var n = Xe(), l = null, o = $o; o !== null; ) {
      var s = o.next, f = up(o, n);
      f === 0 ? (o.next = null, l === null ? $o = s : l.next = s, s === null && (Wa = l)) : (l = o, (e !== 0 || (f & 3) !== 0) && (Lo = !0)), o = s;
    }
    tr(e);
  }
  function up(e, n) {
    for (var l = e.suspendedLanes, o = e.pingedLanes, s = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var h = 31 - kt(f), x = 1 << h, T = s[h];
      T === -1 ? ((x & l) === 0 || (x & o) !== 0) && (s[h] = J0(x, n)) : T <= n && (e.expiredLanes |= x), f &= ~x;
    }
    if (n = Qe, l = je, l = Br(
      e,
      e === n ? l : 0
    ), o = e.callbackNode, l === 0 || e === n && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && Tn(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || vi(e, l)) {
      if (n = l & -l, n === e.callbackPriority) return n;
      switch (o !== null && Tn(o), md(l)) {
        case 2:
        case 8:
          l = bt;
          break;
        case 32:
          l = Lt;
          break;
        case 268435456:
          l = hi;
          break;
        default:
          l = Lt;
      }
      return o = sp.bind(null, e), l = Pt(l, o), e.callbackPriority = n, e.callbackNode = l, n;
    }
    return o !== null && o !== null && Tn(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function sp(e, n) {
    var l = e.callbackNode;
    if (Pa() && e.callbackNode !== l)
      return null;
    var o = je;
    return o = Br(
      e,
      e === Qe ? o : 0
    ), o === 0 ? null : (Kg(e, o, n), up(e, Xe()), e.callbackNode != null && e.callbackNode === l ? sp.bind(null, e) : null);
  }
  function cp(e, n) {
    if (Pa()) return null;
    Kg(e, n, !0);
  }
  function Ob(e) {
    Fb(function() {
      (We & 6) !== 0 ? Pt(nt, e) : e();
    });
  }
  function vc() {
    return sa === 0 && (sa = sd()), sa;
  }
  function fp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Xr("" + e);
  }
  function dp(e, n) {
    var l = n.ownerDocument.createElement("input");
    return l.name = n.name, l.value = n.value, e.id && l.setAttribute("form", e.id), n.parentNode.insertBefore(l, n), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function _b(e, n, l, o, s) {
    if (n === "submit" && l && l.stateNode === s) {
      var f = fp(
        (s[Ht] || null).action
      ), h = o.submitter;
      h && (n = (n = h[Ht] || null) ? fp(n.formAction) : h.getAttribute("formAction"), n !== null && (f = n, h = null));
      var x = new Pr(
        "action",
        "action",
        null,
        o,
        s
      );
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (sa !== 0) {
                  var T = h ? dp(s, h) : new FormData(s);
                  Ts(
                    l,
                    {
                      pending: !0,
                      data: T,
                      method: s.method,
                      action: f
                    },
                    null,
                    T
                  );
                }
              } else
                typeof f == "function" && (x.preventDefault(), T = h ? dp(s, h) : new FormData(s), Ts(
                  l,
                  {
                    pending: !0,
                    data: T,
                    method: s.method,
                    action: f
                  },
                  f,
                  T
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var yc = 0; yc < lm.length; yc++) {
    var bc = lm[yc], Ab = bc.toLowerCase(), Db = bc[0].toUpperCase() + bc.slice(1);
    yn(
      Ab,
      "on" + Db
    );
  }
  yn(Wd, "onAnimationEnd"), yn(Jd, "onAnimationIteration"), yn(em, "onAnimationStart"), yn("dblclick", "onDoubleClick"), yn("focusin", "onFocus"), yn("focusout", "onBlur"), yn(Zy, "onTransitionRun"), yn(Qy, "onTransitionStart"), yn(Ky, "onTransitionCancel"), yn(tm, "onTransitionEnd"), Ra("onMouseEnter", ["mouseout", "mouseover"]), Ra("onMouseLeave", ["mouseout", "mouseover"]), Ra("onPointerEnter", ["pointerout", "pointerover"]), Ra("onPointerLeave", ["pointerout", "pointerover"]), Gl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Gl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Gl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Gl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Gl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Gl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var nr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Nb = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(nr)
  );
  function mp(e, n) {
    n = (n & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var o = e[l], s = o.event;
      o = o.listeners;
      e: {
        var f = void 0;
        if (n)
          for (var h = o.length - 1; 0 <= h; h--) {
            var x = o[h], T = x.instance, D = x.currentTarget;
            if (x = x.listener, T !== f && s.isPropagationStopped())
              break e;
            f = x, s.currentTarget = D;
            try {
              f(s);
            } catch (G) {
              wo(G);
            }
            s.currentTarget = null, f = T;
          }
        else
          for (h = 0; h < o.length; h++) {
            if (x = o[h], T = x.instance, D = x.currentTarget, x = x.listener, T !== f && s.isPropagationStopped())
              break e;
            f = x, s.currentTarget = D;
            try {
              f(s);
            } catch (G) {
              wo(G);
            }
            s.currentTarget = null, f = T;
          }
      }
    }
  }
  function De(e, n) {
    var l = n[$u];
    l === void 0 && (l = n[$u] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    l.has(o) || (gp(n, e, 2, !1), l.add(o));
  }
  function Sc(e, n, l) {
    var o = 0;
    n && (o |= 4), gp(
      l,
      e,
      o,
      n
    );
  }
  var Ho = "_reactListening" + Math.random().toString(36).slice(2);
  function xc(e) {
    if (!e[Ho]) {
      e[Ho] = !0, hd.forEach(function(l) {
        l !== "selectionchange" && (Nb.has(l) || Sc(l, !1, e), Sc(l, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ho] || (n[Ho] = !0, Sc("selectionchange", !1, n));
    }
  }
  function gp(e, n, l, o) {
    switch (Hp(n)) {
      case 2:
        var s = i1;
        break;
      case 8:
        s = r1;
        break;
      default:
        s = $c;
    }
    l = s.bind(
      null,
      n,
      l,
      e
    ), s = void 0, !qu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (s = !0), o ? s !== void 0 ? e.addEventListener(n, l, {
      capture: !0,
      passive: s
    }) : e.addEventListener(n, l, !0) : s !== void 0 ? e.addEventListener(n, l, {
      passive: s
    }) : e.addEventListener(n, l, !1);
  }
  function wc(e, n, l, o, s) {
    var f = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var h = o.tag;
        if (h === 3 || h === 4) {
          var x = o.stateNode.containerInfo;
          if (x === s || x.nodeType === 8 && x.parentNode === s)
            break;
          if (h === 4)
            for (h = o.return; h !== null; ) {
              var T = h.tag;
              if ((T === 3 || T === 4) && (T = h.stateNode.containerInfo, T === s || T.nodeType === 8 && T.parentNode === s))
                return;
              h = h.return;
            }
          for (; x !== null; ) {
            if (h = ql(x), h === null) return;
            if (T = h.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              o = f = h;
              continue e;
            }
            x = x.parentNode;
          }
        }
        o = o.return;
      }
    Od(function() {
      var D = f, G = Uu(l), J = [];
      e: {
        var F = nm.get(e);
        if (F !== void 0) {
          var q = Pr, fe = e;
          switch (e) {
            case "keypress":
              if (Qr(l) === 0) break e;
            case "keydown":
            case "keyup":
              q = Ry;
              break;
            case "focusin":
              fe = "focus", q = Xu;
              break;
            case "focusout":
              fe = "blur", q = Xu;
              break;
            case "beforeblur":
            case "afterblur":
              q = Xu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = Dd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = my;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = Oy;
              break;
            case Wd:
            case Jd:
            case em:
              q = hy;
              break;
            case tm:
              q = Ay;
              break;
            case "scroll":
            case "scrollend":
              q = fy;
              break;
            case "wheel":
              q = Ny;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = yy;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = jd;
              break;
            case "toggle":
            case "beforetoggle":
              q = zy;
          }
          var Ce = (n & 4) !== 0, tt = !Ce && (e === "scroll" || e === "scrollend"), z = Ce ? F !== null ? F + "Capture" : null : F;
          Ce = [];
          for (var A = D, L; A !== null; ) {
            var P = A;
            if (L = P.stateNode, P = P.tag, P !== 5 && P !== 26 && P !== 27 || L === null || z === null || (P = xi(A, z), P != null && Ce.push(
              lr(A, P, L)
            )), tt) break;
            A = A.return;
          }
          0 < Ce.length && (F = new q(
            F,
            fe,
            null,
            l,
            G
          ), J.push({ event: F, listeners: Ce }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (F = e === "mouseover" || e === "pointerover", q = e === "mouseout" || e === "pointerout", F && l !== ku && (fe = l.relatedTarget || l.fromElement) && (ql(fe) || fe[wa]))
            break e;
          if ((q || F) && (F = G.window === G ? G : (F = G.ownerDocument) ? F.defaultView || F.parentWindow : window, q ? (fe = l.relatedTarget || l.toElement, q = D, fe = fe ? ql(fe) : null, fe !== null && (tt = Z(fe), Ce = fe.tag, fe !== tt || Ce !== 5 && Ce !== 27 && Ce !== 6) && (fe = null)) : (q = null, fe = D), q !== fe)) {
            if (Ce = Dd, P = "onMouseLeave", z = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (Ce = jd, P = "onPointerLeave", z = "onPointerEnter", A = "pointer"), tt = q == null ? F : Si(q), L = fe == null ? F : Si(fe), F = new Ce(
              P,
              A + "leave",
              q,
              l,
              G
            ), F.target = tt, F.relatedTarget = L, P = null, ql(G) === D && (Ce = new Ce(
              z,
              A + "enter",
              fe,
              l,
              G
            ), Ce.target = L, Ce.relatedTarget = tt, P = Ce), tt = P, q && fe)
              t: {
                for (Ce = q, z = fe, A = 0, L = Ce; L; L = Ja(L))
                  A++;
                for (L = 0, P = z; P; P = Ja(P))
                  L++;
                for (; 0 < A - L; )
                  Ce = Ja(Ce), A--;
                for (; 0 < L - A; )
                  z = Ja(z), L--;
                for (; A--; ) {
                  if (Ce === z || z !== null && Ce === z.alternate)
                    break t;
                  Ce = Ja(Ce), z = Ja(z);
                }
                Ce = null;
              }
            else Ce = null;
            q !== null && pp(
              J,
              F,
              q,
              Ce,
              !1
            ), fe !== null && tt !== null && pp(
              J,
              tt,
              fe,
              Ce,
              !0
            );
          }
        }
        e: {
          if (F = D ? Si(D) : window, q = F.nodeName && F.nodeName.toLowerCase(), q === "select" || q === "input" && F.type === "file")
            var ce = Ud;
          else if (Vd(F))
            if (Bd)
              ce = Gy;
            else {
              ce = By;
              var Oe = Uy;
            }
          else
            q = F.nodeName, !q || q.toLowerCase() !== "input" || F.type !== "checkbox" && F.type !== "radio" ? D && Vu(D.elementType) && (ce = Ud) : ce = qy;
          if (ce && (ce = ce(e, D))) {
            kd(
              J,
              ce,
              l,
              G
            );
            break e;
          }
          Oe && Oe(e, F, D), e === "focusout" && D && F.type === "number" && D.memoizedProps.value != null && Fu(F, "number", F.value);
        }
        switch (Oe = D ? Si(D) : window, e) {
          case "focusin":
            (Vd(Oe) || Oe.contentEditable === "true") && (Da = Oe, Ju = D, _i = null);
            break;
          case "focusout":
            _i = Ju = Da = null;
            break;
          case "mousedown":
            es = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            es = !1, Kd(J, l, G);
            break;
          case "selectionchange":
            if (Xy) break;
          case "keydown":
          case "keyup":
            Kd(J, l, G);
        }
        var ge;
        if (Qu)
          e: {
            switch (e) {
              case "compositionstart":
                var ye = "onCompositionStart";
                break e;
              case "compositionend":
                ye = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ye = "onCompositionUpdate";
                break e;
            }
            ye = void 0;
          }
        else
          Aa ? Hd(e, l) && (ye = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (ye = "onCompositionStart");
        ye && (zd && l.locale !== "ko" && (Aa || ye !== "onCompositionStart" ? ye === "onCompositionEnd" && Aa && (ge = _d()) : (ul = G, Gu = "value" in ul ? ul.value : ul.textContent, Aa = !0)), Oe = Fo(D, ye), 0 < Oe.length && (ye = new Nd(
          ye,
          e,
          null,
          l,
          G
        ), J.push({ event: ye, listeners: Oe }), ge ? ye.data = ge : (ge = Fd(l), ge !== null && (ye.data = ge)))), (ge = Ly ? Hy(e, l) : Fy(e, l)) && (ye = Fo(D, "onBeforeInput"), 0 < ye.length && (Oe = new Nd(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          G
        ), J.push({
          event: Oe,
          listeners: ye
        }), Oe.data = ge)), _b(
          J,
          e,
          D,
          l,
          G
        );
      }
      mp(J, n);
    });
  }
  function lr(e, n, l) {
    return {
      instance: e,
      listener: n,
      currentTarget: l
    };
  }
  function Fo(e, n) {
    for (var l = n + "Capture", o = []; e !== null; ) {
      var s = e, f = s.stateNode;
      s = s.tag, s !== 5 && s !== 26 && s !== 27 || f === null || (s = xi(e, l), s != null && o.unshift(
        lr(e, s, f)
      ), s = xi(e, n), s != null && o.push(
        lr(e, s, f)
      )), e = e.return;
    }
    return o;
  }
  function Ja(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function pp(e, n, l, o, s) {
    for (var f = n._reactName, h = []; l !== null && l !== o; ) {
      var x = l, T = x.alternate, D = x.stateNode;
      if (x = x.tag, T !== null && T === o) break;
      x !== 5 && x !== 26 && x !== 27 || D === null || (T = D, s ? (D = xi(l, f), D != null && h.unshift(
        lr(l, D, T)
      )) : s || (D = xi(l, f), D != null && h.push(
        lr(l, D, T)
      ))), l = l.return;
    }
    h.length !== 0 && e.push({ event: n, listeners: h });
  }
  var jb = /\r\n?/g, zb = /\u0000|\uFFFD/g;
  function hp(e) {
    return (typeof e == "string" ? e : "" + e).replace(jb, `
`).replace(zb, "");
  }
  function vp(e, n) {
    return n = hp(n), hp(e) === n;
  }
  function Vo() {
  }
  function Ye(e, n, l, o, s, f) {
    switch (l) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Ma(e, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Ma(e, "" + o);
        break;
      case "className":
        Gr(e, "class", o);
        break;
      case "tabIndex":
        Gr(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Gr(e, l, o);
        break;
      case "style":
        Td(e, o, f);
        break;
      case "data":
        if (n !== "object") {
          Gr(e, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(l);
          break;
        }
        o = Xr("" + o), e.setAttribute(l, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof f == "function" && (l === "formAction" ? (n !== "input" && Ye(e, n, "name", s.name, s, null), Ye(
            e,
            n,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Ye(
            e,
            n,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Ye(
            e,
            n,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Ye(e, n, "encType", s.encType, s, null), Ye(e, n, "method", s.method, s, null), Ye(e, n, "target", s.target, s, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(l);
          break;
        }
        o = Xr("" + o), e.setAttribute(l, o);
        break;
      case "onClick":
        o != null && (e.onclick = Vo);
        break;
      case "onScroll":
        o != null && De("scroll", e);
        break;
      case "onScrollEnd":
        o != null && De("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(r(61));
          if (l = o.__html, l != null) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        e.muted = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = Xr("" + o), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(l, "" + o) : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        o === !0 ? e.setAttribute(l, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(l, o) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? e.setAttribute(l, o) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? e.removeAttribute(l) : e.setAttribute(l, o);
        break;
      case "popover":
        De("beforetoggle", e), De("toggle", e), qr(e, "popover", o);
        break;
      case "xlinkActuate":
        Vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Vn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Vn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Vn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        qr(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = sy.get(l) || l, qr(e, l, o));
    }
  }
  function Ec(e, n, l, o, s, f) {
    switch (l) {
      case "style":
        Td(e, o, f);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(r(61));
          if (l = o.__html, l != null) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Ma(e, o) : (typeof o == "number" || typeof o == "bigint") && Ma(e, "" + o);
        break;
      case "onScroll":
        o != null && De("scroll", e);
        break;
      case "onScrollEnd":
        o != null && De("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = Vo);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!vd.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), n = l.slice(2, s ? l.length - 7 : void 0), f = e[Ht] || null, f = f != null ? f[l] : null, typeof f == "function" && e.removeEventListener(n, f, s), typeof o == "function")) {
              typeof f != "function" && f !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(n, o, s);
              break e;
            }
            l in e ? e[l] = o : o === !0 ? e.setAttribute(l, "") : qr(e, l, o);
          }
    }
  }
  function wt(e, n, l) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        De("error", e), De("load", e);
        var o = !1, s = !1, f;
        for (f in l)
          if (l.hasOwnProperty(f)) {
            var h = l[f];
            if (h != null)
              switch (f) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, n));
                default:
                  Ye(e, n, f, h, l, null);
              }
          }
        s && Ye(e, n, "srcSet", l.srcSet, l, null), o && Ye(e, n, "src", l.src, l, null);
        return;
      case "input":
        De("invalid", e);
        var x = f = h = s = null, T = null, D = null;
        for (o in l)
          if (l.hasOwnProperty(o)) {
            var G = l[o];
            if (G != null)
              switch (o) {
                case "name":
                  s = G;
                  break;
                case "type":
                  h = G;
                  break;
                case "checked":
                  T = G;
                  break;
                case "defaultChecked":
                  D = G;
                  break;
                case "value":
                  f = G;
                  break;
                case "defaultValue":
                  x = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(r(137, n));
                  break;
                default:
                  Ye(e, n, o, G, l, null);
              }
          }
        wd(
          e,
          f,
          x,
          T,
          D,
          h,
          s,
          !1
        ), Yr(e);
        return;
      case "select":
        De("invalid", e), o = h = f = null;
        for (s in l)
          if (l.hasOwnProperty(s) && (x = l[s], x != null))
            switch (s) {
              case "value":
                f = x;
                break;
              case "defaultValue":
                h = x;
                break;
              case "multiple":
                o = x;
              default:
                Ye(e, n, s, x, l, null);
            }
        n = f, l = h, e.multiple = !!o, n != null ? Ta(e, !!o, n, !1) : l != null && Ta(e, !!o, l, !0);
        return;
      case "textarea":
        De("invalid", e), f = s = o = null;
        for (h in l)
          if (l.hasOwnProperty(h) && (x = l[h], x != null))
            switch (h) {
              case "value":
                o = x;
                break;
              case "defaultValue":
                s = x;
                break;
              case "children":
                f = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(r(91));
                break;
              default:
                Ye(e, n, h, x, l, null);
            }
        Cd(e, o, s, f), Yr(e);
        return;
      case "option":
        for (T in l)
          if (l.hasOwnProperty(T) && (o = l[T], o != null))
            switch (T) {
              case "selected":
                e.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Ye(e, n, T, o, l, null);
            }
        return;
      case "dialog":
        De("cancel", e), De("close", e);
        break;
      case "iframe":
      case "object":
        De("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < nr.length; o++)
          De(nr[o], e);
        break;
      case "image":
        De("error", e), De("load", e);
        break;
      case "details":
        De("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        De("error", e), De("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (D in l)
          if (l.hasOwnProperty(D) && (o = l[D], o != null))
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, n));
              default:
                Ye(e, n, D, o, l, null);
            }
        return;
      default:
        if (Vu(n)) {
          for (G in l)
            l.hasOwnProperty(G) && (o = l[G], o !== void 0 && Ec(
              e,
              n,
              G,
              o,
              l,
              void 0
            ));
          return;
        }
    }
    for (x in l)
      l.hasOwnProperty(x) && (o = l[x], o != null && Ye(e, n, x, o, l, null));
  }
  function $b(e, n, l, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, f = null, h = null, x = null, T = null, D = null, G = null;
        for (q in l) {
          var J = l[q];
          if (l.hasOwnProperty(q) && J != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = J;
              default:
                o.hasOwnProperty(q) || Ye(e, n, q, null, o, J);
            }
        }
        for (var F in o) {
          var q = o[F];
          if (J = l[F], o.hasOwnProperty(F) && (q != null || J != null))
            switch (F) {
              case "type":
                f = q;
                break;
              case "name":
                s = q;
                break;
              case "checked":
                D = q;
                break;
              case "defaultChecked":
                G = q;
                break;
              case "value":
                h = q;
                break;
              case "defaultValue":
                x = q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null)
                  throw Error(r(137, n));
                break;
              default:
                q !== J && Ye(
                  e,
                  n,
                  F,
                  q,
                  o,
                  J
                );
            }
        }
        Hu(
          e,
          h,
          x,
          T,
          D,
          G,
          f,
          s
        );
        return;
      case "select":
        q = h = x = F = null;
        for (f in l)
          if (T = l[f], l.hasOwnProperty(f) && T != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                q = T;
              default:
                o.hasOwnProperty(f) || Ye(
                  e,
                  n,
                  f,
                  null,
                  o,
                  T
                );
            }
        for (s in o)
          if (f = o[s], T = l[s], o.hasOwnProperty(s) && (f != null || T != null))
            switch (s) {
              case "value":
                F = f;
                break;
              case "defaultValue":
                x = f;
                break;
              case "multiple":
                h = f;
              default:
                f !== T && Ye(
                  e,
                  n,
                  s,
                  f,
                  o,
                  T
                );
            }
        n = x, l = h, o = q, F != null ? Ta(e, !!l, F, !1) : !!o != !!l && (n != null ? Ta(e, !!l, n, !0) : Ta(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        q = F = null;
        for (x in l)
          if (s = l[x], l.hasOwnProperty(x) && s != null && !o.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ye(e, n, x, null, o, s);
            }
        for (h in o)
          if (s = o[h], f = l[h], o.hasOwnProperty(h) && (s != null || f != null))
            switch (h) {
              case "value":
                F = s;
                break;
              case "defaultValue":
                q = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== f && Ye(e, n, h, s, o, f);
            }
        Ed(e, F, q);
        return;
      case "option":
        for (var fe in l)
          if (F = l[fe], l.hasOwnProperty(fe) && F != null && !o.hasOwnProperty(fe))
            switch (fe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ye(
                  e,
                  n,
                  fe,
                  null,
                  o,
                  F
                );
            }
        for (T in o)
          if (F = o[T], q = l[T], o.hasOwnProperty(T) && F !== q && (F != null || q != null))
            switch (T) {
              case "selected":
                e.selected = F && typeof F != "function" && typeof F != "symbol";
                break;
              default:
                Ye(
                  e,
                  n,
                  T,
                  F,
                  o,
                  q
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Ce in l)
          F = l[Ce], l.hasOwnProperty(Ce) && F != null && !o.hasOwnProperty(Ce) && Ye(e, n, Ce, null, o, F);
        for (D in o)
          if (F = o[D], q = l[D], o.hasOwnProperty(D) && F !== q && (F != null || q != null))
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null)
                  throw Error(r(137, n));
                break;
              default:
                Ye(
                  e,
                  n,
                  D,
                  F,
                  o,
                  q
                );
            }
        return;
      default:
        if (Vu(n)) {
          for (var tt in l)
            F = l[tt], l.hasOwnProperty(tt) && F !== void 0 && !o.hasOwnProperty(tt) && Ec(
              e,
              n,
              tt,
              void 0,
              o,
              F
            );
          for (G in o)
            F = o[G], q = l[G], !o.hasOwnProperty(G) || F === q || F === void 0 && q === void 0 || Ec(
              e,
              n,
              G,
              F,
              o,
              q
            );
          return;
        }
    }
    for (var z in l)
      F = l[z], l.hasOwnProperty(z) && F != null && !o.hasOwnProperty(z) && Ye(e, n, z, null, o, F);
    for (J in o)
      F = o[J], q = l[J], !o.hasOwnProperty(J) || F === q || F == null && q == null || Ye(e, n, J, F, o, q);
  }
  var Cc = null, Rc = null;
  function ko(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function yp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function bp(e, n) {
    if (e === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function Tc(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Mc = null;
  function Lb() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Mc ? !1 : (Mc = e, !0) : (Mc = null, !1);
  }
  var Sp = typeof setTimeout == "function" ? setTimeout : void 0, Hb = typeof clearTimeout == "function" ? clearTimeout : void 0, xp = typeof Promise == "function" ? Promise : void 0, Fb = typeof queueMicrotask == "function" ? queueMicrotask : typeof xp < "u" ? function(e) {
    return xp.resolve(null).then(e).catch(Vb);
  } : Sp;
  function Vb(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Oc(e, n) {
    var l = n, o = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$") {
          if (o === 0) {
            e.removeChild(s), fr(n);
            return;
          }
          o--;
        } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = s;
    } while (l);
    fr(n);
  }
  function _c(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var l = n;
      switch (n = n.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _c(l), Lu(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function kb(e, n, l, o) {
    for (; e.nodeType === 1; ) {
      var s = l;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[bi])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (f !== s.rel || e.getAttribute("href") !== (s.href == null ? null : s.href) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || e.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (s.src == null ? null : s.src) || e.getAttribute("type") !== (s.type == null ? null : s.type) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var f = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = xn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Ub(e, n, l) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = xn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ac(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState === "complete";
  }
  function Bb(e, n) {
    var l = e.ownerDocument;
    if (e.data !== "$?" || l.readyState === "complete")
      n();
    else {
      var o = function() {
        n(), l.removeEventListener("DOMContentLoaded", o);
      };
      l.addEventListener("DOMContentLoaded", o), e._reactRetry = o;
    }
  }
  function xn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = e.data, n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
          break;
        if (n === "/$") return null;
      }
    }
    return e;
  }
  function wp(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (n === 0) return e;
          n--;
        } else l === "/$" && n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Ep(e, n, l) {
    switch (n = ko(l), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(r(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(r(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  var mn = /* @__PURE__ */ new Map(), Cp = /* @__PURE__ */ new Set();
  function Uo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.ownerDocument;
  }
  var Wn = I.d;
  I.d = {
    f: qb,
    r: Gb,
    D: Yb,
    C: Ib,
    L: Xb,
    m: Zb,
    X: Kb,
    S: Qb,
    M: Pb
  };
  function qb() {
    var e = Wn.f(), n = jo();
    return e || n;
  }
  function Gb(e) {
    var n = Ea(e);
    n !== null && n.tag === 5 && n.type === "form" ? Xm(n) : Wn.r(e);
  }
  var ei = typeof document > "u" ? null : document;
  function Rp(e, n, l) {
    var o = ei;
    if (o && typeof n == "string" && n) {
      var s = nn(n);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), Cp.has(s) || (Cp.add(s), e = { rel: e, crossOrigin: l, href: n }, o.querySelector(s) === null && (n = o.createElement("link"), wt(n, "link", e), mt(n), o.head.appendChild(n)));
    }
  }
  function Yb(e) {
    Wn.D(e), Rp("dns-prefetch", e, null);
  }
  function Ib(e, n) {
    Wn.C(e, n), Rp("preconnect", e, n);
  }
  function Xb(e, n, l) {
    Wn.L(e, n, l);
    var o = ei;
    if (o && e && n) {
      var s = 'link[rel="preload"][as="' + nn(n) + '"]';
      n === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + nn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + nn(
        l.imageSizes
      ) + '"]')) : s += '[href="' + nn(e) + '"]';
      var f = s;
      switch (n) {
        case "style":
          f = ti(e);
          break;
        case "script":
          f = ni(e);
      }
      mn.has(f) || (e = _(
        {
          rel: "preload",
          href: n === "image" && l && l.imageSrcSet ? void 0 : e,
          as: n
        },
        l
      ), mn.set(f, e), o.querySelector(s) !== null || n === "style" && o.querySelector(ar(f)) || n === "script" && o.querySelector(ir(f)) || (n = o.createElement("link"), wt(n, "link", e), mt(n), o.head.appendChild(n)));
    }
  }
  function Zb(e, n) {
    Wn.m(e, n);
    var l = ei;
    if (l && e) {
      var o = n && typeof n.as == "string" ? n.as : "script", s = 'link[rel="modulepreload"][as="' + nn(o) + '"][href="' + nn(e) + '"]', f = s;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ni(e);
      }
      if (!mn.has(f) && (e = _({ rel: "modulepreload", href: e }, n), mn.set(f, e), l.querySelector(s) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(ir(f)))
              return;
        }
        o = l.createElement("link"), wt(o, "link", e), mt(o), l.head.appendChild(o);
      }
    }
  }
  function Qb(e, n, l) {
    Wn.S(e, n, l);
    var o = ei;
    if (o && e) {
      var s = Ca(o).hoistableStyles, f = ti(e);
      n = n || "default";
      var h = s.get(f);
      if (!h) {
        var x = { loading: 0, preload: null };
        if (h = o.querySelector(
          ar(f)
        ))
          x.loading = 5;
        else {
          e = _(
            { rel: "stylesheet", href: e, "data-precedence": n },
            l
          ), (l = mn.get(f)) && Dc(e, l);
          var T = h = o.createElement("link");
          mt(T), wt(T, "link", e), T._p = new Promise(function(D, G) {
            T.onload = D, T.onerror = G;
          }), T.addEventListener("load", function() {
            x.loading |= 1;
          }), T.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, Bo(h, n, o);
        }
        h = {
          type: "stylesheet",
          instance: h,
          count: 1,
          state: x
        }, s.set(f, h);
      }
    }
  }
  function Kb(e, n) {
    Wn.X(e, n);
    var l = ei;
    if (l && e) {
      var o = Ca(l).hoistableScripts, s = ni(e), f = o.get(s);
      f || (f = l.querySelector(ir(s)), f || (e = _({ src: e, async: !0 }, n), (n = mn.get(s)) && Nc(e, n), f = l.createElement("script"), mt(f), wt(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, o.set(s, f));
    }
  }
  function Pb(e, n) {
    Wn.M(e, n);
    var l = ei;
    if (l && e) {
      var o = Ca(l).hoistableScripts, s = ni(e), f = o.get(s);
      f || (f = l.querySelector(ir(s)), f || (e = _({ src: e, async: !0, type: "module" }, n), (n = mn.get(s)) && Nc(e, n), f = l.createElement("script"), mt(f), wt(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, o.set(s, f));
    }
  }
  function Tp(e, n, l, o) {
    var s = (s = qe.current) ? Uo(s) : null;
    if (!s) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (n = ti(l.href), l = Ca(
          s
        ).hoistableStyles, o = l.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = ti(l.href);
          var f = Ca(
            s
          ).hoistableStyles, h = f.get(e);
          if (h || (s = s.ownerDocument || s, h = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, h), (f = s.querySelector(
            ar(e)
          )) && !f._p && (h.instance = f, h.state.loading = 5), mn.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, mn.set(e, l), f || Wb(
            s,
            e,
            l,
            h.state
          ))), n && o === null)
            throw Error(r(528, ""));
          return h;
        }
        if (n && o !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return n = l.async, l = l.src, typeof l == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ni(l), l = Ca(
          s
        ).hoistableScripts, o = l.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, e));
    }
  }
  function ti(e) {
    return 'href="' + nn(e) + '"';
  }
  function ar(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Mp(e) {
    return _({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Wb(e, n, l, o) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = e.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), wt(n, "link", l), mt(n), e.head.appendChild(n));
  }
  function ni(e) {
    return '[src="' + nn(e) + '"]';
  }
  function ir(e) {
    return "script[async]" + e;
  }
  function Op(e, n, l) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + nn(l.href) + '"]'
          );
          if (o)
            return n.instance = o, mt(o), o;
          var s = _({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), mt(o), wt(o, "style", s), Bo(o, l.precedence, e), n.instance = o;
        case "stylesheet":
          s = ti(l.href);
          var f = e.querySelector(
            ar(s)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, mt(f), f;
          o = Mp(l), (s = mn.get(s)) && Dc(o, s), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var h = f;
          return h._p = new Promise(function(x, T) {
            h.onload = x, h.onerror = T;
          }), wt(f, "link", o), n.state.loading |= 4, Bo(f, l.precedence, e), n.instance = f;
        case "script":
          return f = ni(l.src), (s = e.querySelector(
            ir(f)
          )) ? (n.instance = s, mt(s), s) : (o = l, (s = mn.get(f)) && (o = _({}, l), Nc(o, s)), e = e.ownerDocument || e, s = e.createElement("script"), mt(s), wt(s, "link", o), e.head.appendChild(s), n.instance = s);
        case "void":
          return null;
        default:
          throw Error(r(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Bo(o, l.precedence, e));
    return n.instance;
  }
  function Bo(e, n, l) {
    for (var o = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = o.length ? o[o.length - 1] : null, f = s, h = 0; h < o.length; h++) {
      var x = o[h];
      if (x.dataset.precedence === n) f = x;
      else if (f !== s) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = l.nodeType === 9 ? l.head : l, n.insertBefore(e, n.firstChild));
  }
  function Dc(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Nc(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var qo = null;
  function _p(e, n, l) {
    if (qo === null) {
      var o = /* @__PURE__ */ new Map(), s = qo = /* @__PURE__ */ new Map();
      s.set(l, o);
    } else
      s = qo, o = s.get(l), o || (o = /* @__PURE__ */ new Map(), s.set(l, o));
    if (o.has(e)) return o;
    for (o.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var f = l[s];
      if (!(f[bi] || f[Ct] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = f.getAttribute(n) || "";
        h = e + h;
        var x = o.get(h);
        x ? x.push(f) : o.set(h, [f]);
      }
    }
    return o;
  }
  function Ap(e, n, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Jb(e, n, l) {
    if (l === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return e = n.disabled, typeof n.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Dp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var rr = null;
  function e1() {
  }
  function t1(e, n, l) {
    if (rr === null) throw Error(r(475));
    var o = rr;
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = ti(l.href), f = e.querySelector(
          ar(s)
        );
        if (f) {
          e = f._p, e !== null && typeof e == "object" && typeof e.then == "function" && (o.count++, o = Go.bind(o), e.then(o, o)), n.state.loading |= 4, n.instance = f, mt(f);
          return;
        }
        f = e.ownerDocument || e, l = Mp(l), (s = mn.get(s)) && Dc(l, s), f = f.createElement("link"), mt(f);
        var h = f;
        h._p = new Promise(function(x, T) {
          h.onload = x, h.onerror = T;
        }), wt(f, "link", l), n.instance = f;
      }
      o.stylesheets === null && (o.stylesheets = /* @__PURE__ */ new Map()), o.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (o.count++, n = Go.bind(o), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  function n1() {
    if (rr === null) throw Error(r(475));
    var e = rr;
    return e.stylesheets && e.count === 0 && jc(e, e.stylesheets), 0 < e.count ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && jc(e, e.stylesheets), e.unsuspend) {
          var o = e.unsuspend;
          e.unsuspend = null, o();
        }
      }, 6e4);
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l);
      };
    } : null;
  }
  function Go() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) jc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Yo = null;
  function jc(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Yo = /* @__PURE__ */ new Map(), n.forEach(l1, e), Yo = null, Go.call(e));
  }
  function l1(e, n) {
    if (!(n.state.loading & 4)) {
      var l = Yo.get(e);
      if (l) var o = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Yo.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < s.length; f++) {
          var h = s[f];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (l.set(h.dataset.precedence, h), o = h);
        }
        o && l.set(null, o);
      }
      s = n.instance, h = s.getAttribute("data-precedence"), f = l.get(h) || o, f === o && l.set(null, s), l.set(h, s), this.count++, o = Go.bind(this), s.addEventListener("load", o), s.addEventListener("error", o), f ? f.parentNode.insertBefore(s, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), n.state.loading |= 4;
    }
  }
  var or = {
    $$typeof: y,
    Provider: null,
    Consumer: null,
    _currentValue: de,
    _currentValue2: de,
    _threadCount: 0
  };
  function a1(e, n, l, o, s, f, h, x) {
    this.tag = 1, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = zu(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zu(0), this.hiddenUpdates = zu(null), this.identifierPrefix = o, this.onUncaughtError = s, this.onCaughtError = f, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Np(e, n, l, o, s, f, h, x, T, D, G, J) {
    return e = new a1(
      e,
      n,
      l,
      h,
      x,
      T,
      D,
      J
    ), n = 1, f === !0 && (n |= 24), f = fn(3, null, null, n), e.current = f, f.stateNode = e, n = us(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: o,
      isDehydrated: l,
      cache: n
    }, Gs(f), e;
  }
  function jp(e) {
    return e ? (e = za, e) : za;
  }
  function zp(e, n, l, o, s, f) {
    s = jp(s), o.context === null ? o.context = s : o.pendingContext = s, o = hl(n), o.payload = { element: l }, f = f === void 0 ? null : f, f !== null && (o.callback = f), l = vl(e, o, n), l !== null && (Dt(l, e, n), Gi(l, e, n));
  }
  function $p(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < n ? l : n;
    }
  }
  function zc(e, n) {
    $p(e, n), (e = e.alternate) && $p(e, n);
  }
  function Lp(e) {
    if (e.tag === 13) {
      var n = sl(e, 67108864);
      n !== null && Dt(n, e, 67108864), zc(e, 67108864);
    }
  }
  var Io = !0;
  function i1(e, n, l, o) {
    var s = C.T;
    C.T = null;
    var f = I.p;
    try {
      I.p = 2, $c(e, n, l, o);
    } finally {
      I.p = f, C.T = s;
    }
  }
  function r1(e, n, l, o) {
    var s = C.T;
    C.T = null;
    var f = I.p;
    try {
      I.p = 8, $c(e, n, l, o);
    } finally {
      I.p = f, C.T = s;
    }
  }
  function $c(e, n, l, o) {
    if (Io) {
      var s = Lc(o);
      if (s === null)
        wc(
          e,
          n,
          o,
          Xo,
          l
        ), Fp(e, o);
      else if (u1(
        s,
        e,
        n,
        l,
        o
      ))
        o.stopPropagation();
      else if (Fp(e, o), n & 4 && -1 < o1.indexOf(e)) {
        for (; s !== null; ) {
          var f = Ea(s);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var h = Bl(f.pendingLanes);
                  if (h !== 0) {
                    var x = f;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; h; ) {
                      var T = 1 << 31 - kt(h);
                      x.entanglements[1] |= T, h &= ~T;
                    }
                    Dn(f), (We & 6) === 0 && (Ao = Xe() + 500, tr(0));
                  }
                }
                break;
              case 13:
                x = sl(f, 2), x !== null && Dt(x, f, 2), jo(), zc(f, 2);
            }
          if (f = Lc(o), f === null && wc(
            e,
            n,
            o,
            Xo,
            l
          ), f === s) break;
          s = f;
        }
        s !== null && o.stopPropagation();
      } else
        wc(
          e,
          n,
          o,
          null,
          l
        );
    }
  }
  function Lc(e) {
    return e = Uu(e), Hc(e);
  }
  var Xo = null;
  function Hc(e) {
    if (Xo = null, e = ql(e), e !== null) {
      var n = Z(e);
      if (n === null) e = null;
      else {
        var l = n.tag;
        if (l === 13) {
          if (e = K(n), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return Xo = e, null;
  }
  function Hp(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Jt()) {
          case nt:
            return 2;
          case bt:
            return 8;
          case Lt:
          case pi:
            return 32;
          case hi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Fc = !1, Tl = null, Ml = null, Ol = null, ur = /* @__PURE__ */ new Map(), sr = /* @__PURE__ */ new Map(), _l = [], o1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Fp(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Tl = null;
        break;
      case "dragenter":
      case "dragleave":
        Ml = null;
        break;
      case "mouseover":
      case "mouseout":
        Ol = null;
        break;
      case "pointerover":
      case "pointerout":
        ur.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        sr.delete(n.pointerId);
    }
  }
  function cr(e, n, l, o, s, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: l,
      eventSystemFlags: o,
      nativeEvent: f,
      targetContainers: [s]
    }, n !== null && (n = Ea(n), n !== null && Lp(n)), e) : (e.eventSystemFlags |= o, n = e.targetContainers, s !== null && n.indexOf(s) === -1 && n.push(s), e);
  }
  function u1(e, n, l, o, s) {
    switch (n) {
      case "focusin":
        return Tl = cr(
          Tl,
          e,
          n,
          l,
          o,
          s
        ), !0;
      case "dragenter":
        return Ml = cr(
          Ml,
          e,
          n,
          l,
          o,
          s
        ), !0;
      case "mouseover":
        return Ol = cr(
          Ol,
          e,
          n,
          l,
          o,
          s
        ), !0;
      case "pointerover":
        var f = s.pointerId;
        return ur.set(
          f,
          cr(
            ur.get(f) || null,
            e,
            n,
            l,
            o,
            s
          )
        ), !0;
      case "gotpointercapture":
        return f = s.pointerId, sr.set(
          f,
          cr(
            sr.get(f) || null,
            e,
            n,
            l,
            o,
            s
          )
        ), !0;
    }
    return !1;
  }
  function Vp(e) {
    var n = ql(e.target);
    if (n !== null) {
      var l = Z(n);
      if (l !== null) {
        if (n = l.tag, n === 13) {
          if (n = K(l), n !== null) {
            e.blockedOn = n, ty(e.priority, function() {
              if (l.tag === 13) {
                var o = Yt(), s = sl(l, o);
                s !== null && Dt(s, l, o), zc(l, o);
              }
            });
            return;
          }
        } else if (n === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Zo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var l = Lc(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var o = new l.constructor(
          l.type,
          l
        );
        ku = o, l.target.dispatchEvent(o), ku = null;
      } else
        return n = Ea(l), n !== null && Lp(n), e.blockedOn = l, !1;
      n.shift();
    }
    return !0;
  }
  function kp(e, n, l) {
    Zo(e) && l.delete(n);
  }
  function s1() {
    Fc = !1, Tl !== null && Zo(Tl) && (Tl = null), Ml !== null && Zo(Ml) && (Ml = null), Ol !== null && Zo(Ol) && (Ol = null), ur.forEach(kp), sr.forEach(kp);
  }
  function Qo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Fc || (Fc = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      s1
    )));
  }
  var Ko = null;
  function Up(e) {
    Ko !== e && (Ko = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Ko === e && (Ko = null);
        for (var n = 0; n < e.length; n += 3) {
          var l = e[n], o = e[n + 1], s = e[n + 2];
          if (typeof o != "function") {
            if (Hc(o || l) === null)
              continue;
            break;
          }
          var f = Ea(l);
          f !== null && (e.splice(n, 3), n -= 3, Ts(
            f,
            {
              pending: !0,
              data: s,
              method: l.method,
              action: o
            },
            o,
            s
          ));
        }
      }
    ));
  }
  function fr(e) {
    function n(T) {
      return Qo(T, e);
    }
    Tl !== null && Qo(Tl, e), Ml !== null && Qo(Ml, e), Ol !== null && Qo(Ol, e), ur.forEach(n), sr.forEach(n);
    for (var l = 0; l < _l.length; l++) {
      var o = _l[l];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < _l.length && (l = _l[0], l.blockedOn === null); )
      Vp(l), l.blockedOn === null && _l.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (o = 0; o < l.length; o += 3) {
        var s = l[o], f = l[o + 1], h = s[Ht] || null;
        if (typeof f == "function")
          h || Up(l);
        else if (h) {
          var x = null;
          if (f && f.hasAttribute("formAction")) {
            if (s = f, h = f[Ht] || null)
              x = h.formAction;
            else if (Hc(s) !== null) continue;
          } else x = h.action;
          typeof x == "function" ? l[o + 1] = x : (l.splice(o, 3), o -= 3), Up(l);
        }
      }
  }
  function Vc(e) {
    this._internalRoot = e;
  }
  Po.prototype.render = Vc.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(r(409));
    var l = n.current, o = Yt();
    zp(l, o, e, n, null, null);
  }, Po.prototype.unmount = Vc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      e.tag === 0 && Pa(), zp(e.current, 2, null, e, null, null), jo(), n[wa] = null;
    }
  };
  function Po(e) {
    this._internalRoot = e;
  }
  Po.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = gd();
      e = { blockedOn: null, target: e, priority: n };
      for (var l = 0; l < _l.length && n !== 0 && n < _l[l].priority; l++) ;
      _l.splice(l, 0, e), l === 0 && Vp(e);
    }
  };
  var Bp = i.version;
  if (Bp !== "19.0.0-rc-65e06cb7-20241218")
    throw Error(
      r(
        527,
        Bp,
        "19.0.0-rc-65e06cb7-20241218"
      )
    );
  I.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = re(n), e = e !== null ? me(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var c1 = {
    bundleType: 0,
    version: "19.0.0-rc-65e06cb7-20241218",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    findFiberByHostInstance: ql,
    reconcilerVersion: "19.0.0-rc-65e06cb7-20241218"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Wo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wo.isDisabled && Wo.supportsFiber)
      try {
        vn = Wo.inject(
          c1
        ), Et = Wo;
      } catch {
      }
  }
  return dr.createRoot = function(e, n) {
    if (!u(e)) throw Error(r(299));
    var l = !1, o = "", s = ig, f = rg, h = og, x = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (x = n.unstable_transitionCallbacks)), n = Np(
      e,
      1,
      !1,
      null,
      null,
      l,
      o,
      s,
      f,
      h,
      x,
      null
    ), e[wa] = n.current, xc(
      e.nodeType === 8 ? e.parentNode : e
    ), new Vc(n);
  }, dr.hydrateRoot = function(e, n, l) {
    if (!u(e)) throw Error(r(299));
    var o = !1, s = "", f = ig, h = rg, x = og, T = null, D = null;
    return l != null && (l.unstable_strictMode === !0 && (o = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (f = l.onUncaughtError), l.onCaughtError !== void 0 && (h = l.onCaughtError), l.onRecoverableError !== void 0 && (x = l.onRecoverableError), l.unstable_transitionCallbacks !== void 0 && (T = l.unstable_transitionCallbacks), l.formState !== void 0 && (D = l.formState)), n = Np(
      e,
      1,
      !0,
      n,
      l ?? null,
      o,
      s,
      f,
      h,
      x,
      T,
      D
    ), n.context = jp(null), l = n.current, o = Yt(), s = hl(o), s.callback = null, vl(l, s, o), n.current.lanes = o, yi(n, o), Dn(n), e[wa] = n.current, xc(e), new Po(n);
  }, dr.version = "19.0.0-rc-65e06cb7-20241218", dr;
}
var Ip;
function C1() {
  if (Ip) return kc.exports;
  Ip = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (i) {
        console.error(i);
      }
  }
  return t(), kc.exports = E1(), kc.exports;
}
var R1 = C1(), qc = { exports: {} }, mr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xp;
function T1() {
  if (Xp) return mr;
  Xp = 1;
  var t = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function a(r, u, c) {
    var d = null;
    if (c !== void 0 && (d = "" + c), u.key !== void 0 && (d = "" + u.key), "key" in u) {
      c = {};
      for (var m in u)
        m !== "key" && (c[m] = u[m]);
    } else c = u;
    return u = c.ref, {
      $$typeof: t,
      type: r,
      key: d,
      ref: u !== void 0 ? u : null,
      props: c
    };
  }
  return mr.Fragment = i, mr.jsx = a, mr.jsxs = a, mr;
}
var Zp;
function M1() {
  return Zp || (Zp = 1, qc.exports = T1()), qc.exports;
}
var E = M1();
function Yh(t) {
  var i, a, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var u = t.length;
    for (i = 0; i < u; i++) t[i] && (a = Yh(t[i])) && (r && (r += " "), r += a);
  } else for (a in t) t[a] && (r && (r += " "), r += a);
  return r;
}
function O1() {
  for (var t, i, a = 0, r = "", u = arguments.length; a < u; a++) (t = arguments[a]) && (i = Yh(t)) && (r && (r += " "), r += i);
  return r;
}
const Qp = (t) => typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t, Kp = O1, ba = (t, i) => (a) => {
  var r;
  if ((i == null ? void 0 : i.variants) == null) return Kp(t, a == null ? void 0 : a.class, a == null ? void 0 : a.className);
  const { variants: u, defaultVariants: c } = i, d = Object.keys(u).map((p) => {
    const v = a == null ? void 0 : a[p], w = c == null ? void 0 : c[p];
    if (v === null) return null;
    const S = Qp(v) || Qp(w);
    return u[p][S];
  }), m = a && Object.entries(a).reduce((p, v) => {
    let [w, S] = v;
    return S === void 0 || (p[w] = S), p;
  }, {}), g = i == null || (r = i.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((p, v) => {
    let { class: w, className: S, ...y } = v;
    return Object.entries(y).every((b) => {
      let [R, M] = b;
      return Array.isArray(M) ? M.includes({
        ...c,
        ...m
      }[R]) : {
        ...c,
        ...m
      }[R] === M;
    }) ? [
      ...p,
      w,
      S
    ] : p;
  }, []);
  return Kp(t, d, g, a == null ? void 0 : a.class, a == null ? void 0 : a.className);
}, _1 = ba(
  "text-center inline-block font-semibold px-3 py-2 rounded-md text-sm",
  {
    variants: {
      variant: {
        primary: "shadow-xs bg-hello-csv-primary text-white",
        secondary: "bg-white text-hello-csv-primary ring-1 shadow-xs ring-bg-hello-csv-primary ring-inset",
        tertiary: "bg-white text-gray-900 ring-1 shadow-xs ring-hello-csv-tertiary ring-inset",
        success: "shadow-xs bg-hello-csv-success text-white",
        danger: "shadow-xs bg-hello-csv-danger text-white"
      },
      withFullWidth: {
        true: "w-full",
        false: ""
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "cursor-pointer"
      }
    },
    compoundVariants: [
      {
        variant: "primary",
        disabled: !1,
        className: "hover:bg-hello-csv-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-primary"
      },
      {
        variant: "secondary",
        disabled: !1,
        className: "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-secondary"
      },
      {
        variant: "tertiary",
        disabled: !1,
        className: "hover:bg-hello-csv-tertiary-light"
      },
      {
        variant: "success",
        disabled: !1,
        className: "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-success"
      },
      {
        variant: "danger",
        disabled: !1,
        className: "hover:bg-hello-csv-danger-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-danger"
      }
    ],
    defaultVariants: {
      withFullWidth: !1,
      variant: "primary",
      disabled: !1
    }
  }
);
function pn({
  children: t,
  variant: i,
  disabled: a,
  onClick: r,
  withFullWidth: u
}) {
  const c = _1({ variant: i, disabled: a, withFullWidth: u });
  return /* @__PURE__ */ E.jsx("div", { className: c, onClick: r, children: t });
}
const A1 = ba("overflow-hidden rounded-md border border-gray-200", {
  variants: {
    variant: {
      default: "bg-white",
      muted: "bg-hello-csv-muted"
    },
    withPadding: {
      true: "px-4 py-5 sm:p-6",
      false: ""
    }
  },
  defaultVariants: {
    variant: "default",
    withPadding: !0
  }
}), Ih = pu(
  ({ children: t, className: i, variant: a, withPadding: r = !0 }, u) => {
    const c = A1({ variant: a, withPadding: r });
    return /* @__PURE__ */ E.jsx("div", { ref: u, className: `${c} ${i}`, children: t });
  }
);
function Pp({ id: t, checked: i, setChecked: a, label: r }) {
  return /* @__PURE__ */ E.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ E.jsx("div", { className: "flex h-6 shrink-0 items-center", children: /* @__PURE__ */ E.jsxs("div", { className: "group grid size-4 grid-cols-1", children: [
      /* @__PURE__ */ E.jsx(
        "input",
        {
          checked: i,
          onChange: (u) => a(u.target.checked),
          id: t,
          type: "checkbox",
          className: "checked:border-hello-csv-primary checked:bg-hello-csv-primary indeterminate:border-hello-csv-primary indeterminate:bg-hello-csv-primary focus-visible:outline-hello-csv-hello-csv-primary col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
        }
      ),
      /* @__PURE__ */ E.jsxs(
        "svg",
        {
          fill: "none",
          viewBox: "0 0 14 14",
          className: "pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25",
          children: [
            /* @__PURE__ */ E.jsx(
              "path",
              {
                d: "M3 8L6 11L11 3.5",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "opacity-0 group-has-checked:opacity-100"
              }
            ),
            /* @__PURE__ */ E.jsx(
              "path",
              {
                d: "M3 7H11",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "opacity-0 group-has-indeterminate:opacity-100"
              }
            )
          ]
        }
      )
    ] }) }),
    r && /* @__PURE__ */ E.jsx("div", { className: "text-sm/6", children: /* @__PURE__ */ E.jsx("label", { htmlFor: t, className: "font-medium text-gray-900", children: r }) })
  ] });
}
const Xh = typeof document < "u" ? ie.useLayoutEffect : () => {
};
function D1(t) {
  const i = pe(null);
  return Xh(() => {
    i.current = t;
  }, [
    t
  ]), ze((...a) => {
    const r = i.current;
    return r == null ? void 0 : r(...a);
  }, []);
}
const Vl = (t) => {
  var i;
  return (i = t == null ? void 0 : t.ownerDocument) !== null && i !== void 0 ? i : document;
}, da = (t) => t && "window" in t && t.window === t ? t : Vl(t).defaultView || window;
function N1(t) {
  return t !== null && typeof t == "object" && "nodeType" in t && typeof t.nodeType == "number";
}
function j1(t) {
  return N1(t) && t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in t;
}
let z1 = !1;
function Bf() {
  return z1;
}
function Zh(t, i) {
  if (!Bf()) return i && t ? t.contains(i) : !1;
  if (!t || !i) return !1;
  let a = i;
  for (; a !== null; ) {
    if (a === t) return !0;
    a.tagName === "SLOT" && a.assignedSlot ? a = a.assignedSlot.parentNode : j1(a) ? a = a.host : a = a.parentNode;
  }
  return !1;
}
const mf = (t = document) => {
  var i;
  if (!Bf()) return t.activeElement;
  let a = t.activeElement;
  for (; a && "shadowRoot" in a && (!((i = a.shadowRoot) === null || i === void 0) && i.activeElement); ) a = a.shadowRoot.activeElement;
  return a;
};
function Qh(t) {
  return Bf() && t.target.shadowRoot && t.composedPath ? t.composedPath()[0] : t.target;
}
function $1(t) {
  var i;
  return typeof window > "u" || window.navigator == null ? !1 : ((i = window.navigator.userAgentData) === null || i === void 0 ? void 0 : i.brands.some((a) => t.test(a.brand))) || t.test(window.navigator.userAgent);
}
function L1(t) {
  var i;
  return typeof window < "u" && window.navigator != null ? t.test(((i = window.navigator.userAgentData) === null || i === void 0 ? void 0 : i.platform) || window.navigator.platform) : !1;
}
function Kh(t) {
  let i = null;
  return () => (i == null && (i = t()), i);
}
const H1 = Kh(function() {
  return L1(/^Mac/i);
}), F1 = Kh(function() {
  return $1(/Android/i);
});
function Ph() {
  let t = pe(/* @__PURE__ */ new Map()), i = ze((u, c, d, m) => {
    let g = m != null && m.once ? (...p) => {
      t.current.delete(d), d(...p);
    } : d;
    t.current.set(d, {
      type: c,
      eventTarget: u,
      fn: g,
      options: m
    }), u.addEventListener(c, g, m);
  }, []), a = ze((u, c, d, m) => {
    var g;
    let p = ((g = t.current.get(d)) === null || g === void 0 ? void 0 : g.fn) || d;
    u.removeEventListener(c, p, m), t.current.delete(d);
  }, []), r = ze(() => {
    t.current.forEach((u, c) => {
      a(u.eventTarget, u.type, c, u.options);
    });
  }, [
    a
  ]);
  return Ve(() => r, [
    r
  ]), {
    addGlobalListener: i,
    removeGlobalListener: a,
    removeAllGlobalListeners: r
  };
}
function V1(t) {
  return t.mozInputSource === 0 && t.isTrusted ? !0 : F1() && t.pointerType ? t.type === "click" && t.buttons === 1 : t.detail === 0 && !t.pointerType;
}
function Wh(t) {
  let i = t;
  return i.nativeEvent = t, i.isDefaultPrevented = () => i.defaultPrevented, i.isPropagationStopped = () => i.cancelBubble, i.persist = () => {
  }, i;
}
function k1(t, i) {
  Object.defineProperty(t, "target", {
    value: i
  }), Object.defineProperty(t, "currentTarget", {
    value: i
  });
}
function Jh(t) {
  let i = pe({
    isFocused: !1,
    observer: null
  });
  Xh(() => {
    const r = i.current;
    return () => {
      r.observer && (r.observer.disconnect(), r.observer = null);
    };
  }, []);
  let a = D1((r) => {
    t == null || t(r);
  });
  return ze((r) => {
    if (r.target instanceof HTMLButtonElement || r.target instanceof HTMLInputElement || r.target instanceof HTMLTextAreaElement || r.target instanceof HTMLSelectElement) {
      i.current.isFocused = !0;
      let u = r.target, c = (d) => {
        if (i.current.isFocused = !1, u.disabled) {
          let m = Wh(d);
          a(m);
        }
        i.current.observer && (i.current.observer.disconnect(), i.current.observer = null);
      };
      u.addEventListener("focusout", c, {
        once: !0
      }), i.current.observer = new MutationObserver(() => {
        if (i.current.isFocused && u.disabled) {
          var d;
          (d = i.current.observer) === null || d === void 0 || d.disconnect();
          let m = u === document.activeElement ? null : document.activeElement;
          u.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: m
          })), u.dispatchEvent(new FocusEvent("focusout", {
            bubbles: !0,
            relatedTarget: m
          }));
        }
      }), i.current.observer.observe(u, {
        attributes: !0,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    a
  ]);
}
let U1 = !1, Ar = null, gf = /* @__PURE__ */ new Set(), Sr = /* @__PURE__ */ new Map(), pa = !1, pf = !1;
const B1 = {
  Tab: !0,
  Escape: !0
};
function qf(t, i) {
  for (let a of gf) a(t, i);
}
function q1(t) {
  return !(t.metaKey || !H1() && t.altKey || t.ctrlKey || t.key === "Control" || t.key === "Shift" || t.key === "Meta");
}
function uu(t) {
  pa = !0, q1(t) && (Ar = "keyboard", qf("keyboard", t));
}
function ri(t) {
  Ar = "pointer", (t.type === "mousedown" || t.type === "pointerdown") && (pa = !0, qf("pointer", t));
}
function ev(t) {
  V1(t) && (pa = !0, Ar = "virtual");
}
function tv(t) {
  t.target === window || t.target === document || U1 || !t.isTrusted || (!pa && !pf && (Ar = "virtual", qf("virtual", t)), pa = !1, pf = !1);
}
function nv() {
  pa = !1, pf = !0;
}
function hf(t) {
  if (typeof window > "u" || Sr.get(da(t))) return;
  const i = da(t), a = Vl(t);
  let r = i.HTMLElement.prototype.focus;
  i.HTMLElement.prototype.focus = function() {
    pa = !0, r.apply(this, arguments);
  }, a.addEventListener("keydown", uu, !0), a.addEventListener("keyup", uu, !0), a.addEventListener("click", ev, !0), i.addEventListener("focus", tv, !0), i.addEventListener("blur", nv, !1), typeof PointerEvent < "u" && (a.addEventListener("pointerdown", ri, !0), a.addEventListener("pointermove", ri, !0), a.addEventListener("pointerup", ri, !0)), i.addEventListener("beforeunload", () => {
    lv(t);
  }, {
    once: !0
  }), Sr.set(i, {
    focus: r
  });
}
const lv = (t, i) => {
  const a = da(t), r = Vl(t);
  i && r.removeEventListener("DOMContentLoaded", i), Sr.has(a) && (a.HTMLElement.prototype.focus = Sr.get(a).focus, r.removeEventListener("keydown", uu, !0), r.removeEventListener("keyup", uu, !0), r.removeEventListener("click", ev, !0), a.removeEventListener("focus", tv, !0), a.removeEventListener("blur", nv, !1), typeof PointerEvent < "u" && (r.removeEventListener("pointerdown", ri, !0), r.removeEventListener("pointermove", ri, !0), r.removeEventListener("pointerup", ri, !0)), Sr.delete(a));
};
function G1(t) {
  const i = Vl(t);
  let a;
  return i.readyState !== "loading" ? hf(t) : (a = () => {
    hf(t);
  }, i.addEventListener("DOMContentLoaded", a)), () => lv(t, a);
}
typeof document < "u" && G1();
function av() {
  return Ar !== "pointer";
}
const Y1 = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function I1(t, i, a) {
  let r = Vl(a == null ? void 0 : a.target);
  const u = typeof window < "u" ? da(a == null ? void 0 : a.target).HTMLInputElement : HTMLInputElement, c = typeof window < "u" ? da(a == null ? void 0 : a.target).HTMLTextAreaElement : HTMLTextAreaElement, d = typeof window < "u" ? da(a == null ? void 0 : a.target).HTMLElement : HTMLElement, m = typeof window < "u" ? da(a == null ? void 0 : a.target).KeyboardEvent : KeyboardEvent;
  return t = t || r.activeElement instanceof u && !Y1.has(r.activeElement.type) || r.activeElement instanceof c || r.activeElement instanceof d && r.activeElement.isContentEditable, !(t && i === "keyboard" && a instanceof m && !B1[a.key]);
}
function X1(t, i, a) {
  hf(), Ve(() => {
    let r = (u, c) => {
      I1(!!(a != null && a.isTextInput), u, c) && t(av());
    };
    return gf.add(r), () => {
      gf.delete(r);
    };
  }, i);
}
function Z1(t) {
  let { isDisabled: i, onFocus: a, onBlur: r, onFocusChange: u } = t;
  const c = ze((g) => {
    if (g.target === g.currentTarget)
      return r && r(g), u && u(!1), !0;
  }, [
    r,
    u
  ]), d = Jh(c), m = ze((g) => {
    const p = Vl(g.target), v = p ? mf(p) : mf();
    g.target === g.currentTarget && v === Qh(g.nativeEvent) && (a && a(g), u && u(!0), d(g));
  }, [
    u,
    a,
    d
  ]);
  return {
    focusProps: {
      onFocus: !i && (a || u || r) ? m : void 0,
      onBlur: !i && (r || u) ? c : void 0
    }
  };
}
function Q1(t) {
  let { isDisabled: i, onBlurWithin: a, onFocusWithin: r, onFocusWithinChange: u } = t, c = pe({
    isFocusWithin: !1
  }), { addGlobalListener: d, removeAllGlobalListeners: m } = Ph(), g = ze((w) => {
    w.currentTarget.contains(w.target) && c.current.isFocusWithin && !w.currentTarget.contains(w.relatedTarget) && (c.current.isFocusWithin = !1, m(), a && a(w), u && u(!1));
  }, [
    a,
    u,
    c,
    m
  ]), p = Jh(g), v = ze((w) => {
    if (!w.currentTarget.contains(w.target)) return;
    const S = Vl(w.target), y = mf(S);
    if (!c.current.isFocusWithin && y === Qh(w.nativeEvent)) {
      r && r(w), u && u(!0), c.current.isFocusWithin = !0, p(w);
      let b = w.currentTarget;
      d(S, "focus", (R) => {
        if (c.current.isFocusWithin && !Zh(b, R.target)) {
          let M = new S.defaultView.FocusEvent("blur", {
            relatedTarget: R.target
          });
          k1(M, b);
          let N = Wh(M);
          g(N);
        }
      }, {
        capture: !0
      });
    }
  }, [
    r,
    u,
    p,
    d,
    g
  ]);
  return i ? {
    focusWithinProps: {
      // These cannot be null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  } : {
    focusWithinProps: {
      onFocus: v,
      onBlur: g
    }
  };
}
let vf = !1, Gc = 0;
function K1() {
  vf = !0, setTimeout(() => {
    vf = !1;
  }, 50);
}
function Wp(t) {
  t.pointerType === "touch" && K1();
}
function P1() {
  if (!(typeof document > "u"))
    return typeof PointerEvent < "u" && document.addEventListener("pointerup", Wp), Gc++, () => {
      Gc--, !(Gc > 0) && typeof PointerEvent < "u" && document.removeEventListener("pointerup", Wp);
    };
}
function iv(t) {
  let { onHoverStart: i, onHoverChange: a, onHoverEnd: r, isDisabled: u } = t, [c, d] = Ee(!1), m = pe({
    isHovered: !1,
    ignoreEmulatedMouseEvents: !1,
    pointerType: "",
    target: null
  }).current;
  Ve(P1, []);
  let { addGlobalListener: g, removeAllGlobalListeners: p } = Ph(), { hoverProps: v, triggerHoverEnd: w } = Me(() => {
    let S = (R, M) => {
      if (m.pointerType = M, u || M === "touch" || m.isHovered || !R.currentTarget.contains(R.target)) return;
      m.isHovered = !0;
      let N = R.currentTarget;
      m.target = N, g(Vl(R.target), "pointerover", (j) => {
        m.isHovered && m.target && !Zh(m.target, j.target) && y(j, j.pointerType);
      }, {
        capture: !0
      }), i && i({
        type: "hoverstart",
        target: N,
        pointerType: M
      }), a && a(!0), d(!0);
    }, y = (R, M) => {
      let N = m.target;
      m.pointerType = "", m.target = null, !(M === "touch" || !m.isHovered || !N) && (m.isHovered = !1, p(), r && r({
        type: "hoverend",
        target: N,
        pointerType: M
      }), a && a(!1), d(!1));
    }, b = {};
    return typeof PointerEvent < "u" && (b.onPointerEnter = (R) => {
      vf && R.pointerType === "mouse" || S(R, R.pointerType);
    }, b.onPointerLeave = (R) => {
      !u && R.currentTarget.contains(R.target) && y(R, R.pointerType);
    }), {
      hoverProps: b,
      triggerHoverEnd: y
    };
  }, [
    i,
    a,
    r,
    u,
    m,
    g,
    p
  ]);
  return Ve(() => {
    u && w({
      currentTarget: m.target
    }, m.pointerType);
  }, [
    u
  ]), {
    hoverProps: v,
    isHovered: c
  };
}
function rv(t = {}) {
  let { autoFocus: i = !1, isTextInput: a, within: r } = t, u = pe({
    isFocused: !1,
    isFocusVisible: i || av()
  }), [c, d] = Ee(!1), [m, g] = Ee(() => u.current.isFocused && u.current.isFocusVisible), p = ze(() => g(u.current.isFocused && u.current.isFocusVisible), []), v = ze((y) => {
    u.current.isFocused = y, d(y), p();
  }, [
    p
  ]);
  X1((y) => {
    u.current.isFocusVisible = y, p();
  }, [], {
    isTextInput: a
  });
  let { focusProps: w } = Z1({
    isDisabled: r,
    onFocusChange: v
  }), { focusWithinProps: S } = Q1({
    isDisabled: !r,
    onFocusWithinChange: v
  });
  return {
    isFocused: c,
    isFocusVisible: m,
    focusProps: r ? S : w
  };
}
var W1 = Object.defineProperty, J1 = (t, i, a) => i in t ? W1(t, i, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[i] = a, Yc = (t, i, a) => (J1(t, typeof i != "symbol" ? i + "" : i, a), a);
let eS = class {
  constructor() {
    Yc(this, "current", this.detect()), Yc(this, "handoffState", "pending"), Yc(this, "currentId", 0);
  }
  set(i) {
    this.current !== i && (this.handoffState = "pending", this.currentId = 0, this.current = i);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, ga = new eS();
function fi(t) {
  var i, a;
  return ga.isServer ? null : t ? "ownerDocument" in t ? t.ownerDocument : "current" in t ? (a = (i = t.current) == null ? void 0 : i.ownerDocument) != null ? a : document : null : document;
}
function hu(t) {
  typeof queueMicrotask == "function" ? queueMicrotask(t) : Promise.resolve().then(t).catch((i) => setTimeout(() => {
    throw i;
  }));
}
function Ln() {
  let t = [], i = { addEventListener(a, r, u, c) {
    return a.addEventListener(r, u, c), i.add(() => a.removeEventListener(r, u, c));
  }, requestAnimationFrame(...a) {
    let r = requestAnimationFrame(...a);
    return i.add(() => cancelAnimationFrame(r));
  }, nextFrame(...a) {
    return i.requestAnimationFrame(() => i.requestAnimationFrame(...a));
  }, setTimeout(...a) {
    let r = setTimeout(...a);
    return i.add(() => clearTimeout(r));
  }, microTask(...a) {
    let r = { current: !0 };
    return hu(() => {
      r.current && a[0]();
    }), i.add(() => {
      r.current = !1;
    });
  }, style(a, r, u) {
    let c = a.style.getPropertyValue(r);
    return Object.assign(a.style, { [r]: u }), this.add(() => {
      Object.assign(a.style, { [r]: c });
    });
  }, group(a) {
    let r = Ln();
    return a(r), this.add(() => r.dispose());
  }, add(a) {
    return t.includes(a) || t.push(a), () => {
      let r = t.indexOf(a);
      if (r >= 0) for (let u of t.splice(r, 1)) u();
    };
  }, dispose() {
    for (let a of t.splice(0)) a();
  } };
  return i;
}
function Sa() {
  let [t] = Ee(Ln);
  return Ve(() => () => t.dispose(), [t]), t;
}
let ke = (t, i) => {
  ga.isServer ? Ve(t, i) : Vf(t, i);
};
function kl(t) {
  let i = pe(t);
  return ke(() => {
    i.current = t;
  }, [t]), i;
}
let ve = function(t) {
  let i = kl(t);
  return ie.useCallback((...a) => i.current(...a), [i]);
};
function tS(t) {
  let i = t.width / 2, a = t.height / 2;
  return { top: t.clientY - a, right: t.clientX + i, bottom: t.clientY + a, left: t.clientX - i };
}
function nS(t, i) {
  return !(!t || !i || t.right < i.left || t.left > i.right || t.bottom < i.top || t.top > i.bottom);
}
function lS({ disabled: t = !1 } = {}) {
  let i = pe(null), [a, r] = Ee(!1), u = Sa(), c = ve(() => {
    i.current = null, r(!1), u.dispose();
  }), d = ve((m) => {
    if (u.dispose(), i.current === null) {
      i.current = m.currentTarget, r(!0);
      {
        let g = fi(m.currentTarget);
        u.addEventListener(g, "pointerup", c, !1), u.addEventListener(g, "pointermove", (p) => {
          if (i.current) {
            let v = tS(p);
            r(nS(v, i.current.getBoundingClientRect()));
          }
        }, !1), u.addEventListener(g, "pointercancel", c, !1);
      }
    }
  });
  return { pressed: a, pressProps: t ? {} : { onPointerDown: d, onPointerUp: c, onClick: c } };
}
let aS = ot(void 0);
function Gf() {
  return Ke(aS);
}
function yf(...t) {
  return Array.from(new Set(t.flatMap((i) => typeof i == "string" ? i.split(" ") : []))).filter(Boolean).join(" ");
}
function zt(t, i, ...a) {
  if (t in i) {
    let u = i[t];
    return typeof u == "function" ? u(...a) : u;
  }
  let r = new Error(`Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(i).map((u) => `"${u}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, zt), r;
}
var ui = ((t) => (t[t.None = 0] = "None", t[t.RenderStrategy = 1] = "RenderStrategy", t[t.Static = 2] = "Static", t))(ui || {}), Nl = ((t) => (t[t.Unmount = 0] = "Unmount", t[t.Hidden = 1] = "Hidden", t))(Nl || {});
function yt() {
  let t = rS();
  return ze((i) => iS({ mergeRefs: t, ...i }), [t]);
}
function iS({ ourProps: t, theirProps: i, slot: a, defaultTag: r, features: u, visible: c = !0, name: d, mergeRefs: m }) {
  m = m ?? oS;
  let g = ov(i, t);
  if (c) return Jo(g, a, r, d, m);
  let p = u ?? 0;
  if (p & 2) {
    let { static: v = !1, ...w } = g;
    if (v) return Jo(w, a, r, d, m);
  }
  if (p & 1) {
    let { unmount: v = !0, ...w } = g;
    return zt(v ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Jo({ ...w, hidden: !0, style: { display: "none" } }, a, r, d, m);
    } });
  }
  return Jo(g, a, r, d, m);
}
function Jo(t, i = {}, a, r, u) {
  let { as: c = a, children: d, refName: m = "ref", ...g } = Ic(t, ["unmount", "static"]), p = t.ref !== void 0 ? { [m]: t.ref } : {}, v = typeof d == "function" ? d(i) : d;
  "className" in g && g.className && typeof g.className == "function" && (g.className = g.className(i)), g["aria-labelledby"] && g["aria-labelledby"] === g.id && (g["aria-labelledby"] = void 0);
  let w = {};
  if (i) {
    let S = !1, y = [];
    for (let [b, R] of Object.entries(i)) typeof R == "boolean" && (S = !0), R === !0 && y.push(b.replace(/([A-Z])/g, (M) => `-${M.toLowerCase()}`));
    if (S) {
      w["data-headlessui-state"] = y.join(" ");
      for (let b of y) w[`data-${b}`] = "";
    }
  }
  if (c === Zt && (Object.keys(Dl(g)).length > 0 || Object.keys(Dl(w)).length > 0)) if (!g1(v) || Array.isArray(v) && v.length > 1) {
    if (Object.keys(Dl(g)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(Dl(g)).concat(Object.keys(Dl(w))).map((S) => `  - ${S}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((S) => `  - ${S}`).join(`
`)].join(`
`));
  } else {
    let S = v.props, y = S == null ? void 0 : S.className, b = typeof y == "function" ? (...N) => yf(y(...N), g.className) : yf(y, g.className), R = b ? { className: b } : {}, M = ov(v.props, Dl(Ic(g, ["ref"])));
    for (let N in w) N in M && delete w[N];
    return p1(v, Object.assign({}, M, w, p, { ref: u(uS(v), p.ref) }, R));
  }
  return h1(c, Object.assign({}, Ic(g, ["ref"]), c !== Zt && p, c !== Zt && w), v);
}
function rS() {
  let t = pe([]), i = ze((a) => {
    for (let r of t.current) r != null && (typeof r == "function" ? r(a) : r.current = a);
  }, []);
  return (...a) => {
    if (!a.every((r) => r == null)) return t.current = a, i;
  };
}
function oS(...t) {
  return t.every((i) => i == null) ? void 0 : (i) => {
    for (let a of t) a != null && (typeof a == "function" ? a(i) : a.current = i);
  };
}
function ov(...t) {
  if (t.length === 0) return {};
  if (t.length === 1) return t[0];
  let i = {}, a = {};
  for (let r of t) for (let u in r) u.startsWith("on") && typeof r[u] == "function" ? (a[u] != null || (a[u] = []), a[u].push(r[u])) : i[u] = r[u];
  if (i.disabled || i["aria-disabled"]) for (let r in a) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (a[r] = [(u) => {
    var c;
    return (c = u == null ? void 0 : u.preventDefault) == null ? void 0 : c.call(u);
  }]);
  for (let r in a) Object.assign(i, { [r](u, ...c) {
    let d = a[r];
    for (let m of d) {
      if ((u instanceof Event || (u == null ? void 0 : u.nativeEvent) instanceof Event) && u.defaultPrevented) return;
      m(u, ...c);
    }
  } });
  return i;
}
function Yf(...t) {
  if (t.length === 0) return {};
  if (t.length === 1) return t[0];
  let i = {}, a = {};
  for (let r of t) for (let u in r) u.startsWith("on") && typeof r[u] == "function" ? (a[u] != null || (a[u] = []), a[u].push(r[u])) : i[u] = r[u];
  for (let r in a) Object.assign(i, { [r](...u) {
    let c = a[r];
    for (let d of c) d == null || d(...u);
  } });
  return i;
}
function ut(t) {
  var i;
  return Object.assign(pu(t), { displayName: (i = t.displayName) != null ? i : t.name });
}
function Dl(t) {
  let i = Object.assign({}, t);
  for (let a in i) i[a] === void 0 && delete i[a];
  return i;
}
function Ic(t, i = []) {
  let a = Object.assign({}, t);
  for (let r of i) r in a && delete a[r];
  return a;
}
function uS(t) {
  return ie.version.split(".")[0] >= "19" ? t.props.ref : t.ref;
}
function sS(t, i, a) {
  let [r, u] = Ee(a), c = t !== void 0, d = pe(c), m = pe(!1), g = pe(!1);
  return c && !d.current && !m.current ? (m.current = !0, d.current = c, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !c && d.current && !g.current && (g.current = !0, d.current = c, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [c ? t : r, ve((p) => (c || u(p), i == null ? void 0 : i(p)))];
}
function cS(t) {
  let [i] = Ee(t);
  return i;
}
function uv(t = {}, i = null, a = []) {
  for (let [r, u] of Object.entries(t)) cv(a, sv(i, r), u);
  return a;
}
function sv(t, i) {
  return t ? t + "[" + i + "]" : i;
}
function cv(t, i, a) {
  if (Array.isArray(a)) for (let [r, u] of a.entries()) cv(t, sv(i, r.toString()), u);
  else a instanceof Date ? t.push([i, a.toISOString()]) : typeof a == "boolean" ? t.push([i, a ? "1" : "0"]) : typeof a == "string" ? t.push([i, a]) : typeof a == "number" ? t.push([i, `${a}`]) : a == null ? t.push([i, ""]) : uv(a, i, t);
}
let fS = "span";
var si = ((t) => (t[t.None = 1] = "None", t[t.Focusable = 2] = "Focusable", t[t.Hidden = 4] = "Hidden", t))(si || {});
function dS(t, i) {
  var a;
  let { features: r = 1, ...u } = t, c = { ref: i, "aria-hidden": (r & 2) === 2 ? !0 : (a = u["aria-hidden"]) != null ? a : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return yt()({ ourProps: c, theirProps: u, slot: {}, defaultTag: fS, name: "Hidden" });
}
let Cr = ut(dS), mS = ot(null);
function gS({ children: t }) {
  let i = Ke(mS);
  if (!i) return ie.createElement(ie.Fragment, null, t);
  let { target: a } = i;
  return a ? Uf(ie.createElement(ie.Fragment, null, t), a) : null;
}
function pS({ data: t, form: i, disabled: a, onReset: r, overrides: u }) {
  let [c, d] = Ee(null), m = Sa();
  return Ve(() => {
    if (r && c) return m.addEventListener(c, "reset", r);
  }, [c, i, r]), ie.createElement(gS, null, ie.createElement(hS, { setForm: d, formId: i }), uv(t).map(([g, p]) => ie.createElement(Cr, { features: si.Hidden, ...Dl({ key: g, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: i, disabled: a, name: g, value: p, ...u }) })));
}
function hS({ setForm: t, formId: i }) {
  return Ve(() => {
    if (i) {
      let a = document.getElementById(i);
      a && t(a);
    }
  }, [t, i]), i ? null : ie.createElement(Cr, { features: si.Hidden, as: "input", type: "hidden", hidden: !0, readOnly: !0, ref: (a) => {
    if (!a) return;
    let r = a.closest("form");
    r && t(r);
  } });
}
let vS = ot(void 0);
function fv() {
  return Ke(vS);
}
function If(t) {
  return typeof t != "object" || t === null ? !1 : "nodeType" in t;
}
function ll(t) {
  return If(t) && "tagName" in t;
}
function hn(t) {
  return ll(t) && "accessKey" in t;
}
function nl(t) {
  return ll(t) && "tabIndex" in t;
}
function yS(t) {
  return ll(t) && "style" in t;
}
function bS(t) {
  return hn(t) && t.nodeName === "IFRAME";
}
function su(t) {
  return hn(t) && t.nodeName === "INPUT";
}
function Jp(t) {
  return hn(t) && t.nodeName === "LABEL";
}
function SS(t) {
  return hn(t) && t.nodeName === "FIELDSET";
}
function dv(t) {
  return hn(t) && t.nodeName === "LEGEND";
}
function xS(t) {
  return ll(t) ? t.matches('a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]') : !1;
}
function wS(t) {
  let i = t.parentElement, a = null;
  for (; i && !SS(i); ) dv(i) && (a = i), i = i.parentElement;
  let r = (i == null ? void 0 : i.getAttribute("disabled")) === "";
  return r && ES(a) ? !1 : r;
}
function ES(t) {
  if (!t) return !1;
  let i = t.previousElementSibling;
  for (; i !== null; ) {
    if (dv(i)) return !1;
    i = i.previousElementSibling;
  }
  return !0;
}
let mv = Symbol();
function CS(t, i = !0) {
  return Object.assign(t, { [mv]: i });
}
function $t(...t) {
  let i = pe(t);
  Ve(() => {
    i.current = t;
  }, [t]);
  let a = ve((r) => {
    for (let u of i.current) u != null && (typeof u == "function" ? u(r) : u.current = r);
  });
  return t.every((r) => r == null || (r == null ? void 0 : r[mv])) ? void 0 : a;
}
let vu = ot(null);
vu.displayName = "DescriptionContext";
function gv() {
  let t = Ke(vu);
  if (t === null) {
    let i = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(i, gv), i;
  }
  return t;
}
function RS() {
  var t, i;
  return (i = (t = Ke(vu)) == null ? void 0 : t.value) != null ? i : void 0;
}
function TS() {
  let [t, i] = Ee([]);
  return [t.length > 0 ? t.join(" ") : void 0, Me(() => function(a) {
    let r = ve((c) => (i((d) => [...d, c]), () => i((d) => {
      let m = d.slice(), g = m.indexOf(c);
      return g !== -1 && m.splice(g, 1), m;
    }))), u = Me(() => ({ register: r, slot: a.slot, name: a.name, props: a.props, value: a.value }), [r, a.slot, a.name, a.props, a.value]);
    return ie.createElement(vu.Provider, { value: u }, a.children);
  }, [i])];
}
let MS = "p";
function OS(t, i) {
  let a = Rn(), r = Gf(), { id: u = `headlessui-description-${a}`, ...c } = t, d = gv(), m = $t(i);
  ke(() => d.register(u), [u, d.register]);
  let g = r || !1, p = Me(() => ({ ...d.slot, disabled: g }), [d.slot, g]), v = { ref: m, ...d.props, id: u };
  return yt()({ ourProps: v, theirProps: c, slot: p, defaultTag: MS, name: d.name || "Description" });
}
let _S = ut(OS), AS = Object.assign(_S, {});
var Mt = ((t) => (t.Space = " ", t.Enter = "Enter", t.Escape = "Escape", t.Backspace = "Backspace", t.Delete = "Delete", t.ArrowLeft = "ArrowLeft", t.ArrowUp = "ArrowUp", t.ArrowRight = "ArrowRight", t.ArrowDown = "ArrowDown", t.Home = "Home", t.End = "End", t.PageUp = "PageUp", t.PageDown = "PageDown", t.Tab = "Tab", t))(Mt || {});
let yu = ot(null);
yu.displayName = "LabelContext";
function pv() {
  let t = Ke(yu);
  if (t === null) {
    let i = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(i, pv), i;
  }
  return t;
}
function bu(t) {
  var i, a, r;
  let u = (a = (i = Ke(yu)) == null ? void 0 : i.value) != null ? a : void 0;
  return ((r = t == null ? void 0 : t.length) != null ? r : 0) > 0 ? [u, ...t].filter(Boolean).join(" ") : u;
}
function DS({ inherit: t = !1 } = {}) {
  let i = bu(), [a, r] = Ee([]), u = t ? [i, ...a].filter(Boolean) : a;
  return [u.length > 0 ? u.join(" ") : void 0, Me(() => function(c) {
    let d = ve((g) => (r((p) => [...p, g]), () => r((p) => {
      let v = p.slice(), w = v.indexOf(g);
      return w !== -1 && v.splice(w, 1), v;
    }))), m = Me(() => ({ register: d, slot: c.slot, name: c.name, props: c.props, value: c.value }), [d, c.slot, c.name, c.props, c.value]);
    return ie.createElement(yu.Provider, { value: m }, c.children);
  }, [r])];
}
let NS = "label";
function jS(t, i) {
  var a;
  let r = Rn(), u = pv(), c = fv(), d = Gf(), { id: m = `headlessui-label-${r}`, htmlFor: g = c ?? ((a = u.props) == null ? void 0 : a.htmlFor), passive: p = !1, ...v } = t, w = $t(i);
  ke(() => u.register(m), [m, u.register]);
  let S = ve((M) => {
    let N = M.currentTarget;
    if (!(M.target !== M.currentTarget && xS(M.target)) && (Jp(N) && M.preventDefault(), u.props && "onClick" in u.props && typeof u.props.onClick == "function" && u.props.onClick(M), Jp(N))) {
      let j = document.getElementById(N.htmlFor);
      if (j) {
        let $ = j.getAttribute("disabled");
        if ($ === "true" || $ === "") return;
        let B = j.getAttribute("aria-disabled");
        if (B === "true" || B === "") return;
        (su(j) && (j.type === "file" || j.type === "radio" || j.type === "checkbox") || j.role === "radio" || j.role === "checkbox" || j.role === "switch") && j.click(), j.focus({ preventScroll: !0 });
      }
    }
  }), y = d || !1, b = Me(() => ({ ...u.slot, disabled: y }), [u.slot, y]), R = { ref: w, ...u.props, id: m, htmlFor: g, onClick: S };
  return p && ("onClick" in R && (delete R.htmlFor, delete R.onClick), "onClick" in v && delete v.onClick), yt()({ ourProps: R, theirProps: v, slot: b, defaultTag: g ? NS : "div", name: u.name || "Label" });
}
let zS = ut(jS), $S = Object.assign(zS, {}), LS = ot(() => {
});
function HS({ value: t, children: i }) {
  return ie.createElement(LS.Provider, { value: t }, i);
}
function li(t, i, a) {
  let r = a.initialDeps ?? [], u;
  function c() {
    var d, m, g, p;
    let v;
    a.key && ((d = a.debug) != null && d.call(a)) && (v = Date.now());
    const w = t();
    if (!(w.length !== r.length || w.some((b, R) => r[R] !== b)))
      return u;
    r = w;
    let y;
    if (a.key && ((m = a.debug) != null && m.call(a)) && (y = Date.now()), u = i(...w), a.key && ((g = a.debug) != null && g.call(a))) {
      const b = Math.round((Date.now() - v) * 100) / 100, R = Math.round((Date.now() - y) * 100) / 100, M = R / 16, N = (j, $) => {
        for (j = String(j); j.length < $; )
          j = " " + j;
        return j;
      };
      console.info(
        `%c⏱ ${N(R, 5)} /${N(b, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * M, 120)
        )}deg 100% 31%);`,
        a == null ? void 0 : a.key
      );
    }
    return (p = a == null ? void 0 : a.onChange) == null || p.call(a, u), u;
  }
  return c.updateDeps = (d) => {
    r = d;
  }, c;
}
function Xc(t, i) {
  if (t === void 0)
    throw new Error("Unexpected undefined");
  return t;
}
const FS = (t, i) => Math.abs(t - i) <= 1, VS = (t, i, a) => {
  let r;
  return function(...u) {
    t.clearTimeout(r), r = t.setTimeout(() => i.apply(this, u), a);
  };
};
var gr = { NODE_ENV: "production" };
const eh = (t) => {
  const { offsetWidth: i, offsetHeight: a } = t;
  return { width: i, height: a };
}, kS = (t) => t, US = (t) => {
  const i = Math.max(t.startIndex - t.overscan, 0), a = Math.min(t.endIndex + t.overscan, t.count - 1), r = [];
  for (let u = i; u <= a; u++)
    r.push(u);
  return r;
}, BS = (t, i) => {
  const a = t.scrollElement;
  if (!a)
    return;
  const r = t.targetWindow;
  if (!r)
    return;
  const u = (d) => {
    const { width: m, height: g } = d;
    i({ width: Math.round(m), height: Math.round(g) });
  };
  if (u(eh(a)), !r.ResizeObserver)
    return () => {
    };
  const c = new r.ResizeObserver((d) => {
    const m = () => {
      const g = d[0];
      if (g != null && g.borderBoxSize) {
        const p = g.borderBoxSize[0];
        if (p) {
          u({ width: p.inlineSize, height: p.blockSize });
          return;
        }
      }
      u(eh(a));
    };
    t.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(m) : m();
  });
  return c.observe(a, { box: "border-box" }), () => {
    c.unobserve(a);
  };
}, th = {
  passive: !0
}, nh = typeof window > "u" ? !0 : "onscrollend" in window, qS = (t, i) => {
  const a = t.scrollElement;
  if (!a)
    return;
  const r = t.targetWindow;
  if (!r)
    return;
  let u = 0;
  const c = t.options.useScrollendEvent && nh ? () => {
  } : VS(
    r,
    () => {
      i(u, !1);
    },
    t.options.isScrollingResetDelay
  ), d = (v) => () => {
    const { horizontal: w, isRtl: S } = t.options;
    u = w ? a.scrollLeft * (S && -1 || 1) : a.scrollTop, c(), i(u, v);
  }, m = d(!0), g = d(!1);
  g(), a.addEventListener("scroll", m, th);
  const p = t.options.useScrollendEvent && nh;
  return p && a.addEventListener("scrollend", g, th), () => {
    a.removeEventListener("scroll", m), p && a.removeEventListener("scrollend", g);
  };
}, GS = (t, i, a) => {
  if (i != null && i.borderBoxSize) {
    const r = i.borderBoxSize[0];
    if (r)
      return Math.round(
        r[a.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return t[a.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, YS = (t, {
  adjustments: i = 0,
  behavior: a
}, r) => {
  var u, c;
  const d = t + i;
  (c = (u = r.scrollElement) == null ? void 0 : u.scrollTo) == null || c.call(u, {
    [r.options.horizontal ? "left" : "top"]: d,
    behavior: a
  });
};
class IS {
  constructor(i) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollToIndexTimeoutId = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let a = null;
      const r = () => a || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : a = new this.targetWindow.ResizeObserver((u) => {
        u.forEach((c) => {
          const d = () => {
            this._measureElement(c.target, c);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(d) : d();
        });
      }));
      return {
        disconnect: () => {
          var u;
          (u = r()) == null || u.disconnect(), a = null;
        },
        observe: (u) => {
          var c;
          return (c = r()) == null ? void 0 : c.observe(u, { box: "border-box" });
        },
        unobserve: (u) => {
          var c;
          return (c = r()) == null ? void 0 : c.unobserve(u);
        }
      };
    })(), this.range = null, this.setOptions = (a) => {
      Object.entries(a).forEach(([r, u]) => {
        typeof u > "u" && delete a[r];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: kS,
        rangeExtractor: US,
        onChange: () => {
        },
        measureElement: GS,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        ...a
      };
    }, this.notify = (a) => {
      var r, u;
      (u = (r = this.options).onChange) == null || u.call(r, this, a);
    }, this.maybeNotify = li(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (a) => {
        this.notify(a);
      },
      {
        key: gr.NODE_ENV !== "production",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((a) => a()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var a;
      const r = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== r) {
        if (this.cleanup(), !r) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((a = this.scrollElement) == null ? void 0 : a.window) ?? null, this.elementsCache.forEach((u) => {
          this.observer.observe(u);
        }), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        }), this.unsubs.push(
          this.options.observeElementRect(this, (u) => {
            this.scrollRect = u, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (u, c) => {
            this.scrollAdjustments = 0, this.scrollDirection = c ? this.getScrollOffset() < u ? "forward" : "backward" : null, this.scrollOffset = u, this.isScrolling = c, this.maybeNotify();
          })
        );
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (a, r) => {
      const u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
      for (let d = r - 1; d >= 0; d--) {
        const m = a[d];
        if (u.has(m.lane))
          continue;
        const g = c.get(
          m.lane
        );
        if (g == null || m.end > g.end ? c.set(m.lane, m) : m.end < g.end && u.set(m.lane, !0), u.size === this.options.lanes)
          break;
      }
      return c.size === this.options.lanes ? Array.from(c.values()).sort((d, m) => d.end === m.end ? d.index - m.index : d.end - m.end)[0] : void 0;
    }, this.getMeasurementOptions = li(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (a, r, u, c, d) => (this.pendingMeasuredCacheIndexes = [], {
        count: a,
        paddingStart: r,
        scrollMargin: u,
        getItemKey: c,
        enabled: d
      }),
      {
        key: !1
      }
    ), this.getMeasurements = li(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: a, paddingStart: r, scrollMargin: u, getItemKey: c, enabled: d }, m) => {
        if (!d)
          return this.measurementsCache = [], this.itemSizeCache.clear(), [];
        this.measurementsCache.length === 0 && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((v) => {
          this.itemSizeCache.set(v.key, v.size);
        }));
        const g = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const p = this.measurementsCache.slice(0, g);
        for (let v = g; v < a; v++) {
          const w = c(v), S = this.options.lanes === 1 ? p[v - 1] : this.getFurthestMeasurement(p, v), y = S ? S.end + this.options.gap : r + u, b = m.get(w), R = typeof b == "number" ? b : this.options.estimateSize(v), M = y + R, N = S ? S.lane : v % this.options.lanes;
          p[v] = {
            index: v,
            start: y,
            size: R,
            end: M,
            key: w,
            lane: N
          };
        }
        return this.measurementsCache = p, p;
      },
      {
        key: gr.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.calculateRange = li(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (a, r, u, c) => this.range = a.length > 0 && r > 0 ? XS({
        measurements: a,
        outerSize: r,
        scrollOffset: u,
        lanes: c
      }) : null,
      {
        key: gr.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = li(
      () => {
        let a = null, r = null;
        const u = this.calculateRange();
        return u && (a = u.startIndex, r = u.endIndex), this.maybeNotify.updateDeps([this.isScrolling, a, r]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          a,
          r
        ];
      },
      (a, r, u, c, d) => c === null || d === null ? [] : a({
        startIndex: c,
        endIndex: d,
        overscan: r,
        count: u
      }),
      {
        key: gr.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (a) => {
      const r = this.options.indexAttribute, u = a.getAttribute(r);
      return u ? parseInt(u, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (a, r) => {
      const u = this.indexFromElement(a), c = this.measurementsCache[u];
      if (!c)
        return;
      const d = c.key, m = this.elementsCache.get(d);
      m !== a && (m && this.observer.unobserve(m), this.observer.observe(a), this.elementsCache.set(d, a)), a.isConnected && this.resizeItem(u, this.options.measureElement(a, r, this));
    }, this.resizeItem = (a, r) => {
      const u = this.measurementsCache[a];
      if (!u)
        return;
      const c = this.itemSizeCache.get(u.key) ?? u.size, d = r - c;
      d !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(u, d, this) : u.start < this.getScrollOffset() + this.scrollAdjustments) && this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += d,
        behavior: void 0
      }), this.pendingMeasuredCacheIndexes.push(u.index), this.itemSizeCache = new Map(this.itemSizeCache.set(u.key, r)), this.notify(!1));
    }, this.measureElement = (a) => {
      if (!a) {
        this.elementsCache.forEach((r, u) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(u));
        });
        return;
      }
      this._measureElement(a, void 0);
    }, this.getVirtualItems = li(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (a, r) => {
        const u = [];
        for (let c = 0, d = a.length; c < d; c++) {
          const m = a[c], g = r[m];
          u.push(g);
        }
        return u;
      },
      {
        key: gr.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (a) => {
      const r = this.getMeasurements();
      if (r.length !== 0)
        return Xc(
          r[hv(
            0,
            r.length - 1,
            (u) => Xc(r[u]).start,
            a
          )]
        );
    }, this.getOffsetForAlignment = (a, r, u = 0) => {
      const c = this.getSize(), d = this.getScrollOffset();
      r === "auto" && (r = a >= d + c ? "end" : "start"), r === "center" ? a += (u - c) / 2 : r === "end" && (a -= c);
      const m = this.getTotalSize() - c;
      return Math.max(Math.min(m, a), 0);
    }, this.getOffsetForIndex = (a, r = "auto") => {
      a = Math.max(0, Math.min(a, this.options.count - 1));
      const u = this.measurementsCache[a];
      if (!u)
        return;
      const c = this.getSize(), d = this.getScrollOffset();
      if (r === "auto")
        if (u.end >= d + c - this.options.scrollPaddingEnd)
          r = "end";
        else if (u.start <= d + this.options.scrollPaddingStart)
          r = "start";
        else
          return [d, r];
      const m = r === "end" ? u.end + this.options.scrollPaddingEnd : u.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(m, r, u.size),
        r
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.cancelScrollToIndex = () => {
      this.scrollToIndexTimeoutId !== null && this.targetWindow && (this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId), this.scrollToIndexTimeoutId = null);
    }, this.scrollToOffset = (a, { align: r = "start", behavior: u } = {}) => {
      this.cancelScrollToIndex(), u === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(a, r), {
        adjustments: void 0,
        behavior: u
      });
    }, this.scrollToIndex = (a, { align: r = "auto", behavior: u } = {}) => {
      a = Math.max(0, Math.min(a, this.options.count - 1)), this.cancelScrollToIndex(), u === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      );
      const c = this.getOffsetForIndex(a, r);
      if (!c) return;
      const [d, m] = c;
      this._scrollToOffset(d, { adjustments: void 0, behavior: u }), u !== "smooth" && this.isDynamicMode() && this.targetWindow && (this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
        if (this.scrollToIndexTimeoutId = null, this.elementsCache.has(
          this.options.getItemKey(a)
        )) {
          const [p] = Xc(
            this.getOffsetForIndex(a, m)
          ), v = this.getScrollOffset();
          FS(p, v) || this.scrollToIndex(a, { align: m, behavior: u });
        } else
          this.scrollToIndex(a, { align: m, behavior: u });
      }));
    }, this.scrollBy = (a, { behavior: r } = {}) => {
      this.cancelScrollToIndex(), r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + a, {
        adjustments: void 0,
        behavior: r
      });
    }, this.getTotalSize = () => {
      var a;
      const r = this.getMeasurements();
      let u;
      if (r.length === 0)
        u = this.options.paddingStart;
      else if (this.options.lanes === 1)
        u = ((a = r[r.length - 1]) == null ? void 0 : a.end) ?? 0;
      else {
        const c = Array(this.options.lanes).fill(null);
        let d = r.length - 1;
        for (; d >= 0 && c.some((m) => m === null); ) {
          const m = r[d];
          c[m.lane] === null && (c[m.lane] = m.end), d--;
        }
        u = Math.max(...c.filter((m) => m !== null));
      }
      return Math.max(
        u - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (a, {
      adjustments: r,
      behavior: u
    }) => {
      this.options.scrollToFn(a, { behavior: u, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(i);
  }
}
const hv = (t, i, a, r) => {
  for (; t <= i; ) {
    const u = (t + i) / 2 | 0, c = a(u);
    if (c < r)
      t = u + 1;
    else if (c > r)
      i = u - 1;
    else
      return u;
  }
  return t > 0 ? t - 1 : 0;
};
function XS({
  measurements: t,
  outerSize: i,
  scrollOffset: a,
  lanes: r
}) {
  const u = t.length - 1, c = (g) => t[g].start;
  if (t.length <= r)
    return {
      startIndex: 0,
      endIndex: u
    };
  let d = hv(
    0,
    u,
    c,
    a
  ), m = d;
  if (r === 1)
    for (; m < u && t[m].end < a + i; )
      m++;
  else if (r > 1) {
    const g = Array(r).fill(0);
    for (; m < u && g.some((v) => v < a + i); ) {
      const v = t[m];
      g[v.lane] = v.end, m++;
    }
    const p = Array(r).fill(a + i);
    for (; d >= 0 && p.some((v) => v >= a); ) {
      const v = t[d];
      p[v.lane] = v.start, d--;
    }
    d = Math.max(0, d - d % r), m = Math.min(u, m + (r - 1 - m % r));
  }
  return { startIndex: d, endIndex: m };
}
const lh = typeof document < "u" ? H.useLayoutEffect : H.useEffect;
function ZS(t) {
  const i = H.useReducer(() => ({}), {})[1], a = {
    ...t,
    onChange: (u, c) => {
      var d;
      c ? fa(i) : i(), (d = t.onChange) == null || d.call(t, u, c);
    }
  }, [r] = H.useState(
    () => new IS(a)
  );
  return r.setOptions(a), lh(() => r._didMount(), []), lh(() => r._willUpdate()), r;
}
function QS(t) {
  return ZS({
    observeElementRect: BS,
    observeElementOffset: qS,
    scrollToFn: YS,
    ...t
  });
}
function KS(t, i) {
  return t !== null && i !== null && typeof t == "object" && typeof i == "object" && "id" in t && "id" in i ? t.id === i.id : t === i;
}
function PS(t = KS) {
  return ze((i, a) => {
    if (typeof t == "string") {
      let r = t;
      return (i == null ? void 0 : i[r]) === (a == null ? void 0 : a[r]);
    }
    return t(i, a);
  }, [t]);
}
function WS(t) {
  if (t === null) return { width: 0, height: 0 };
  let { width: i, height: a } = t.getBoundingClientRect();
  return { width: i, height: a };
}
function ah(t, i = !1) {
  let [a, r] = kf(() => ({}), {}), u = Me(() => WS(t), [t, a]);
  return ke(() => {
    if (!t) return;
    let c = new ResizeObserver(r);
    return c.observe(t), () => {
      c.disconnect();
    };
  }, [t]), i ? { width: `${u.width}px`, height: `${u.height}px` } : u;
}
let vv = class extends Map {
  constructor(i) {
    super(), this.factory = i;
  }
  get(i) {
    let a = super.get(i);
    return a === void 0 && (a = this.factory(i), this.set(i, a)), a;
  }
};
var JS = Object.defineProperty, ex = (t, i, a) => i in t ? JS(t, i, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[i] = a, tx = (t, i, a) => (ex(t, i + "", a), a), yv = (t, i, a) => {
  if (!i.has(t)) throw TypeError("Cannot " + a);
}, gn = (t, i, a) => (yv(t, i, "read from private field"), a ? a.call(t) : i.get(t)), Zc = (t, i, a) => {
  if (i.has(t)) throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, a);
}, ih = (t, i, a, r) => (yv(t, i, "write to private field"), i.set(t, a), a), Nn, vr, yr;
let bv = class {
  constructor(i) {
    Zc(this, Nn, {}), Zc(this, vr, new vv(() => /* @__PURE__ */ new Set())), Zc(this, yr, /* @__PURE__ */ new Set()), tx(this, "disposables", Ln()), ih(this, Nn, i);
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return gn(this, Nn);
  }
  subscribe(i, a) {
    let r = { selector: i, callback: a, current: i(gn(this, Nn)) };
    return gn(this, yr).add(r), this.disposables.add(() => {
      gn(this, yr).delete(r);
    });
  }
  on(i, a) {
    return gn(this, vr).get(i).add(a), this.disposables.add(() => {
      gn(this, vr).get(i).delete(a);
    });
  }
  send(i) {
    let a = this.reduce(gn(this, Nn), i);
    if (a !== gn(this, Nn)) {
      ih(this, Nn, a);
      for (let r of gn(this, yr)) {
        let u = r.selector(gn(this, Nn));
        Sv(r.current, u) || (r.current = u, r.callback(u));
      }
      for (let r of gn(this, vr).get(i.type)) r(gn(this, Nn), i);
    }
  }
};
Nn = /* @__PURE__ */ new WeakMap(), vr = /* @__PURE__ */ new WeakMap(), yr = /* @__PURE__ */ new WeakMap();
function Sv(t, i) {
  return Object.is(t, i) ? !0 : typeof t != "object" || t === null || typeof i != "object" || i === null ? !1 : Array.isArray(t) && Array.isArray(i) ? t.length !== i.length ? !1 : Qc(t[Symbol.iterator](), i[Symbol.iterator]()) : t instanceof Map && i instanceof Map || t instanceof Set && i instanceof Set ? t.size !== i.size ? !1 : Qc(t.entries(), i.entries()) : rh(t) && rh(i) ? Qc(Object.entries(t)[Symbol.iterator](), Object.entries(i)[Symbol.iterator]()) : !1;
}
function Qc(t, i) {
  do {
    let a = t.next(), r = i.next();
    if (a.done && r.done) return !0;
    if (a.done || r.done || !Object.is(a.value, r.value)) return !1;
  } while (!0);
}
function rh(t) {
  if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
  let i = Object.getPrototypeOf(t);
  return i === null || Object.getPrototypeOf(i) === null;
}
var nx = Object.defineProperty, lx = (t, i, a) => i in t ? nx(t, i, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[i] = a, oh = (t, i, a) => (lx(t, typeof i != "symbol" ? i + "" : i, a), a), xv = ((t) => (t[t.Push = 0] = "Push", t[t.Pop = 1] = "Pop", t))(xv || {});
let ax = { 0(t, i) {
  let a = i.id, r = t.stack, u = t.stack.indexOf(a);
  if (u !== -1) {
    let c = t.stack.slice();
    return c.splice(u, 1), c.push(a), r = c, { ...t, stack: r };
  }
  return { ...t, stack: [...t.stack, a] };
}, 1(t, i) {
  let a = i.id, r = t.stack.indexOf(a);
  if (r === -1) return t;
  let u = t.stack.slice();
  return u.splice(r, 1), { ...t, stack: u };
} }, ix = class wv extends bv {
  constructor() {
    super(...arguments), oh(this, "actions", { push: (i) => this.send({ type: 0, id: i }), pop: (i) => this.send({ type: 1, id: i }) }), oh(this, "selectors", { isTop: (i, a) => i.stack[i.stack.length - 1] === a, inStack: (i, a) => i.stack.includes(a) });
  }
  static new() {
    return new wv({ stack: [] });
  }
  reduce(i, a) {
    return zt(a.type, ax, i, a);
  }
};
const Su = new vv(() => ix.new());
var Kc = { exports: {} }, Pc = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uh;
function rx() {
  if (uh) return Pc;
  uh = 1;
  var t = ie;
  function i(g, p) {
    return g === p && (g !== 0 || 1 / g === 1 / p) || g !== g && p !== p;
  }
  var a = typeof Object.is == "function" ? Object.is : i, r = t.useSyncExternalStore, u = t.useRef, c = t.useEffect, d = t.useMemo, m = t.useDebugValue;
  return Pc.useSyncExternalStoreWithSelector = function(g, p, v, w, S) {
    var y = u(null);
    if (y.current === null) {
      var b = { hasValue: !1, value: null };
      y.current = b;
    } else b = y.current;
    y = d(
      function() {
        function M(Y) {
          if (!N) {
            if (N = !0, j = Y, Y = w(Y), S !== void 0 && b.hasValue) {
              var Q = b.value;
              if (S(Q, Y))
                return $ = Q;
            }
            return $ = Y;
          }
          if (Q = $, a(j, Y)) return Q;
          var ee = w(Y);
          return S !== void 0 && S(Q, ee) ? (j = Y, Q) : (j = Y, $ = ee);
        }
        var N = !1, j, $, B = v === void 0 ? null : v;
        return [
          function() {
            return M(p());
          },
          B === null ? void 0 : function() {
            return M(B());
          }
        ];
      },
      [p, v, w, S]
    );
    var R = r(g, y[0], y[1]);
    return c(
      function() {
        b.hasValue = !0, b.value = R;
      },
      [R]
    ), m(R), R;
  }, Pc;
}
var sh;
function ox() {
  return sh || (sh = 1, Kc.exports = rx()), Kc.exports;
}
var ux = ox();
function dt(t, i, a = Sv) {
  return ux.useSyncExternalStoreWithSelector(ve((r) => t.subscribe(sx, r)), ve(() => t.state), ve(() => t.state), ve(i), a);
}
function sx(t) {
  return t;
}
function Dr(t, i) {
  let a = Rn(), r = Su.get(i), [u, c] = dt(r, ze((d) => [r.selectors.isTop(d, a), r.selectors.inStack(d, a)], [r, a]));
  return ke(() => {
    if (t) return r.actions.push(a), () => r.actions.pop(a);
  }, [r, t, a]), t ? c ? u : !0 : !1;
}
let bf = /* @__PURE__ */ new Map(), xr = /* @__PURE__ */ new Map();
function ch(t) {
  var i;
  let a = (i = xr.get(t)) != null ? i : 0;
  return xr.set(t, a + 1), a !== 0 ? () => fh(t) : (bf.set(t, { "aria-hidden": t.getAttribute("aria-hidden"), inert: t.inert }), t.setAttribute("aria-hidden", "true"), t.inert = !0, () => fh(t));
}
function fh(t) {
  var i;
  let a = (i = xr.get(t)) != null ? i : 1;
  if (a === 1 ? xr.delete(t) : xr.set(t, a - 1), a !== 1) return;
  let r = bf.get(t);
  r && (r["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", r["aria-hidden"]), t.inert = r.inert, bf.delete(t));
}
function Ev(t, { allowed: i, disallowed: a } = {}) {
  let r = Dr(t, "inert-others");
  ke(() => {
    var u, c;
    if (!r) return;
    let d = Ln();
    for (let g of (u = a == null ? void 0 : a()) != null ? u : []) g && d.add(ch(g));
    let m = (c = i == null ? void 0 : i()) != null ? c : [];
    for (let g of m) {
      if (!g) continue;
      let p = fi(g);
      if (!p) continue;
      let v = g.parentElement;
      for (; v && v !== p.body; ) {
        for (let w of v.children) m.some((S) => w.contains(S)) || d.add(ch(w));
        v = v.parentElement;
      }
    }
    return d.dispose;
  }, [r, i, a]);
}
function Cv(t, i, a) {
  let r = kl((u) => {
    let c = u.getBoundingClientRect();
    c.x === 0 && c.y === 0 && c.width === 0 && c.height === 0 && a();
  });
  Ve(() => {
    if (!t) return;
    let u = i === null ? null : hn(i) ? i : i.current;
    if (!u) return;
    let c = Ln();
    if (typeof ResizeObserver < "u") {
      let d = new ResizeObserver(() => r.current(u));
      d.observe(u), c.add(() => d.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let d = new IntersectionObserver(() => r.current(u));
      d.observe(u), c.add(() => d.disconnect());
    }
    return () => c.dispose();
  }, [i, r, t]);
}
let cu = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((t) => `${t}:not([tabindex='-1'])`).join(","), cx = ["[data-autofocus]"].map((t) => `${t}:not([tabindex='-1'])`).join(",");
var el = ((t) => (t[t.First = 1] = "First", t[t.Previous = 2] = "Previous", t[t.Next = 4] = "Next", t[t.Last = 8] = "Last", t[t.WrapAround = 16] = "WrapAround", t[t.NoScroll = 32] = "NoScroll", t[t.AutoFocus = 64] = "AutoFocus", t))(el || {}), Sf = ((t) => (t[t.Error = 0] = "Error", t[t.Overflow = 1] = "Overflow", t[t.Success = 2] = "Success", t[t.Underflow = 3] = "Underflow", t))(Sf || {}), fx = ((t) => (t[t.Previous = -1] = "Previous", t[t.Next = 1] = "Next", t))(fx || {});
function dx(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(cu)).sort((i, a) => Math.sign((i.tabIndex || Number.MAX_SAFE_INTEGER) - (a.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function mx(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(cx)).sort((i, a) => Math.sign((i.tabIndex || Number.MAX_SAFE_INTEGER) - (a.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Rv = ((t) => (t[t.Strict = 0] = "Strict", t[t.Loose = 1] = "Loose", t))(Rv || {});
function gx(t, i = 0) {
  var a;
  return t === ((a = fi(t)) == null ? void 0 : a.body) ? !1 : zt(i, { 0() {
    return t.matches(cu);
  }, 1() {
    let r = t;
    for (; r !== null; ) {
      if (r.matches(cu)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var px = ((t) => (t[t.Keyboard = 0] = "Keyboard", t[t.Mouse = 1] = "Mouse", t))(px || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (t) => {
  t.metaKey || t.altKey || t.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (t) => {
  t.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : t.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function al(t) {
  t == null || t.focus({ preventScroll: !0 });
}
let hx = ["textarea", "input"].join(",");
function vx(t) {
  var i, a;
  return (a = (i = t == null ? void 0 : t.matches) == null ? void 0 : i.call(t, hx)) != null ? a : !1;
}
function Tv(t, i = (a) => a) {
  return t.slice().sort((a, r) => {
    let u = i(a), c = i(r);
    if (u === null || c === null) return 0;
    let d = u.compareDocumentPosition(c);
    return d & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : d & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function wr(t, i, { sorted: a = !0, relativeTo: r = null, skipElements: u = [] } = {}) {
  let c = Array.isArray(t) ? t.length > 0 ? t[0].ownerDocument : document : t.ownerDocument, d = Array.isArray(t) ? a ? Tv(t) : t : i & 64 ? mx(t) : dx(t);
  u.length > 0 && d.length > 1 && (d = d.filter((y) => !u.some((b) => b != null && "current" in b ? (b == null ? void 0 : b.current) === y : b === y))), r = r ?? c.activeElement;
  let m = (() => {
    if (i & 5) return 1;
    if (i & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), g = (() => {
    if (i & 1) return 0;
    if (i & 2) return Math.max(0, d.indexOf(r)) - 1;
    if (i & 4) return Math.max(0, d.indexOf(r)) + 1;
    if (i & 8) return d.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = i & 32 ? { preventScroll: !0 } : {}, v = 0, w = d.length, S;
  do {
    if (v >= w || v + w <= 0) return 0;
    let y = g + v;
    if (i & 16) y = (y + w) % w;
    else {
      if (y < 0) return 3;
      if (y >= w) return 1;
    }
    S = d[y], S == null || S.focus(p), v += m;
  } while (S !== c.activeElement);
  return i & 6 && vx(S) && S.select(), 2;
}
function Mv() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function yx() {
  return /Android/gi.test(window.navigator.userAgent);
}
function xf() {
  return Mv() || yx();
}
function ai(t, i, a, r) {
  let u = kl(a);
  Ve(() => {
    if (!t) return;
    function c(d) {
      u.current(d);
    }
    return document.addEventListener(i, c, r), () => document.removeEventListener(i, c, r);
  }, [t, i, r]);
}
function Ov(t, i, a, r) {
  let u = kl(a);
  Ve(() => {
    if (!t) return;
    function c(d) {
      u.current(d);
    }
    return window.addEventListener(i, c, r), () => window.removeEventListener(i, c, r);
  }, [t, i, r]);
}
const dh = 30;
function _v(t, i, a) {
  let r = kl(a), u = ze(function(m, g) {
    if (m.defaultPrevented) return;
    let p = g(m);
    if (p === null || !p.getRootNode().contains(p) || !p.isConnected) return;
    let v = function w(S) {
      return typeof S == "function" ? w(S()) : Array.isArray(S) || S instanceof Set ? S : [S];
    }(i);
    for (let w of v) if (w !== null && (w.contains(p) || m.composed && m.composedPath().includes(w))) return;
    return !gx(p, Rv.Loose) && p.tabIndex !== -1 && m.preventDefault(), r.current(m, p);
  }, [r, i]), c = pe(null);
  ai(t, "pointerdown", (m) => {
    var g, p;
    xf() || (c.current = ((p = (g = m.composedPath) == null ? void 0 : g.call(m)) == null ? void 0 : p[0]) || m.target);
  }, !0), ai(t, "pointerup", (m) => {
    if (xf() || !c.current) return;
    let g = c.current;
    return c.current = null, u(m, () => g);
  }, !0);
  let d = pe({ x: 0, y: 0 });
  ai(t, "touchstart", (m) => {
    d.current.x = m.touches[0].clientX, d.current.y = m.touches[0].clientY;
  }, !0), ai(t, "touchend", (m) => {
    let g = { x: m.changedTouches[0].clientX, y: m.changedTouches[0].clientY };
    if (!(Math.abs(g.x - d.current.x) >= dh || Math.abs(g.y - d.current.y) >= dh)) return u(m, () => nl(m.target) ? m.target : null);
  }, !0), Ov(t, "blur", (m) => u(m, () => bS(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function ha(...t) {
  return Me(() => fi(...t), [...t]);
}
var bx = ((t) => (t[t.Ignore = 0] = "Ignore", t[t.Select = 1] = "Select", t[t.Close = 2] = "Close", t))(bx || {});
const pr = { Ignore: { kind: 0 }, Select: (t) => ({ kind: 1, target: t }), Close: { kind: 2 } }, Sx = 200;
function xx(t, { trigger: i, action: a, close: r, select: u }) {
  let c = pe(null);
  ai(t && i !== null, "pointerdown", (d) => {
    If(d == null ? void 0 : d.target) && i != null && i.contains(d.target) && (c.current = /* @__PURE__ */ new Date());
  }), ai(t && i !== null, "pointerup", (d) => {
    if (c.current === null || !nl(d.target)) return;
    let m = a(d), g = (/* @__PURE__ */ new Date()).getTime() - c.current.getTime();
    switch (c.current = null, m.kind) {
      case 0:
        return;
      case 1: {
        g > Sx && (u(m.target), r());
        break;
      }
      case 2: {
        r();
        break;
      }
    }
  }, { capture: !0 });
}
function Xf(t, i, a, r) {
  let u = kl(a);
  Ve(() => {
    t = t ?? window;
    function c(d) {
      u.current(d);
    }
    return t.addEventListener(i, c, r), () => t.removeEventListener(i, c, r);
  }, [t, i, r]);
}
function Av(t) {
  let i = pe({ value: "", selectionStart: null, selectionEnd: null });
  return Xf(t, "blur", (a) => {
    let r = a.target;
    su(r) && (i.current = { value: r.value, selectionStart: r.selectionStart, selectionEnd: r.selectionEnd });
  }), ve(() => {
    if (document.activeElement !== t && su(t) && t.isConnected) {
      if (t.focus({ preventScroll: !0 }), t.value !== i.current.value) t.setSelectionRange(t.value.length, t.value.length);
      else {
        let { selectionStart: a, selectionEnd: r } = i.current;
        a !== null && r !== null && t.setSelectionRange(a, r);
      }
      i.current = { value: "", selectionStart: null, selectionEnd: null };
    }
  });
}
function wx(t, i) {
  return Me(() => {
    var a;
    if (t.type) return t.type;
    let r = (a = t.as) != null ? a : "button";
    if (typeof r == "string" && r.toLowerCase() === "button" || (i == null ? void 0 : i.tagName) === "BUTTON" && !i.hasAttribute("type")) return "button";
  }, [t.type, t.as, i]);
}
function Ex(t) {
  return v1(t.subscribe, t.getSnapshot, t.getSnapshot);
}
function Cx(t, i) {
  let a = t(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return a;
  }, subscribe(u) {
    return r.add(u), () => r.delete(u);
  }, dispatch(u, ...c) {
    let d = i[u].call(a, ...c);
    d && (a = d, r.forEach((m) => m()));
  } };
}
function Rx() {
  let t;
  return { before({ doc: i }) {
    var a;
    let r = i.documentElement, u = (a = i.defaultView) != null ? a : window;
    t = Math.max(0, u.innerWidth - r.clientWidth);
  }, after({ doc: i, d: a }) {
    let r = i.documentElement, u = Math.max(0, r.clientWidth - r.offsetWidth), c = Math.max(0, t - u);
    a.style(r, "paddingRight", `${c}px`);
  } };
}
function Tx() {
  return Mv() ? { before({ doc: t, d: i, meta: a }) {
    function r(u) {
      return a.containers.flatMap((c) => c()).some((c) => c.contains(u));
    }
    i.microTask(() => {
      var u;
      if (window.getComputedStyle(t.documentElement).scrollBehavior !== "auto") {
        let m = Ln();
        m.style(t.documentElement, "scrollBehavior", "auto"), i.add(() => i.microTask(() => m.dispose()));
      }
      let c = (u = window.scrollY) != null ? u : window.pageYOffset, d = null;
      i.addEventListener(t, "click", (m) => {
        if (nl(m.target)) try {
          let g = m.target.closest("a");
          if (!g) return;
          let { hash: p } = new URL(g.href), v = t.querySelector(p);
          nl(v) && !r(v) && (d = v);
        } catch {
        }
      }, !0), i.addEventListener(t, "touchstart", (m) => {
        if (nl(m.target) && yS(m.target)) if (r(m.target)) {
          let g = m.target;
          for (; g.parentElement && r(g.parentElement); ) g = g.parentElement;
          i.style(g, "overscrollBehavior", "contain");
        } else i.style(m.target, "touchAction", "none");
      }), i.addEventListener(t, "touchmove", (m) => {
        if (nl(m.target)) {
          if (su(m.target)) return;
          if (r(m.target)) {
            let g = m.target;
            for (; g.parentElement && g.dataset.headlessuiPortal !== "" && !(g.scrollHeight > g.clientHeight || g.scrollWidth > g.clientWidth); ) g = g.parentElement;
            g.dataset.headlessuiPortal === "" && m.preventDefault();
          } else m.preventDefault();
        }
      }, { passive: !1 }), i.add(() => {
        var m;
        let g = (m = window.scrollY) != null ? m : window.pageYOffset;
        c !== g && window.scrollTo(0, c), d && d.isConnected && (d.scrollIntoView({ block: "nearest" }), d = null);
      });
    });
  } } : {};
}
function Mx() {
  return { before({ doc: t, d: i }) {
    i.style(t.documentElement, "overflow", "hidden");
  } };
}
function Ox(t) {
  let i = {};
  for (let a of t) Object.assign(i, a(i));
  return i;
}
let ma = Cx(() => /* @__PURE__ */ new Map(), { PUSH(t, i) {
  var a;
  let r = (a = this.get(t)) != null ? a : { doc: t, count: 0, d: Ln(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(i), this.set(t, r), this;
}, POP(t, i) {
  let a = this.get(t);
  return a && (a.count--, a.meta.delete(i)), this;
}, SCROLL_PREVENT({ doc: t, d: i, meta: a }) {
  let r = { doc: t, d: i, meta: Ox(a) }, u = [Tx(), Rx(), Mx()];
  u.forEach(({ before: c }) => c == null ? void 0 : c(r)), u.forEach(({ after: c }) => c == null ? void 0 : c(r));
}, SCROLL_ALLOW({ d: t }) {
  t.dispose();
}, TEARDOWN({ doc: t }) {
  this.delete(t);
} });
ma.subscribe(() => {
  let t = ma.getSnapshot(), i = /* @__PURE__ */ new Map();
  for (let [a] of t) i.set(a, a.documentElement.style.overflow);
  for (let a of t.values()) {
    let r = i.get(a.doc) === "hidden", u = a.count !== 0;
    (u && !r || !u && r) && ma.dispatch(a.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", a), a.count === 0 && ma.dispatch("TEARDOWN", a);
  }
});
function _x(t, i, a = () => ({ containers: [] })) {
  let r = Ex(ma), u = i ? r.get(i) : void 0, c = u ? u.count > 0 : !1;
  return ke(() => {
    if (!(!i || !t)) return ma.dispatch("PUSH", i, a), () => ma.dispatch("POP", i, a);
  }, [t, i]), c;
}
function Dv(t, i, a = () => [document.body]) {
  let r = Dr(t, "scroll-lock");
  _x(r, i, (u) => {
    var c;
    return { containers: [...(c = u.containers) != null ? c : [], a] };
  });
}
function mh(t) {
  return [t.screenX, t.screenY];
}
function Ax() {
  let t = pe([-1, -1]);
  return { wasMoved(i) {
    let a = mh(i);
    return t.current[0] === a[0] && t.current[1] === a[1] ? !1 : (t.current = a, !0);
  }, update(i) {
    t.current = mh(i);
  } };
}
function Dx(t = 0) {
  let [i, a] = Ee(t), r = ze((g) => a(g), [i]), u = ze((g) => a((p) => p | g), [i]), c = ze((g) => (i & g) === g, [i]), d = ze((g) => a((p) => p & ~g), [a]), m = ze((g) => a((p) => p ^ g), [a]);
  return { flags: i, setFlag: r, addFlag: u, hasFlag: c, removeFlag: d, toggleFlag: m };
}
var Nx = { NODE_ENV: "production" }, gh, ph;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((gh = process == null ? void 0 : Nx) == null ? void 0 : gh.NODE_ENV) === "test" && typeof ((ph = Element == null ? void 0 : Element.prototype) == null ? void 0 : ph.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var jx = ((t) => (t[t.None = 0] = "None", t[t.Closed = 1] = "Closed", t[t.Enter = 2] = "Enter", t[t.Leave = 4] = "Leave", t))(jx || {});
function Nv(t) {
  let i = {};
  for (let a in t) t[a] === !0 && (i[`data-${a}`] = "");
  return i;
}
function jv(t, i, a, r) {
  let [u, c] = Ee(a), { hasFlag: d, addFlag: m, removeFlag: g } = Dx(t && u ? 3 : 0), p = pe(!1), v = pe(!1), w = Sa();
  return ke(() => {
    var S;
    if (t) {
      if (a && c(!0), !i) {
        a && m(3);
        return;
      }
      return (S = r == null ? void 0 : r.start) == null || S.call(r, a), zx(i, { inFlight: p, prepare() {
        v.current ? v.current = !1 : v.current = p.current, p.current = !0, !v.current && (a ? (m(3), g(4)) : (m(4), g(2)));
      }, run() {
        v.current ? a ? (g(3), m(4)) : (g(4), m(3)) : a ? g(1) : m(1);
      }, done() {
        var y;
        v.current && typeof i.getAnimations == "function" && i.getAnimations().length > 0 || (p.current = !1, g(7), a || c(!1), (y = r == null ? void 0 : r.end) == null || y.call(r, a));
      } });
    }
  }, [t, a, i, w]), t ? [u, { closed: d(1), enter: d(2), leave: d(4), transition: d(2) || d(4) }] : [a, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function zx(t, { prepare: i, run: a, done: r, inFlight: u }) {
  let c = Ln();
  return Lx(t, { prepare: i, inFlight: u }), c.nextFrame(() => {
    a(), c.requestAnimationFrame(() => {
      c.add($x(t, r));
    });
  }), c.dispose;
}
function $x(t, i) {
  var a, r;
  let u = Ln();
  if (!t) return u.dispose;
  let c = !1;
  u.add(() => {
    c = !0;
  });
  let d = (r = (a = t.getAnimations) == null ? void 0 : a.call(t).filter((m) => m instanceof CSSTransition)) != null ? r : [];
  return d.length === 0 ? (i(), u.dispose) : (Promise.allSettled(d.map((m) => m.finished)).then(() => {
    c || i();
  }), u.dispose);
}
function Lx(t, { inFlight: i, prepare: a }) {
  if (i != null && i.current) {
    a();
    return;
  }
  let r = t.style.transition;
  t.style.transition = "none", a(), t.offsetHeight, t.style.transition = r;
}
function Hx(t, { container: i, accept: a, walk: r }) {
  let u = pe(a), c = pe(r);
  Ve(() => {
    u.current = a, c.current = r;
  }, [a, r]), ke(() => {
    if (!i || !t) return;
    let d = fi(i);
    if (!d) return;
    let m = u.current, g = c.current, p = Object.assign((w) => m(w), { acceptNode: m }), v = d.createTreeWalker(i, NodeFilter.SHOW_ELEMENT, p, !1);
    for (; v.nextNode(); ) g(v.currentNode);
  }, [i, t, u, c]);
}
function Rr(t, i) {
  let a = pe([]), r = ve(t);
  Ve(() => {
    let u = [...a.current];
    for (let [c, d] of i.entries()) if (a.current[c] !== d) {
      let m = r(i, u);
      return a.current = i, m;
    }
  }, [r, ...i]);
}
function xu() {
  return typeof window < "u";
}
function di(t) {
  return zv(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Qt(t) {
  var i;
  return (t == null || (i = t.ownerDocument) == null ? void 0 : i.defaultView) || window;
}
function Hn(t) {
  var i;
  return (i = (zv(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : i.documentElement;
}
function zv(t) {
  return xu() ? t instanceof Node || t instanceof Qt(t).Node : !1;
}
function Nt(t) {
  return xu() ? t instanceof Element || t instanceof Qt(t).Element : !1;
}
function $n(t) {
  return xu() ? t instanceof HTMLElement || t instanceof Qt(t).HTMLElement : !1;
}
function hh(t) {
  return !xu() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Qt(t).ShadowRoot;
}
function Nr(t) {
  const {
    overflow: i,
    overflowX: a,
    overflowY: r,
    display: u
  } = Cn(t);
  return /auto|scroll|overlay|hidden|clip/.test(i + r + a) && !["inline", "contents"].includes(u);
}
function Fx(t) {
  return ["table", "td", "th"].includes(di(t));
}
function wu(t) {
  return [":popover-open", ":modal"].some((i) => {
    try {
      return t.matches(i);
    } catch {
      return !1;
    }
  });
}
function Zf(t) {
  const i = Qf(), a = Nt(t) ? Cn(t) : t;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => a[r] ? a[r] !== "none" : !1) || (a.containerType ? a.containerType !== "normal" : !1) || !i && (a.backdropFilter ? a.backdropFilter !== "none" : !1) || !i && (a.filter ? a.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (a.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (a.contain || "").includes(r));
}
function Vx(t) {
  let i = Ll(t);
  for (; $n(i) && !ci(i); ) {
    if (Zf(i))
      return i;
    if (wu(i))
      return null;
    i = Ll(i);
  }
  return null;
}
function Qf() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ci(t) {
  return ["html", "body", "#document"].includes(di(t));
}
function Cn(t) {
  return Qt(t).getComputedStyle(t);
}
function Eu(t) {
  return Nt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Ll(t) {
  if (di(t) === "html")
    return t;
  const i = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    hh(t) && t.host || // Fallback.
    Hn(t)
  );
  return hh(i) ? i.host : i;
}
function $v(t) {
  const i = Ll(t);
  return ci(i) ? t.ownerDocument ? t.ownerDocument.body : t.body : $n(i) && Nr(i) ? i : $v(i);
}
function Tr(t, i, a) {
  var r;
  i === void 0 && (i = []), a === void 0 && (a = !0);
  const u = $v(t), c = u === ((r = t.ownerDocument) == null ? void 0 : r.body), d = Qt(u);
  if (c) {
    const m = wf(d);
    return i.concat(d, d.visualViewport || [], Nr(u) ? u : [], m && a ? Tr(m) : []);
  }
  return i.concat(u, Tr(u, [], a));
}
function wf(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function kx() {
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? t.brands.map((i) => {
    let {
      brand: a,
      version: r
    } = i;
    return a + "/" + r;
  }).join(" ") : navigator.userAgent;
}
const va = Math.min, Ot = Math.max, Mr = Math.round, eu = Math.floor, zn = (t) => ({
  x: t,
  y: t
}), Ux = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Bx = {
  start: "end",
  end: "start"
};
function vh(t, i, a) {
  return Ot(t, va(i, a));
}
function mi(t, i) {
  return typeof t == "function" ? t(i) : t;
}
function Hl(t) {
  return t.split("-")[0];
}
function jr(t) {
  return t.split("-")[1];
}
function Lv(t) {
  return t === "x" ? "y" : "x";
}
function Hv(t) {
  return t === "y" ? "height" : "width";
}
function zl(t) {
  return ["top", "bottom"].includes(Hl(t)) ? "y" : "x";
}
function Fv(t) {
  return Lv(zl(t));
}
function qx(t, i, a) {
  a === void 0 && (a = !1);
  const r = jr(t), u = Fv(t), c = Hv(u);
  let d = u === "x" ? r === (a ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return i.reference[c] > i.floating[c] && (d = fu(d)), [d, fu(d)];
}
function Gx(t) {
  const i = fu(t);
  return [Ef(t), i, Ef(i)];
}
function Ef(t) {
  return t.replace(/start|end/g, (i) => Bx[i]);
}
function Yx(t, i, a) {
  const r = ["left", "right"], u = ["right", "left"], c = ["top", "bottom"], d = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return a ? i ? u : r : i ? r : u;
    case "left":
    case "right":
      return i ? c : d;
    default:
      return [];
  }
}
function Ix(t, i, a, r) {
  const u = jr(t);
  let c = Yx(Hl(t), a === "start", r);
  return u && (c = c.map((d) => d + "-" + u), i && (c = c.concat(c.map(Ef)))), c;
}
function fu(t) {
  return t.replace(/left|right|bottom|top/g, (i) => Ux[i]);
}
function Xx(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Zx(t) {
  return typeof t != "number" ? Xx(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function du(t) {
  const {
    x: i,
    y: a,
    width: r,
    height: u
  } = t;
  return {
    width: r,
    height: u,
    top: a,
    left: i,
    right: i + r,
    bottom: a + u,
    x: i,
    y: a
  };
}
function yh(t, i, a) {
  let {
    reference: r,
    floating: u
  } = t;
  const c = zl(i), d = Fv(i), m = Hv(d), g = Hl(i), p = c === "y", v = r.x + r.width / 2 - u.width / 2, w = r.y + r.height / 2 - u.height / 2, S = r[m] / 2 - u[m] / 2;
  let y;
  switch (g) {
    case "top":
      y = {
        x: v,
        y: r.y - u.height
      };
      break;
    case "bottom":
      y = {
        x: v,
        y: r.y + r.height
      };
      break;
    case "right":
      y = {
        x: r.x + r.width,
        y: w
      };
      break;
    case "left":
      y = {
        x: r.x - u.width,
        y: w
      };
      break;
    default:
      y = {
        x: r.x,
        y: r.y
      };
  }
  switch (jr(i)) {
    case "start":
      y[d] -= S * (a && p ? -1 : 1);
      break;
    case "end":
      y[d] += S * (a && p ? -1 : 1);
      break;
  }
  return y;
}
const Qx = async (t, i, a) => {
  const {
    placement: r = "bottom",
    strategy: u = "absolute",
    middleware: c = [],
    platform: d
  } = a, m = c.filter(Boolean), g = await (d.isRTL == null ? void 0 : d.isRTL(i));
  let p = await d.getElementRects({
    reference: t,
    floating: i,
    strategy: u
  }), {
    x: v,
    y: w
  } = yh(p, r, g), S = r, y = {}, b = 0;
  for (let R = 0; R < m.length; R++) {
    const {
      name: M,
      fn: N
    } = m[R], {
      x: j,
      y: $,
      data: B,
      reset: Y
    } = await N({
      x: v,
      y: w,
      initialPlacement: r,
      placement: S,
      strategy: u,
      middlewareData: y,
      rects: p,
      platform: d,
      elements: {
        reference: t,
        floating: i
      }
    });
    v = j ?? v, w = $ ?? w, y = {
      ...y,
      [M]: {
        ...y[M],
        ...B
      }
    }, Y && b <= 50 && (b++, typeof Y == "object" && (Y.placement && (S = Y.placement), Y.rects && (p = Y.rects === !0 ? await d.getElementRects({
      reference: t,
      floating: i,
      strategy: u
    }) : Y.rects), {
      x: v,
      y: w
    } = yh(p, S, g)), R = -1);
  }
  return {
    x: v,
    y: w,
    placement: S,
    strategy: u,
    middlewareData: y
  };
};
async function Cu(t, i) {
  var a;
  i === void 0 && (i = {});
  const {
    x: r,
    y: u,
    platform: c,
    rects: d,
    elements: m,
    strategy: g
  } = t, {
    boundary: p = "clippingAncestors",
    rootBoundary: v = "viewport",
    elementContext: w = "floating",
    altBoundary: S = !1,
    padding: y = 0
  } = mi(i, t), b = Zx(y), M = m[S ? w === "floating" ? "reference" : "floating" : w], N = du(await c.getClippingRect({
    element: (a = await (c.isElement == null ? void 0 : c.isElement(M))) == null || a ? M : M.contextElement || await (c.getDocumentElement == null ? void 0 : c.getDocumentElement(m.floating)),
    boundary: p,
    rootBoundary: v,
    strategy: g
  })), j = w === "floating" ? {
    x: r,
    y: u,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, $ = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(m.floating)), B = await (c.isElement == null ? void 0 : c.isElement($)) ? await (c.getScale == null ? void 0 : c.getScale($)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, Y = du(c.convertOffsetParentRelativeRectToViewportRelativeRect ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: j,
    offsetParent: $,
    strategy: g
  }) : j);
  return {
    top: (N.top - Y.top + b.top) / B.y,
    bottom: (Y.bottom - N.bottom + b.bottom) / B.y,
    left: (N.left - Y.left + b.left) / B.x,
    right: (Y.right - N.right + b.right) / B.x
  };
}
const Kx = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(i) {
      var a, r;
      const {
        placement: u,
        middlewareData: c,
        rects: d,
        initialPlacement: m,
        platform: g,
        elements: p
      } = i, {
        mainAxis: v = !0,
        crossAxis: w = !0,
        fallbackPlacements: S,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: R = !0,
        ...M
      } = mi(t, i);
      if ((a = c.arrow) != null && a.alignmentOffset)
        return {};
      const N = Hl(u), j = zl(m), $ = Hl(m) === m, B = await (g.isRTL == null ? void 0 : g.isRTL(p.floating)), Y = S || ($ || !R ? [fu(m)] : Gx(m)), Q = b !== "none";
      !S && Q && Y.push(...Ix(m, R, b, B));
      const ee = [m, ...Y], O = await Cu(i, M), C = [];
      let _ = ((r = c.flip) == null ? void 0 : r.overflows) || [];
      if (v && C.push(O[N]), w) {
        const ue = qx(u, d, B);
        C.push(O[ue[0]], O[ue[1]]);
      }
      if (_ = [..._, {
        placement: u,
        overflows: C
      }], !C.every((ue) => ue <= 0)) {
        var k, U;
        const ue = (((k = c.flip) == null ? void 0 : k.index) || 0) + 1, X = ee[ue];
        if (X) {
          var te;
          const Z = w === "alignment" ? j !== zl(X) : !1, K = ((te = _[0]) == null ? void 0 : te.overflows[0]) > 0;
          if (!Z || K)
            return {
              data: {
                index: ue,
                overflows: _
              },
              reset: {
                placement: X
              }
            };
        }
        let W = (U = _.filter((Z) => Z.overflows[0] <= 0).sort((Z, K) => Z.overflows[1] - K.overflows[1])[0]) == null ? void 0 : U.placement;
        if (!W)
          switch (y) {
            case "bestFit": {
              var se;
              const Z = (se = _.filter((K) => {
                if (Q) {
                  const ae = zl(K.placement);
                  return ae === j || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ae === "y";
                }
                return !0;
              }).map((K) => [K.placement, K.overflows.filter((ae) => ae > 0).reduce((ae, re) => ae + re, 0)]).sort((K, ae) => K[1] - ae[1])[0]) == null ? void 0 : se[0];
              Z && (W = Z);
              break;
            }
            case "initialPlacement":
              W = m;
              break;
          }
        if (u !== W)
          return {
            reset: {
              placement: W
            }
          };
      }
      return {};
    }
  };
};
async function Px(t, i) {
  const {
    placement: a,
    platform: r,
    elements: u
  } = t, c = await (r.isRTL == null ? void 0 : r.isRTL(u.floating)), d = Hl(a), m = jr(a), g = zl(a) === "y", p = ["left", "top"].includes(d) ? -1 : 1, v = c && g ? -1 : 1, w = mi(i, t);
  let {
    mainAxis: S,
    crossAxis: y,
    alignmentAxis: b
  } = typeof w == "number" ? {
    mainAxis: w,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: w.mainAxis || 0,
    crossAxis: w.crossAxis || 0,
    alignmentAxis: w.alignmentAxis
  };
  return m && typeof b == "number" && (y = m === "end" ? b * -1 : b), g ? {
    x: y * v,
    y: S * p
  } : {
    x: S * p,
    y: y * v
  };
}
const Wx = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(i) {
      var a, r;
      const {
        x: u,
        y: c,
        placement: d,
        middlewareData: m
      } = i, g = await Px(i, t);
      return d === ((a = m.offset) == null ? void 0 : a.placement) && (r = m.arrow) != null && r.alignmentOffset ? {} : {
        x: u + g.x,
        y: c + g.y,
        data: {
          ...g,
          placement: d
        }
      };
    }
  };
}, Jx = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(i) {
      const {
        x: a,
        y: r,
        placement: u
      } = i, {
        mainAxis: c = !0,
        crossAxis: d = !1,
        limiter: m = {
          fn: (M) => {
            let {
              x: N,
              y: j
            } = M;
            return {
              x: N,
              y: j
            };
          }
        },
        ...g
      } = mi(t, i), p = {
        x: a,
        y: r
      }, v = await Cu(i, g), w = zl(Hl(u)), S = Lv(w);
      let y = p[S], b = p[w];
      if (c) {
        const M = S === "y" ? "top" : "left", N = S === "y" ? "bottom" : "right", j = y + v[M], $ = y - v[N];
        y = vh(j, y, $);
      }
      if (d) {
        const M = w === "y" ? "top" : "left", N = w === "y" ? "bottom" : "right", j = b + v[M], $ = b - v[N];
        b = vh(j, b, $);
      }
      const R = m.fn({
        ...i,
        [S]: y,
        [w]: b
      });
      return {
        ...R,
        data: {
          x: R.x - a,
          y: R.y - r,
          enabled: {
            [S]: c,
            [w]: d
          }
        }
      };
    }
  };
}, ew = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(i) {
      var a, r;
      const {
        placement: u,
        rects: c,
        platform: d,
        elements: m
      } = i, {
        apply: g = () => {
        },
        ...p
      } = mi(t, i), v = await Cu(i, p), w = Hl(u), S = jr(u), y = zl(u) === "y", {
        width: b,
        height: R
      } = c.floating;
      let M, N;
      w === "top" || w === "bottom" ? (M = w, N = S === (await (d.isRTL == null ? void 0 : d.isRTL(m.floating)) ? "start" : "end") ? "left" : "right") : (N = w, M = S === "end" ? "top" : "bottom");
      const j = R - v.top - v.bottom, $ = b - v.left - v.right, B = va(R - v[M], j), Y = va(b - v[N], $), Q = !i.middlewareData.shift;
      let ee = B, O = Y;
      if ((a = i.middlewareData.shift) != null && a.enabled.x && (O = $), (r = i.middlewareData.shift) != null && r.enabled.y && (ee = j), Q && !S) {
        const _ = Ot(v.left, 0), k = Ot(v.right, 0), U = Ot(v.top, 0), te = Ot(v.bottom, 0);
        y ? O = b - 2 * (_ !== 0 || k !== 0 ? _ + k : Ot(v.left, v.right)) : ee = R - 2 * (U !== 0 || te !== 0 ? U + te : Ot(v.top, v.bottom));
      }
      await g({
        ...i,
        availableWidth: O,
        availableHeight: ee
      });
      const C = await d.getDimensions(m.floating);
      return b !== C.width || R !== C.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Vv(t) {
  const i = Cn(t);
  let a = parseFloat(i.width) || 0, r = parseFloat(i.height) || 0;
  const u = $n(t), c = u ? t.offsetWidth : a, d = u ? t.offsetHeight : r, m = Mr(a) !== c || Mr(r) !== d;
  return m && (a = c, r = d), {
    width: a,
    height: r,
    $: m
  };
}
function Kf(t) {
  return Nt(t) ? t : t.contextElement;
}
function oi(t) {
  const i = Kf(t);
  if (!$n(i))
    return zn(1);
  const a = i.getBoundingClientRect(), {
    width: r,
    height: u,
    $: c
  } = Vv(i);
  let d = (c ? Mr(a.width) : a.width) / r, m = (c ? Mr(a.height) : a.height) / u;
  return (!d || !Number.isFinite(d)) && (d = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: d,
    y: m
  };
}
const tw = /* @__PURE__ */ zn(0);
function kv(t) {
  const i = Qt(t);
  return !Qf() || !i.visualViewport ? tw : {
    x: i.visualViewport.offsetLeft,
    y: i.visualViewport.offsetTop
  };
}
function nw(t, i, a) {
  return i === void 0 && (i = !1), !a || i && a !== Qt(t) ? !1 : i;
}
function ya(t, i, a, r) {
  i === void 0 && (i = !1), a === void 0 && (a = !1);
  const u = t.getBoundingClientRect(), c = Kf(t);
  let d = zn(1);
  i && (r ? Nt(r) && (d = oi(r)) : d = oi(t));
  const m = nw(c, a, r) ? kv(c) : zn(0);
  let g = (u.left + m.x) / d.x, p = (u.top + m.y) / d.y, v = u.width / d.x, w = u.height / d.y;
  if (c) {
    const S = Qt(c), y = r && Nt(r) ? Qt(r) : r;
    let b = S, R = wf(b);
    for (; R && r && y !== b; ) {
      const M = oi(R), N = R.getBoundingClientRect(), j = Cn(R), $ = N.left + (R.clientLeft + parseFloat(j.paddingLeft)) * M.x, B = N.top + (R.clientTop + parseFloat(j.paddingTop)) * M.y;
      g *= M.x, p *= M.y, v *= M.x, w *= M.y, g += $, p += B, b = Qt(R), R = wf(b);
    }
  }
  return du({
    width: v,
    height: w,
    x: g,
    y: p
  });
}
function Pf(t, i) {
  const a = Eu(t).scrollLeft;
  return i ? i.left + a : ya(Hn(t)).left + a;
}
function Uv(t, i, a) {
  a === void 0 && (a = !1);
  const r = t.getBoundingClientRect(), u = r.left + i.scrollLeft - (a ? 0 : (
    // RTL <body> scrollbar.
    Pf(t, r)
  )), c = r.top + i.scrollTop;
  return {
    x: u,
    y: c
  };
}
function lw(t) {
  let {
    elements: i,
    rect: a,
    offsetParent: r,
    strategy: u
  } = t;
  const c = u === "fixed", d = Hn(r), m = i ? wu(i.floating) : !1;
  if (r === d || m && c)
    return a;
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  }, p = zn(1);
  const v = zn(0), w = $n(r);
  if ((w || !w && !c) && ((di(r) !== "body" || Nr(d)) && (g = Eu(r)), $n(r))) {
    const y = ya(r);
    p = oi(r), v.x = y.x + r.clientLeft, v.y = y.y + r.clientTop;
  }
  const S = d && !w && !c ? Uv(d, g, !0) : zn(0);
  return {
    width: a.width * p.x,
    height: a.height * p.y,
    x: a.x * p.x - g.scrollLeft * p.x + v.x + S.x,
    y: a.y * p.y - g.scrollTop * p.y + v.y + S.y
  };
}
function aw(t) {
  return Array.from(t.getClientRects());
}
function iw(t) {
  const i = Hn(t), a = Eu(t), r = t.ownerDocument.body, u = Ot(i.scrollWidth, i.clientWidth, r.scrollWidth, r.clientWidth), c = Ot(i.scrollHeight, i.clientHeight, r.scrollHeight, r.clientHeight);
  let d = -a.scrollLeft + Pf(t);
  const m = -a.scrollTop;
  return Cn(r).direction === "rtl" && (d += Ot(i.clientWidth, r.clientWidth) - u), {
    width: u,
    height: c,
    x: d,
    y: m
  };
}
function rw(t, i) {
  const a = Qt(t), r = Hn(t), u = a.visualViewport;
  let c = r.clientWidth, d = r.clientHeight, m = 0, g = 0;
  if (u) {
    c = u.width, d = u.height;
    const p = Qf();
    (!p || p && i === "fixed") && (m = u.offsetLeft, g = u.offsetTop);
  }
  return {
    width: c,
    height: d,
    x: m,
    y: g
  };
}
function ow(t, i) {
  const a = ya(t, !0, i === "fixed"), r = a.top + t.clientTop, u = a.left + t.clientLeft, c = $n(t) ? oi(t) : zn(1), d = t.clientWidth * c.x, m = t.clientHeight * c.y, g = u * c.x, p = r * c.y;
  return {
    width: d,
    height: m,
    x: g,
    y: p
  };
}
function bh(t, i, a) {
  let r;
  if (i === "viewport")
    r = rw(t, a);
  else if (i === "document")
    r = iw(Hn(t));
  else if (Nt(i))
    r = ow(i, a);
  else {
    const u = kv(t);
    r = {
      x: i.x - u.x,
      y: i.y - u.y,
      width: i.width,
      height: i.height
    };
  }
  return du(r);
}
function Bv(t, i) {
  const a = Ll(t);
  return a === i || !Nt(a) || ci(a) ? !1 : Cn(a).position === "fixed" || Bv(a, i);
}
function uw(t, i) {
  const a = i.get(t);
  if (a)
    return a;
  let r = Tr(t, [], !1).filter((m) => Nt(m) && di(m) !== "body"), u = null;
  const c = Cn(t).position === "fixed";
  let d = c ? Ll(t) : t;
  for (; Nt(d) && !ci(d); ) {
    const m = Cn(d), g = Zf(d);
    !g && m.position === "fixed" && (u = null), (c ? !g && !u : !g && m.position === "static" && !!u && ["absolute", "fixed"].includes(u.position) || Nr(d) && !g && Bv(t, d)) ? r = r.filter((v) => v !== d) : u = m, d = Ll(d);
  }
  return i.set(t, r), r;
}
function sw(t) {
  let {
    element: i,
    boundary: a,
    rootBoundary: r,
    strategy: u
  } = t;
  const d = [...a === "clippingAncestors" ? wu(i) ? [] : uw(i, this._c) : [].concat(a), r], m = d[0], g = d.reduce((p, v) => {
    const w = bh(i, v, u);
    return p.top = Ot(w.top, p.top), p.right = va(w.right, p.right), p.bottom = va(w.bottom, p.bottom), p.left = Ot(w.left, p.left), p;
  }, bh(i, m, u));
  return {
    width: g.right - g.left,
    height: g.bottom - g.top,
    x: g.left,
    y: g.top
  };
}
function cw(t) {
  const {
    width: i,
    height: a
  } = Vv(t);
  return {
    width: i,
    height: a
  };
}
function fw(t, i, a) {
  const r = $n(i), u = Hn(i), c = a === "fixed", d = ya(t, !0, c, i);
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const g = zn(0);
  function p() {
    g.x = Pf(u);
  }
  if (r || !r && !c)
    if ((di(i) !== "body" || Nr(u)) && (m = Eu(i)), r) {
      const y = ya(i, !0, c, i);
      g.x = y.x + i.clientLeft, g.y = y.y + i.clientTop;
    } else u && p();
  c && !r && u && p();
  const v = u && !r && !c ? Uv(u, m) : zn(0), w = d.left + m.scrollLeft - g.x - v.x, S = d.top + m.scrollTop - g.y - v.y;
  return {
    x: w,
    y: S,
    width: d.width,
    height: d.height
  };
}
function Wc(t) {
  return Cn(t).position === "static";
}
function Sh(t, i) {
  if (!$n(t) || Cn(t).position === "fixed")
    return null;
  if (i)
    return i(t);
  let a = t.offsetParent;
  return Hn(t) === a && (a = a.ownerDocument.body), a;
}
function qv(t, i) {
  const a = Qt(t);
  if (wu(t))
    return a;
  if (!$n(t)) {
    let u = Ll(t);
    for (; u && !ci(u); ) {
      if (Nt(u) && !Wc(u))
        return u;
      u = Ll(u);
    }
    return a;
  }
  let r = Sh(t, i);
  for (; r && Fx(r) && Wc(r); )
    r = Sh(r, i);
  return r && ci(r) && Wc(r) && !Zf(r) ? a : r || Vx(t) || a;
}
const dw = async function(t) {
  const i = this.getOffsetParent || qv, a = this.getDimensions, r = await a(t.floating);
  return {
    reference: fw(t.reference, await i(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function mw(t) {
  return Cn(t).direction === "rtl";
}
const gw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: lw,
  getDocumentElement: Hn,
  getClippingRect: sw,
  getOffsetParent: qv,
  getElementRects: dw,
  getClientRects: aw,
  getDimensions: cw,
  getScale: oi,
  isElement: Nt,
  isRTL: mw
};
function Gv(t, i) {
  return t.x === i.x && t.y === i.y && t.width === i.width && t.height === i.height;
}
function pw(t, i) {
  let a = null, r;
  const u = Hn(t);
  function c() {
    var m;
    clearTimeout(r), (m = a) == null || m.disconnect(), a = null;
  }
  function d(m, g) {
    m === void 0 && (m = !1), g === void 0 && (g = 1), c();
    const p = t.getBoundingClientRect(), {
      left: v,
      top: w,
      width: S,
      height: y
    } = p;
    if (m || i(), !S || !y)
      return;
    const b = eu(w), R = eu(u.clientWidth - (v + S)), M = eu(u.clientHeight - (w + y)), N = eu(v), $ = {
      rootMargin: -b + "px " + -R + "px " + -M + "px " + -N + "px",
      threshold: Ot(0, va(1, g)) || 1
    };
    let B = !0;
    function Y(Q) {
      const ee = Q[0].intersectionRatio;
      if (ee !== g) {
        if (!B)
          return d();
        ee ? d(!1, ee) : r = setTimeout(() => {
          d(!1, 1e-7);
        }, 1e3);
      }
      ee === 1 && !Gv(p, t.getBoundingClientRect()) && d(), B = !1;
    }
    try {
      a = new IntersectionObserver(Y, {
        ...$,
        // Handle <iframe>s
        root: u.ownerDocument
      });
    } catch {
      a = new IntersectionObserver(Y, $);
    }
    a.observe(t);
  }
  return d(!0), c;
}
function hw(t, i, a, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: u = !0,
    ancestorResize: c = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = r, p = Kf(t), v = u || c ? [...p ? Tr(p) : [], ...Tr(i)] : [];
  v.forEach((N) => {
    u && N.addEventListener("scroll", a, {
      passive: !0
    }), c && N.addEventListener("resize", a);
  });
  const w = p && m ? pw(p, a) : null;
  let S = -1, y = null;
  d && (y = new ResizeObserver((N) => {
    let [j] = N;
    j && j.target === p && y && (y.unobserve(i), cancelAnimationFrame(S), S = requestAnimationFrame(() => {
      var $;
      ($ = y) == null || $.observe(i);
    })), a();
  }), p && !g && y.observe(p), y.observe(i));
  let b, R = g ? ya(t) : null;
  g && M();
  function M() {
    const N = ya(t);
    R && !Gv(R, N) && a(), R = N, b = requestAnimationFrame(M);
  }
  return a(), () => {
    var N;
    v.forEach((j) => {
      u && j.removeEventListener("scroll", a), c && j.removeEventListener("resize", a);
    }), w == null || w(), (N = y) == null || N.disconnect(), y = null, g && cancelAnimationFrame(b);
  };
}
const Jc = Cu, vw = Wx, yw = Jx, bw = Kx, Sw = ew, xw = (t, i, a) => {
  const r = /* @__PURE__ */ new Map(), u = {
    platform: gw,
    ...a
  }, c = {
    ...u.platform,
    _c: r
  };
  return Qx(t, i, {
    ...u,
    platform: c
  });
};
var au = typeof document < "u" ? Vf : Ve;
function mu(t, i) {
  if (t === i)
    return !0;
  if (typeof t != typeof i)
    return !1;
  if (typeof t == "function" && t.toString() === i.toString())
    return !0;
  let a, r, u;
  if (t && i && typeof t == "object") {
    if (Array.isArray(t)) {
      if (a = t.length, a !== i.length) return !1;
      for (r = a; r-- !== 0; )
        if (!mu(t[r], i[r]))
          return !1;
      return !0;
    }
    if (u = Object.keys(t), a = u.length, a !== Object.keys(i).length)
      return !1;
    for (r = a; r-- !== 0; )
      if (!{}.hasOwnProperty.call(i, u[r]))
        return !1;
    for (r = a; r-- !== 0; ) {
      const c = u[r];
      if (!(c === "_owner" && t.$$typeof) && !mu(t[c], i[c]))
        return !1;
    }
    return !0;
  }
  return t !== t && i !== i;
}
function Yv(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function xh(t, i) {
  const a = Yv(t);
  return Math.round(i * a) / a;
}
function ef(t) {
  const i = H.useRef(t);
  return au(() => {
    i.current = t;
  }), i;
}
function ww(t) {
  t === void 0 && (t = {});
  const {
    placement: i = "bottom",
    strategy: a = "absolute",
    middleware: r = [],
    platform: u,
    elements: {
      reference: c,
      floating: d
    } = {},
    transform: m = !0,
    whileElementsMounted: g,
    open: p
  } = t, [v, w] = H.useState({
    x: 0,
    y: 0,
    strategy: a,
    placement: i,
    middlewareData: {},
    isPositioned: !1
  }), [S, y] = H.useState(r);
  mu(S, r) || y(r);
  const [b, R] = H.useState(null), [M, N] = H.useState(null), j = H.useCallback((Z) => {
    Z !== Q.current && (Q.current = Z, R(Z));
  }, []), $ = H.useCallback((Z) => {
    Z !== ee.current && (ee.current = Z, N(Z));
  }, []), B = c || b, Y = d || M, Q = H.useRef(null), ee = H.useRef(null), O = H.useRef(v), C = g != null, _ = ef(g), k = ef(u), U = ef(p), te = H.useCallback(() => {
    if (!Q.current || !ee.current)
      return;
    const Z = {
      placement: i,
      strategy: a,
      middleware: S
    };
    k.current && (Z.platform = k.current), xw(Q.current, ee.current, Z).then((K) => {
      const ae = {
        ...K,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: U.current !== !1
      };
      se.current && !mu(O.current, ae) && (O.current = ae, ou.flushSync(() => {
        w(ae);
      }));
    });
  }, [S, i, a, k, U]);
  au(() => {
    p === !1 && O.current.isPositioned && (O.current.isPositioned = !1, w((Z) => ({
      ...Z,
      isPositioned: !1
    })));
  }, [p]);
  const se = H.useRef(!1);
  au(() => (se.current = !0, () => {
    se.current = !1;
  }), []), au(() => {
    if (B && (Q.current = B), Y && (ee.current = Y), B && Y) {
      if (_.current)
        return _.current(B, Y, te);
      te();
    }
  }, [B, Y, te, _, C]);
  const ue = H.useMemo(() => ({
    reference: Q,
    floating: ee,
    setReference: j,
    setFloating: $
  }), [j, $]), X = H.useMemo(() => ({
    reference: B,
    floating: Y
  }), [B, Y]), W = H.useMemo(() => {
    const Z = {
      position: a,
      left: 0,
      top: 0
    };
    if (!X.floating)
      return Z;
    const K = xh(X.floating, v.x), ae = xh(X.floating, v.y);
    return m ? {
      ...Z,
      transform: "translate(" + K + "px, " + ae + "px)",
      ...Yv(X.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: a,
      left: K,
      top: ae
    };
  }, [a, m, X.floating, v.x, v.y]);
  return H.useMemo(() => ({
    ...v,
    update: te,
    refs: ue,
    elements: X,
    floatingStyles: W
  }), [v, te, ue, X, W]);
}
const Iv = (t, i) => ({
  ...vw(t),
  options: [t, i]
}), Ew = (t, i) => ({
  ...yw(t),
  options: [t, i]
}), Cw = (t, i) => ({
  ...bw(t),
  options: [t, i]
}), Rw = (t, i) => ({
  ...Sw(t),
  options: [t, i]
}), Xv = {
  ...H
}, Tw = Xv.useInsertionEffect, Mw = Tw || ((t) => t());
function Zv(t) {
  const i = H.useRef(() => {
  });
  return Mw(() => {
    i.current = t;
  }), H.useCallback(function() {
    for (var a = arguments.length, r = new Array(a), u = 0; u < a; u++)
      r[u] = arguments[u];
    return i.current == null ? void 0 : i.current(...r);
  }, []);
}
var Cf = typeof document < "u" ? Vf : Ve;
let wh = !1, Ow = 0;
const Eh = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + Ow++
);
function _w() {
  const [t, i] = H.useState(() => wh ? Eh() : void 0);
  return Cf(() => {
    t == null && i(Eh());
  }, []), H.useEffect(() => {
    wh = !0;
  }, []), t;
}
const Aw = Xv.useId, Dw = Aw || _w;
function Nw() {
  const t = /* @__PURE__ */ new Map();
  return {
    emit(i, a) {
      var r;
      (r = t.get(i)) == null || r.forEach((u) => u(a));
    },
    on(i, a) {
      t.set(i, [...t.get(i) || [], a]);
    },
    off(i, a) {
      var r;
      t.set(i, ((r = t.get(i)) == null ? void 0 : r.filter((u) => u !== a)) || []);
    }
  };
}
const jw = /* @__PURE__ */ H.createContext(null), zw = /* @__PURE__ */ H.createContext(null), $w = () => {
  var t;
  return ((t = H.useContext(jw)) == null ? void 0 : t.id) || null;
}, Lw = () => H.useContext(zw), Hw = "data-floating-ui-focusable";
function Fw(t) {
  const {
    open: i = !1,
    onOpenChange: a,
    elements: r
  } = t, u = Dw(), c = H.useRef({}), [d] = H.useState(() => Nw()), m = $w() != null, [g, p] = H.useState(r.reference), v = Zv((y, b, R) => {
    c.current.openEvent = y ? b : void 0, d.emit("openchange", {
      open: y,
      event: b,
      reason: R,
      nested: m
    }), a == null || a(y, b, R);
  }), w = H.useMemo(() => ({
    setPositionReference: p
  }), []), S = H.useMemo(() => ({
    reference: g || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [g, r.reference, r.floating]);
  return H.useMemo(() => ({
    dataRef: c,
    open: i,
    onOpenChange: v,
    elements: S,
    events: d,
    floatingId: u,
    refs: w
  }), [i, v, S, d, u, w]);
}
function Vw(t) {
  t === void 0 && (t = {});
  const {
    nodeId: i
  } = t, a = Fw({
    ...t,
    elements: {
      reference: null,
      floating: null,
      ...t.elements
    }
  }), r = t.rootContext || a, u = r.elements, [c, d] = H.useState(null), [m, g] = H.useState(null), v = (u == null ? void 0 : u.domReference) || c, w = H.useRef(null), S = Lw();
  Cf(() => {
    v && (w.current = v);
  }, [v]);
  const y = ww({
    ...t,
    elements: {
      ...u,
      ...m && {
        reference: m
      }
    }
  }), b = H.useCallback(($) => {
    const B = Nt($) ? {
      getBoundingClientRect: () => $.getBoundingClientRect(),
      contextElement: $
    } : $;
    g(B), y.refs.setReference(B);
  }, [y.refs]), R = H.useCallback(($) => {
    (Nt($) || $ === null) && (w.current = $, d($)), (Nt(y.refs.reference.current) || y.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    $ !== null && !Nt($)) && y.refs.setReference($);
  }, [y.refs]), M = H.useMemo(() => ({
    ...y.refs,
    setReference: R,
    setPositionReference: b,
    domReference: w
  }), [y.refs, R, b]), N = H.useMemo(() => ({
    ...y.elements,
    domReference: v
  }), [y.elements, v]), j = H.useMemo(() => ({
    ...y,
    ...r,
    refs: M,
    elements: N,
    nodeId: i
  }), [y, M, N, i, r]);
  return Cf(() => {
    r.dataRef.current.floatingContext = j;
    const $ = S == null ? void 0 : S.nodesRef.current.find((B) => B.id === i);
    $ && ($.context = j);
  }), H.useMemo(() => ({
    ...y,
    context: j,
    refs: M,
    elements: N
  }), [y, M, N, j]);
}
const Ch = "active", Rh = "selected";
function tf(t, i, a) {
  const r = /* @__PURE__ */ new Map(), u = a === "item";
  let c = t;
  if (u && t) {
    const {
      [Ch]: d,
      [Rh]: m,
      ...g
    } = t;
    c = g;
  }
  return {
    ...a === "floating" && {
      tabIndex: -1,
      [Hw]: ""
    },
    ...c,
    ...i.map((d) => {
      const m = d ? d[a] : null;
      return typeof m == "function" ? t ? m(t) : null : m;
    }).concat(t).reduce((d, m) => (m && Object.entries(m).forEach((g) => {
      let [p, v] = g;
      if (!(u && [Ch, Rh].includes(p)))
        if (p.indexOf("on") === 0) {
          if (r.has(p) || r.set(p, []), typeof v == "function") {
            var w;
            (w = r.get(p)) == null || w.push(v), d[p] = function() {
              for (var S, y = arguments.length, b = new Array(y), R = 0; R < y; R++)
                b[R] = arguments[R];
              return (S = r.get(p)) == null ? void 0 : S.map((M) => M(...b)).find((M) => M !== void 0);
            };
          }
        } else
          d[p] = v;
    }), d), {})
  };
}
function kw(t) {
  t === void 0 && (t = []);
  const i = t.map((m) => m == null ? void 0 : m.reference), a = t.map((m) => m == null ? void 0 : m.floating), r = t.map((m) => m == null ? void 0 : m.item), u = H.useCallback(
    (m) => tf(m, t, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    i
  ), c = H.useCallback(
    (m) => tf(m, t, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    a
  ), d = H.useCallback(
    (m) => tf(m, t, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    r
  );
  return H.useMemo(() => ({
    getReferenceProps: u,
    getFloatingProps: c,
    getItemProps: d
  }), [u, c, d]);
}
function Th(t, i) {
  return {
    ...t,
    rects: {
      ...t.rects,
      floating: {
        ...t.rects.floating,
        height: i
      }
    }
  };
}
const Uw = (t) => ({
  name: "inner",
  options: t,
  async fn(i) {
    const {
      listRef: a,
      overflowRef: r,
      onFallbackChange: u,
      offset: c = 0,
      index: d = 0,
      minItemsVisible: m = 4,
      referenceOverflowThreshold: g = 0,
      scrollRef: p,
      ...v
    } = mi(t, i), {
      rects: w,
      elements: {
        floating: S
      }
    } = i, y = a.current[d], b = (p == null ? void 0 : p.current) || S, R = S.clientTop || b.clientTop, M = S.clientTop !== 0, N = b.clientTop !== 0, j = S === b;
    if (!y)
      return {};
    const $ = {
      ...i,
      ...await Iv(-y.offsetTop - S.clientTop - w.reference.height / 2 - y.offsetHeight / 2 - c).fn(i)
    }, B = await Jc(Th($, b.scrollHeight + R + S.clientTop), v), Y = await Jc($, {
      ...v,
      elementContext: "reference"
    }), Q = Ot(0, B.top), ee = $.y + Q, _ = (b.scrollHeight > b.clientHeight ? (k) => k : Mr)(Ot(0, b.scrollHeight + (M && j || N ? R * 2 : 0) - Q - Ot(0, B.bottom)));
    if (b.style.maxHeight = _ + "px", b.scrollTop = Q, u) {
      const k = b.offsetHeight < y.offsetHeight * va(m, a.current.length) - 1 || Y.top >= -g || Y.bottom >= -g;
      ou.flushSync(() => u(k));
    }
    return r && (r.current = await Jc(Th({
      ...$,
      y: ee
    }, b.offsetHeight + R + S.clientTop), v)), {
      y: ee
    };
  }
});
function Bw(t, i) {
  const {
    open: a,
    elements: r
  } = t, {
    enabled: u = !0,
    overflowRef: c,
    scrollRef: d,
    onChange: m
  } = i, g = Zv(m), p = H.useRef(!1), v = H.useRef(null), w = H.useRef(null);
  H.useEffect(() => {
    if (!u) return;
    function y(R) {
      if (R.ctrlKey || !b || c.current == null)
        return;
      const M = R.deltaY, N = c.current.top >= -0.5, j = c.current.bottom >= -0.5, $ = b.scrollHeight - b.clientHeight, B = M < 0 ? -1 : 1, Y = M < 0 ? "max" : "min";
      b.scrollHeight <= b.clientHeight || (!N && M > 0 || !j && M < 0 ? (R.preventDefault(), ou.flushSync(() => {
        g((Q) => Q + Math[Y](M, $ * B));
      })) : /firefox/i.test(kx()) && (b.scrollTop += M));
    }
    const b = (d == null ? void 0 : d.current) || r.floating;
    if (a && b)
      return b.addEventListener("wheel", y), requestAnimationFrame(() => {
        v.current = b.scrollTop, c.current != null && (w.current = {
          ...c.current
        });
      }), () => {
        v.current = null, w.current = null, b.removeEventListener("wheel", y);
      };
  }, [u, a, r.floating, c, d, g]);
  const S = H.useMemo(() => ({
    onKeyDown() {
      p.current = !0;
    },
    onWheel() {
      p.current = !1;
    },
    onPointerMove() {
      p.current = !1;
    },
    onScroll() {
      const y = (d == null ? void 0 : d.current) || r.floating;
      if (!(!c.current || !y || !p.current)) {
        if (v.current !== null) {
          const b = y.scrollTop - v.current;
          (c.current.bottom < -0.5 && b < -1 || c.current.top < -0.5 && b > 1) && ou.flushSync(() => g((R) => R + b));
        }
        requestAnimationFrame(() => {
          v.current = y.scrollTop;
        });
      }
    }
  }), [r.floating, g, c, d]);
  return H.useMemo(() => u ? {
    floating: S
  } : {}, [u, S]);
}
let zr = ot({ styles: void 0, setReference: () => {
}, setFloating: () => {
}, getReferenceProps: () => ({}), getFloatingProps: () => ({}), slot: {} });
zr.displayName = "FloatingContext";
let Wf = ot(null);
Wf.displayName = "PlacementContext";
function qw(t) {
  return Me(() => t ? typeof t == "string" ? { to: t } : t : null, [t]);
}
function Gw() {
  return Ke(zr).setReference;
}
function Yw() {
  let { getFloatingProps: t, slot: i } = Ke(zr);
  return ze((...a) => Object.assign({}, t(...a), { "data-anchor": i.anchor }), [t, i]);
}
function Iw(t = null) {
  t === !1 && (t = null), typeof t == "string" && (t = { to: t });
  let i = Ke(Wf), a = Me(() => t, [JSON.stringify(t, (u, c) => {
    var d;
    return (d = c == null ? void 0 : c.outerHTML) != null ? d : c;
  })]);
  ke(() => {
    i == null || i(a ?? null);
  }, [i, a]);
  let r = Ke(zr);
  return Me(() => [r.setFloating, t ? r.styles : {}], [r.setFloating, t, r.styles]);
}
let Mh = 4;
function Xw({ children: t, enabled: i = !0 }) {
  let [a, r] = Ee(null), [u, c] = Ee(0), d = pe(null), [m, g] = Ee(null);
  Zw(m);
  let p = i && a !== null && m !== null, { to: v = "bottom", gap: w = 0, offset: S = 0, padding: y = 0, inner: b } = Qw(a, m), [R, M = "center"] = v.split(" ");
  ke(() => {
    p && c(0);
  }, [p]);
  let { refs: N, floatingStyles: j, context: $ } = Vw({ open: p, placement: R === "selection" ? M === "center" ? "bottom" : `bottom-${M}` : M === "center" ? `${R}` : `${R}-${M}`, strategy: "absolute", transform: !1, middleware: [Iv({ mainAxis: R === "selection" ? 0 : w, crossAxis: S }), Ew({ padding: y }), R !== "selection" && Cw({ padding: y }), R === "selection" && b ? Uw({ ...b, padding: y, overflowRef: d, offset: u, minItemsVisible: Mh, referenceOverflowThreshold: y, onFallbackChange(k) {
    var U, te;
    if (!k) return;
    let se = $.elements.floating;
    if (!se) return;
    let ue = parseFloat(getComputedStyle(se).scrollPaddingBottom) || 0, X = Math.min(Mh, se.childElementCount), W = 0, Z = 0;
    for (let K of (te = (U = $.elements.floating) == null ? void 0 : U.childNodes) != null ? te : []) if (hn(K)) {
      let ae = K.offsetTop, re = ae + K.clientHeight + ue, me = se.scrollTop, V = me + se.clientHeight;
      if (ae >= me && re <= V) X--;
      else {
        Z = Math.max(0, Math.min(re, V) - Math.max(ae, me)), W = K.clientHeight;
        break;
      }
    }
    X >= 1 && c((K) => {
      let ae = W * X - Z + ue;
      return K >= ae ? K : ae;
    });
  } }) : null, Rw({ padding: y, apply({ availableWidth: k, availableHeight: U, elements: te }) {
    Object.assign(te.floating.style, { overflow: "auto", maxWidth: `${k}px`, maxHeight: `min(var(--anchor-max-height, 100vh), ${U}px)` });
  } })].filter(Boolean), whileElementsMounted: hw }), [B = R, Y = M] = $.placement.split("-");
  R === "selection" && (B = "selection");
  let Q = Me(() => ({ anchor: [B, Y].filter(Boolean).join(" ") }), [B, Y]), ee = Bw($, { overflowRef: d, onChange: c }), { getReferenceProps: O, getFloatingProps: C } = kw([ee]), _ = ve((k) => {
    g(k), N.setFloating(k);
  });
  return H.createElement(Wf.Provider, { value: r }, H.createElement(zr.Provider, { value: { setFloating: _, setReference: N.setReference, styles: j, getReferenceProps: O, getFloatingProps: C, slot: Q } }, t));
}
function Zw(t) {
  ke(() => {
    if (!t) return;
    let i = new MutationObserver(() => {
      let a = window.getComputedStyle(t).maxHeight, r = parseFloat(a);
      if (isNaN(r)) return;
      let u = parseInt(a);
      isNaN(u) || r !== u && (t.style.maxHeight = `${Math.ceil(r)}px`);
    });
    return i.observe(t, { attributes: !0, attributeFilter: ["style"] }), () => {
      i.disconnect();
    };
  }, [t]);
}
function Qw(t, i) {
  var a, r, u;
  let c = nf((a = t == null ? void 0 : t.gap) != null ? a : "var(--anchor-gap, 0)", i), d = nf((r = t == null ? void 0 : t.offset) != null ? r : "var(--anchor-offset, 0)", i), m = nf((u = t == null ? void 0 : t.padding) != null ? u : "var(--anchor-padding, 0)", i);
  return { ...t, gap: c, offset: d, padding: m };
}
function nf(t, i, a = void 0) {
  let r = Sa(), u = ve((g, p) => {
    if (g == null) return [a, null];
    if (typeof g == "number") return [g, null];
    if (typeof g == "string") {
      if (!p) return [a, null];
      let v = Oh(g, p);
      return [v, (w) => {
        let S = Qv(g);
        {
          let y = S.map((b) => window.getComputedStyle(p).getPropertyValue(b));
          r.requestAnimationFrame(function b() {
            r.nextFrame(b);
            let R = !1;
            for (let [N, j] of S.entries()) {
              let $ = window.getComputedStyle(p).getPropertyValue(j);
              if (y[N] !== $) {
                y[N] = $, R = !0;
                break;
              }
            }
            if (!R) return;
            let M = Oh(g, p);
            v !== M && (w(M), v = M);
          });
        }
        return r.dispose;
      }];
    }
    return [a, null];
  }), c = Me(() => u(t, i)[0], [t, i]), [d = c, m] = Ee();
  return ke(() => {
    let [g, p] = u(t, i);
    if (m(g), !!p) return p(m);
  }, [t, i]), d;
}
function Qv(t) {
  let i = /var\((.*)\)/.exec(t);
  if (i) {
    let a = i[1].indexOf(",");
    if (a === -1) return [i[1]];
    let r = i[1].slice(0, a).trim(), u = i[1].slice(a + 1).trim();
    return u ? [r, ...Qv(u)] : [r];
  }
  return [];
}
function Oh(t, i) {
  let a = document.createElement("div");
  i.appendChild(a), a.style.setProperty("margin-top", "0px", "important"), a.style.setProperty("margin-top", t, "important");
  let r = parseFloat(window.getComputedStyle(a).marginTop) || 0;
  return i.removeChild(a), r;
}
function Kw({ children: t, freeze: i }) {
  let a = Rf(i, t);
  return ie.createElement(ie.Fragment, null, a);
}
function Rf(t, i) {
  let [a, r] = Ee(i);
  return !t && a !== i && r(i), t ? a : i;
}
let Ru = ot(null);
Ru.displayName = "OpenClosedContext";
var jt = ((t) => (t[t.Open = 1] = "Open", t[t.Closed = 2] = "Closed", t[t.Closing = 4] = "Closing", t[t.Opening = 8] = "Opening", t))(jt || {});
function $r() {
  return Ke(Ru);
}
function Kv({ value: t, children: i }) {
  return ie.createElement(Ru.Provider, { value: t }, i);
}
function Pw({ children: t }) {
  return ie.createElement(Ru.Provider, { value: null }, t);
}
function Ww(t) {
  function i() {
    document.readyState !== "loading" && (t(), document.removeEventListener("DOMContentLoaded", i));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", i), i());
}
let jn = [];
Ww(() => {
  function t(i) {
    if (!nl(i.target) || i.target === document.body || jn[0] === i.target) return;
    let a = i.target;
    a = a.closest(cu), jn.unshift(a ?? i.target), jn = jn.filter((r) => r != null && r.isConnected), jn.splice(10);
  }
  window.addEventListener("click", t, { capture: !0 }), window.addEventListener("mousedown", t, { capture: !0 }), window.addEventListener("focus", t, { capture: !0 }), document.body.addEventListener("click", t, { capture: !0 }), document.body.addEventListener("mousedown", t, { capture: !0 }), document.body.addEventListener("focus", t, { capture: !0 });
});
function Jw(t) {
  throw new Error("Unexpected object: " + t);
}
var vt = ((t) => (t[t.First = 0] = "First", t[t.Previous = 1] = "Previous", t[t.Next = 2] = "Next", t[t.Last = 3] = "Last", t[t.Specific = 4] = "Specific", t[t.Nothing = 5] = "Nothing", t))(vt || {});
function _h(t, i) {
  let a = i.resolveItems();
  if (a.length <= 0) return null;
  let r = i.resolveActiveIndex(), u = r ?? -1;
  switch (t.focus) {
    case 0: {
      for (let c = 0; c < a.length; ++c) if (!i.resolveDisabled(a[c], c, a)) return c;
      return r;
    }
    case 1: {
      u === -1 && (u = a.length);
      for (let c = u - 1; c >= 0; --c) if (!i.resolveDisabled(a[c], c, a)) return c;
      return r;
    }
    case 2: {
      for (let c = u + 1; c < a.length; ++c) if (!i.resolveDisabled(a[c], c, a)) return c;
      return r;
    }
    case 3: {
      for (let c = a.length - 1; c >= 0; --c) if (!i.resolveDisabled(a[c], c, a)) return c;
      return r;
    }
    case 4: {
      for (let c = 0; c < a.length; ++c) if (i.resolveId(a[c], c, a) === t.id) return c;
      return r;
    }
    case 5:
      return null;
    default:
      Jw(t);
  }
}
var Jf = ((t) => (t[t.Left = 0] = "Left", t[t.Right = 2] = "Right", t))(Jf || {});
function ed(t) {
  let i = ve(t), a = pe(!1);
  Ve(() => (a.current = !1, () => {
    a.current = !0, hu(() => {
      a.current && i();
    });
  }), [i]);
}
function eE() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in H ? ((i) => i.useSyncExternalStore)(H)(() => () => {
  }, () => !1, () => !t) : !1;
}
function Lr() {
  let t = eE(), [i, a] = H.useState(ga.isHandoffComplete);
  return i && ga.isHandoffComplete === !1 && a(!1), H.useEffect(() => {
    i !== !0 && a(!0);
  }, [i]), H.useEffect(() => ga.handoff(), []), t ? !1 : i;
}
let Pv = ot(!1);
function tE() {
  return Ke(Pv);
}
function Ah(t) {
  return ie.createElement(Pv.Provider, { value: t.force }, t.children);
}
function nE(t) {
  let i = tE(), a = Ke(Jv), [r, u] = Ee(() => {
    var c;
    if (!i && a !== null) return (c = a.current) != null ? c : null;
    if (ga.isServer) return null;
    let d = t == null ? void 0 : t.getElementById("headlessui-portal-root");
    if (d) return d;
    if (t === null) return null;
    let m = t.createElement("div");
    return m.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(m);
  });
  return Ve(() => {
    r !== null && (t != null && t.body.contains(r) || t == null || t.body.appendChild(r));
  }, [r, t]), Ve(() => {
    i || a !== null && u(a.current);
  }, [a, u, i]), r;
}
let Wv = Zt, lE = ut(function(t, i) {
  let { ownerDocument: a = null, ...r } = t, u = pe(null), c = $t(CS((y) => {
    u.current = y;
  }), i), d = ha(u), m = a ?? d, g = nE(m), [p] = Ee(() => {
    var y;
    return ga.isServer ? null : (y = m == null ? void 0 : m.createElement("div")) != null ? y : null;
  }), v = Ke(Tf), w = Lr();
  ke(() => {
    !g || !p || g.contains(p) || (p.setAttribute("data-headlessui-portal", ""), g.appendChild(p));
  }, [g, p]), ke(() => {
    if (p && v) return v.register(p);
  }, [v, p]), ed(() => {
    var y;
    !g || !p || (If(p) && g.contains(p) && g.removeChild(p), g.childNodes.length <= 0 && ((y = g.parentElement) == null || y.removeChild(g)));
  });
  let S = yt();
  return w ? !g || !p ? null : Uf(S({ ourProps: { ref: c }, theirProps: r, slot: {}, defaultTag: Wv, name: "Portal" }), p) : null;
});
function aE(t, i) {
  let a = $t(i), { enabled: r = !0, ownerDocument: u, ...c } = t, d = yt();
  return r ? ie.createElement(lE, { ...c, ownerDocument: u, ref: a }) : d({ ourProps: { ref: a }, theirProps: c, slot: {}, defaultTag: Wv, name: "Portal" });
}
let iE = Zt, Jv = ot(null);
function rE(t, i) {
  let { target: a, ...r } = t, u = { ref: $t(i) }, c = yt();
  return ie.createElement(Jv.Provider, { value: a }, c({ ourProps: u, theirProps: r, defaultTag: iE, name: "Popover.Group" }));
}
let Tf = ot(null);
function oE() {
  let t = Ke(Tf), i = pe([]), a = ve((c) => (i.current.push(c), t && t.register(c), () => r(c))), r = ve((c) => {
    let d = i.current.indexOf(c);
    d !== -1 && i.current.splice(d, 1), t && t.unregister(c);
  }), u = Me(() => ({ register: a, unregister: r, portals: i }), [a, r, i]);
  return [i, Me(() => function({ children: c }) {
    return ie.createElement(Tf.Provider, { value: u }, c);
  }, [u])];
}
let uE = ut(aE), e0 = ut(rE), t0 = Object.assign(uE, { Group: e0 });
var sE = Object.defineProperty, cE = (t, i, a) => i in t ? sE(t, i, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[i] = a, Dh = (t, i, a) => (cE(t, typeof i != "symbol" ? i + "" : i, a), a), Ne = ((t) => (t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(Ne || {}), Xt = ((t) => (t[t.Single = 0] = "Single", t[t.Multi = 1] = "Multi", t))(Xt || {}), $l = ((t) => (t[t.Pointer = 0] = "Pointer", t[t.Focus = 1] = "Focus", t[t.Other = 2] = "Other", t))($l || {}), n0 = ((t) => (t[t.OpenCombobox = 0] = "OpenCombobox", t[t.CloseCombobox = 1] = "CloseCombobox", t[t.GoToOption = 2] = "GoToOption", t[t.SetTyping = 3] = "SetTyping", t[t.RegisterOption = 4] = "RegisterOption", t[t.UnregisterOption = 5] = "UnregisterOption", t[t.DefaultToFirstOption = 6] = "DefaultToFirstOption", t[t.SetActivationTrigger = 7] = "SetActivationTrigger", t[t.UpdateVirtualConfiguration = 8] = "UpdateVirtualConfiguration", t[t.SetInputElement = 9] = "SetInputElement", t[t.SetButtonElement = 10] = "SetButtonElement", t[t.SetOptionsElement = 11] = "SetOptionsElement", t))(n0 || {});
function lf(t, i = (a) => a) {
  let a = t.activeOptionIndex !== null ? t.options[t.activeOptionIndex] : null, r = i(t.options.slice()), u = r.length > 0 && r[0].dataRef.current.order !== null ? r.sort((d, m) => d.dataRef.current.order - m.dataRef.current.order) : Tv(r, (d) => d.dataRef.current.domRef.current), c = a ? u.indexOf(a) : null;
  return c === -1 && (c = null), { options: u, activeOptionIndex: c };
}
let fE = { 1(t) {
  var i;
  return (i = t.dataRef.current) != null && i.disabled || t.comboboxState === 1 ? t : { ...t, activeOptionIndex: null, comboboxState: 1, isTyping: !1, activationTrigger: 2, __demoMode: !1 };
}, 0(t) {
  var i, a;
  if ((i = t.dataRef.current) != null && i.disabled || t.comboboxState === 0) return t;
  if ((a = t.dataRef.current) != null && a.value) {
    let r = t.dataRef.current.calculateIndex(t.dataRef.current.value);
    if (r !== -1) return { ...t, activeOptionIndex: r, comboboxState: 0, __demoMode: !1 };
  }
  return { ...t, comboboxState: 0, __demoMode: !1 };
}, 3(t, i) {
  return t.isTyping === i.isTyping ? t : { ...t, isTyping: i.isTyping };
}, 2(t, i) {
  var a, r, u, c;
  if ((a = t.dataRef.current) != null && a.disabled || t.optionsElement && !((r = t.dataRef.current) != null && r.optionsPropsRef.current.static) && t.comboboxState === 1) return t;
  if (t.virtual) {
    let { options: p, disabled: v } = t.virtual, w = i.focus === vt.Specific ? i.idx : _h(i, { resolveItems: () => p, resolveActiveIndex: () => {
      var y, b;
      return (b = (y = t.activeOptionIndex) != null ? y : p.findIndex((R) => !v(R))) != null ? b : null;
    }, resolveDisabled: v, resolveId() {
      throw new Error("Function not implemented.");
    } }), S = (u = i.trigger) != null ? u : 2;
    return t.activeOptionIndex === w && t.activationTrigger === S ? t : { ...t, activeOptionIndex: w, activationTrigger: S, isTyping: !1, __demoMode: !1 };
  }
  let d = lf(t);
  if (d.activeOptionIndex === null) {
    let p = d.options.findIndex((v) => !v.dataRef.current.disabled);
    p !== -1 && (d.activeOptionIndex = p);
  }
  let m = i.focus === vt.Specific ? i.idx : _h(i, { resolveItems: () => d.options, resolveActiveIndex: () => d.activeOptionIndex, resolveId: (p) => p.id, resolveDisabled: (p) => p.dataRef.current.disabled }), g = (c = i.trigger) != null ? c : 2;
  return t.activeOptionIndex === m && t.activationTrigger === g ? t : { ...t, ...d, isTyping: !1, activeOptionIndex: m, activationTrigger: g, __demoMode: !1 };
}, 4: (t, i) => {
  var a, r, u, c;
  if ((a = t.dataRef.current) != null && a.virtual) return { ...t, options: [...t.options, i.payload] };
  let d = i.payload, m = lf(t, (p) => (p.push(d), p));
  t.activeOptionIndex === null && (u = (r = t.dataRef.current).isSelected) != null && u.call(r, i.payload.dataRef.current.value) && (m.activeOptionIndex = m.options.indexOf(d));
  let g = { ...t, ...m, activationTrigger: 2 };
  return (c = t.dataRef.current) != null && c.__demoMode && t.dataRef.current.value === void 0 && (g.activeOptionIndex = 0), g;
}, 5: (t, i) => {
  var a;
  if ((a = t.dataRef.current) != null && a.virtual) return { ...t, options: t.options.filter((u) => u.id !== i.id) };
  let r = lf(t, (u) => {
    let c = u.findIndex((d) => d.id === i.id);
    return c !== -1 && u.splice(c, 1), u;
  });
  return { ...t, ...r, activationTrigger: 2 };
}, 6: (t, i) => t.defaultToFirstOption === i.value ? t : { ...t, defaultToFirstOption: i.value }, 7: (t, i) => t.activationTrigger === i.trigger ? t : { ...t, activationTrigger: i.trigger }, 8: (t, i) => {
  var a, r;
  if (t.virtual === null) return { ...t, virtual: { options: i.options, disabled: (a = i.disabled) != null ? a : () => !1 } };
  if (t.virtual.options === i.options && t.virtual.disabled === i.disabled) return t;
  let u = t.activeOptionIndex;
  if (t.activeOptionIndex !== null) {
    let c = i.options.indexOf(t.virtual.options[t.activeOptionIndex]);
    c !== -1 ? u = c : u = null;
  }
  return { ...t, activeOptionIndex: u, virtual: { options: i.options, disabled: (r = i.disabled) != null ? r : () => !1 } };
}, 9: (t, i) => t.inputElement === i.element ? t : { ...t, inputElement: i.element }, 10: (t, i) => t.buttonElement === i.element ? t : { ...t, buttonElement: i.element }, 11: (t, i) => t.optionsElement === i.element ? t : { ...t, optionsElement: i.element } }, dE = class l0 extends bv {
  constructor(i) {
    super(i), Dh(this, "actions", { onChange: (a) => {
      let { onChange: r, compare: u, mode: c, value: d } = this.state.dataRef.current;
      return zt(c, { 0: () => r == null ? void 0 : r(a), 1: () => {
        let m = d.slice(), g = m.findIndex((p) => u(p, a));
        return g === -1 ? m.push(a) : m.splice(g, 1), r == null ? void 0 : r(m);
      } });
    }, registerOption: (a, r) => (this.send({ type: 4, payload: { id: a, dataRef: r } }), () => {
      this.state.activeOptionIndex === this.state.dataRef.current.calculateIndex(r.current.value) && this.send({ type: 6, value: !0 }), this.send({ type: 5, id: a });
    }), goToOption: (a, r) => (this.send({ type: 6, value: !1 }), this.send({ type: 2, ...a, trigger: r })), setIsTyping: (a) => {
      this.send({ type: 3, isTyping: a });
    }, closeCombobox: () => {
      var a, r;
      this.send({ type: 1 }), this.send({ type: 6, value: !1 }), (r = (a = this.state.dataRef.current).onClose) == null || r.call(a);
    }, openCombobox: () => {
      this.send({ type: 0 }), this.send({ type: 6, value: !0 });
    }, setActivationTrigger: (a) => {
      this.send({ type: 7, trigger: a });
    }, selectActiveOption: () => {
      let a = this.selectors.activeOptionIndex(this.state);
      if (a !== null) {
        if (this.actions.setIsTyping(!1), this.state.virtual) this.actions.onChange(this.state.virtual.options[a]);
        else {
          let { dataRef: r } = this.state.options[a];
          this.actions.onChange(r.current.value);
        }
        this.actions.goToOption({ focus: vt.Specific, idx: a });
      }
    }, setInputElement: (a) => {
      this.send({ type: 9, element: a });
    }, setButtonElement: (a) => {
      this.send({ type: 10, element: a });
    }, setOptionsElement: (a) => {
      this.send({ type: 11, element: a });
    } }), Dh(this, "selectors", { activeDescendantId: (a) => {
      var r, u;
      let c = this.selectors.activeOptionIndex(a);
      if (c !== null) return a.virtual ? (u = a.options.find((d) => !d.dataRef.current.disabled && a.dataRef.current.compare(d.dataRef.current.value, a.virtual.options[c]))) == null ? void 0 : u.id : (r = a.options[c]) == null ? void 0 : r.id;
    }, activeOptionIndex: (a) => {
      if (a.defaultToFirstOption && a.activeOptionIndex === null && (a.virtual ? a.virtual.options.length > 0 : a.options.length > 0)) {
        if (a.virtual) {
          let { options: u, disabled: c } = a.virtual, d = u.findIndex((m) => {
            var g;
            return !((g = c == null ? void 0 : c(m)) != null && g);
          });
          if (d !== -1) return d;
        }
        let r = a.options.findIndex((u) => !u.dataRef.current.disabled);
        if (r !== -1) return r;
      }
      return a.activeOptionIndex;
    }, activeOption: (a) => {
      var r, u;
      let c = this.selectors.activeOptionIndex(a);
      return c === null ? null : a.virtual ? a.virtual.options[c ?? 0] : (u = (r = a.options[c]) == null ? void 0 : r.dataRef.current.value) != null ? u : null;
    }, isActive: (a, r, u) => {
      var c;
      let d = this.selectors.activeOptionIndex(a);
      return d === null ? !1 : a.virtual ? d === a.dataRef.current.calculateIndex(r) : ((c = a.options[d]) == null ? void 0 : c.id) === u;
    }, shouldScrollIntoView: (a, r, u) => !(a.virtual || a.__demoMode || a.comboboxState !== 0 || a.activationTrigger === 0 || !this.selectors.isActive(a, r, u)) });
    {
      let a = this.state.id, r = Su.get(null);
      this.disposables.add(r.on(xv.Push, (u) => {
        !r.selectors.isTop(u, a) && this.state.comboboxState === 0 && this.actions.closeCombobox();
      })), this.on(0, () => r.actions.push(a)), this.on(1, () => r.actions.pop(a));
    }
  }
  static new({ id: i, virtual: a = null, __demoMode: r = !1 }) {
    var u;
    return new l0({ id: i, dataRef: { current: {} }, comboboxState: r ? 0 : 1, isTyping: !1, options: [], virtual: a ? { options: a.options, disabled: (u = a.disabled) != null ? u : () => !1 } : null, activeOptionIndex: null, activationTrigger: 2, inputElement: null, buttonElement: null, optionsElement: null, __demoMode: r });
  }
  reduce(i, a) {
    return zt(a.type, fE, i, a);
  }
};
const a0 = ot(null);
function Hr(t) {
  let i = Ke(a0);
  if (i === null) {
    let a = new Error(`<${t} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(a, i0), a;
  }
  return i;
}
function i0({ id: t, virtual: i = null, __demoMode: a = !1 }) {
  let r = Me(() => dE.new({ id: t, virtual: i, __demoMode: a }), []);
  return ed(() => r.dispose()), r;
}
let Or = ot(null);
Or.displayName = "ComboboxDataContext";
function gi(t) {
  let i = Ke(Or);
  if (i === null) {
    let a = new Error(`<${t} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(a, gi), a;
  }
  return i;
}
let r0 = ot(null);
function mE(t) {
  let i = Hr("VirtualProvider"), a = gi("VirtualProvider"), { options: r } = a.virtual, u = dt(i, (y) => y.optionsElement), [c, d] = Me(() => {
    let y = u;
    if (!y) return [0, 0];
    let b = window.getComputedStyle(y);
    return [parseFloat(b.paddingBlockStart || b.paddingTop), parseFloat(b.paddingBlockEnd || b.paddingBottom)];
  }, [u]), m = QS({ enabled: r.length !== 0, scrollPaddingStart: c, scrollPaddingEnd: d, count: r.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return i.state.optionsElement;
  }, overscan: 12 }), [g, p] = Ee(0);
  ke(() => {
    p((y) => y + 1);
  }, [r]);
  let v = m.getVirtualItems(), w = dt(i, (y) => y.activationTrigger === $l.Pointer), S = dt(i, i.selectors.activeOptionIndex);
  return v.length === 0 ? null : ie.createElement(r0.Provider, { value: m }, ie.createElement("div", { style: { position: "relative", width: "100%", height: `${m.getTotalSize()}px` }, ref: (y) => {
    y && (w || S !== null && r.length > S && m.scrollToIndex(S));
  } }, v.map((y) => {
    var b;
    return ie.createElement(Zt, { key: y.key }, ie.cloneElement((b = t.children) == null ? void 0 : b.call(t, { ...t.slot, option: r[y.index] }), { key: `${g}-${y.key}`, "data-index": y.index, "aria-setsize": r.length, "aria-posinset": y.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${y.start}px)`, overflowAnchor: "none" } }));
  })));
}
let gE = Zt;
function pE(t, i) {
  let a = Rn(), r = Gf(), { value: u, defaultValue: c, onChange: d, form: m, name: g, by: p, invalid: v = !1, disabled: w = r || !1, onClose: S, __demoMode: y = !1, multiple: b = !1, immediate: R = !1, virtual: M = null, nullable: N, ...j } = t, $ = cS(c), [B = b ? [] : void 0, Y] = sS(u, d, $), Q = i0({ id: a, virtual: M, __demoMode: y }), ee = pe({ static: !1, hold: !1 }), O = PS(p), C = ve((ne) => M ? p === null ? M.options.indexOf(ne) : M.options.findIndex((le) => O(le, ne)) : Q.state.options.findIndex((le) => O(le.dataRef.current.value, ne))), _ = ze((ne) => zt(te.mode, { [Xt.Multi]: () => B.some((le) => O(le, ne)), [Xt.Single]: () => O(B, ne) }), [B]), k = dt(Q, (ne) => ne.virtual), U = ve(() => S == null ? void 0 : S()), te = Me(() => ({ __demoMode: y, immediate: R, optionsPropsRef: ee, value: B, defaultValue: $, disabled: w, invalid: v, mode: b ? Xt.Multi : Xt.Single, virtual: M ? k : null, onChange: Y, isSelected: _, calculateIndex: C, compare: O, onClose: U }), [B, $, w, v, b, Y, _, y, Q, M, k, U]);
  ke(() => {
    var ne;
    M && Q.send({ type: n0.UpdateVirtualConfiguration, options: M.options, disabled: (ne = M.disabled) != null ? ne : null });
  }, [M, M == null ? void 0 : M.options, M == null ? void 0 : M.disabled]), ke(() => {
    Q.state.dataRef.current = te;
  }, [te]);
  let [se, ue, X, W] = dt(Q, (ne) => [ne.comboboxState, ne.buttonElement, ne.inputElement, ne.optionsElement]), Z = Su.get(null), K = dt(Z, ze((ne) => Z.selectors.isTop(ne, a), [Z, a]));
  _v(K, [ue, X, W], () => Q.actions.closeCombobox());
  let ae = dt(Q, Q.selectors.activeOptionIndex), re = dt(Q, Q.selectors.activeOption), me = Me(() => ({ open: se === Ne.Open, disabled: w, invalid: v, activeIndex: ae, activeOption: re, value: B }), [te, w, B, v, re, se]), [V, I] = DS(), de = i === null ? {} : { ref: i }, xe = ze(() => {
    if ($ !== void 0) return Y == null ? void 0 : Y($);
  }, [Y, $]), _e = yt();
  return ie.createElement(I, { value: V, props: { htmlFor: X == null ? void 0 : X.id }, slot: { open: se === Ne.Open, disabled: w } }, ie.createElement(Xw, null, ie.createElement(Or.Provider, { value: te }, ie.createElement(a0.Provider, { value: Q }, ie.createElement(Kv, { value: zt(se, { [Ne.Open]: jt.Open, [Ne.Closed]: jt.Closed }) }, g != null && ie.createElement(pS, { disabled: w, data: B != null ? { [g]: B } : {}, form: m, onReset: xe }), _e({ ourProps: de, theirProps: j, slot: me, defaultTag: gE, name: "Combobox" }))))));
}
let hE = "input";
function vE(t, i) {
  var a, r;
  let u = Hr("Combobox.Input"), c = gi("Combobox.Input"), d = Rn(), m = fv(), { id: g = m || `headlessui-combobox-input-${d}`, onChange: p, displayValue: v, disabled: w = c.disabled || !1, autoFocus: S = !1, type: y = "text", ...b } = t, [R] = dt(u, (I) => [I.inputElement]), M = pe(null), N = $t(M, i, Gw(), u.actions.setInputElement), j = ha(R), [$, B] = dt(u, (I) => [I.comboboxState, I.isTyping]), Y = Sa(), Q = ve(() => {
    u.actions.onChange(null), u.state.optionsElement && (u.state.optionsElement.scrollTop = 0), u.actions.goToOption({ focus: vt.Nothing });
  }), ee = Me(() => {
    var I;
    return typeof v == "function" && c.value !== void 0 ? (I = v(c.value)) != null ? I : "" : typeof c.value == "string" ? c.value : "";
  }, [c.value, v]);
  Rr(([I, de], [xe, _e]) => {
    if (u.state.isTyping) return;
    let ne = M.current;
    ne && ((_e === Ne.Open && de === Ne.Closed || I !== xe) && (ne.value = I), requestAnimationFrame(() => {
      if (u.state.isTyping || !ne || (j == null ? void 0 : j.activeElement) !== ne) return;
      let { selectionStart: le, selectionEnd: oe } = ne;
      Math.abs((oe ?? 0) - (le ?? 0)) === 0 && le === 0 && ne.setSelectionRange(ne.value.length, ne.value.length);
    }));
  }, [ee, $, j, B]), Rr(([I], [de]) => {
    if (I === Ne.Open && de === Ne.Closed) {
      if (u.state.isTyping) return;
      let xe = M.current;
      if (!xe) return;
      let _e = xe.value, { selectionStart: ne, selectionEnd: le, selectionDirection: oe } = xe;
      xe.value = "", xe.value = _e, oe !== null ? xe.setSelectionRange(ne, le, oe) : xe.setSelectionRange(ne, le);
    }
  }, [$]);
  let O = pe(!1), C = ve(() => {
    O.current = !0;
  }), _ = ve(() => {
    Y.nextFrame(() => {
      O.current = !1;
    });
  }), k = ve((I) => {
    switch (u.actions.setIsTyping(!0), I.key) {
      case Mt.Enter:
        if (u.state.comboboxState !== Ne.Open || O.current) return;
        if (I.preventDefault(), I.stopPropagation(), u.selectors.activeOptionIndex(u.state) === null) {
          u.actions.closeCombobox();
          return;
        }
        u.actions.selectActiveOption(), c.mode === Xt.Single && u.actions.closeCombobox();
        break;
      case Mt.ArrowDown:
        return I.preventDefault(), I.stopPropagation(), zt(u.state.comboboxState, { [Ne.Open]: () => u.actions.goToOption({ focus: vt.Next }), [Ne.Closed]: () => u.actions.openCombobox() });
      case Mt.ArrowUp:
        return I.preventDefault(), I.stopPropagation(), zt(u.state.comboboxState, { [Ne.Open]: () => u.actions.goToOption({ focus: vt.Previous }), [Ne.Closed]: () => {
          fa(() => u.actions.openCombobox()), c.value || u.actions.goToOption({ focus: vt.Last });
        } });
      case Mt.Home:
        if (I.shiftKey) break;
        return I.preventDefault(), I.stopPropagation(), u.actions.goToOption({ focus: vt.First });
      case Mt.PageUp:
        return I.preventDefault(), I.stopPropagation(), u.actions.goToOption({ focus: vt.First });
      case Mt.End:
        if (I.shiftKey) break;
        return I.preventDefault(), I.stopPropagation(), u.actions.goToOption({ focus: vt.Last });
      case Mt.PageDown:
        return I.preventDefault(), I.stopPropagation(), u.actions.goToOption({ focus: vt.Last });
      case Mt.Escape:
        return u.state.comboboxState !== Ne.Open ? void 0 : (I.preventDefault(), u.state.optionsElement && !c.optionsPropsRef.current.static && I.stopPropagation(), c.mode === Xt.Single && c.value === null && Q(), u.actions.closeCombobox());
      case Mt.Tab:
        if (u.state.comboboxState !== Ne.Open) return;
        c.mode === Xt.Single && u.state.activationTrigger !== $l.Focus && u.actions.selectActiveOption(), u.actions.closeCombobox();
        break;
    }
  }), U = ve((I) => {
    p == null || p(I), c.mode === Xt.Single && I.target.value === "" && Q(), u.actions.openCombobox();
  }), te = ve((I) => {
    var de, xe, _e;
    let ne = (de = I.relatedTarget) != null ? de : jn.find((le) => le !== I.currentTarget);
    if (!((xe = u.state.optionsElement) != null && xe.contains(ne)) && !((_e = u.state.buttonElement) != null && _e.contains(ne)) && u.state.comboboxState === Ne.Open) return I.preventDefault(), c.mode === Xt.Single && c.value === null && Q(), u.actions.closeCombobox();
  }), se = ve((I) => {
    var de, xe, _e;
    let ne = (de = I.relatedTarget) != null ? de : jn.find((le) => le !== I.currentTarget);
    (xe = u.state.buttonElement) != null && xe.contains(ne) || (_e = u.state.optionsElement) != null && _e.contains(ne) || c.disabled || c.immediate && u.state.comboboxState !== Ne.Open && Y.microTask(() => {
      fa(() => u.actions.openCombobox()), u.actions.setActivationTrigger($l.Focus);
    });
  }), ue = bu(), X = RS(), { isFocused: W, focusProps: Z } = rv({ autoFocus: S }), { isHovered: K, hoverProps: ae } = iv({ isDisabled: w }), re = dt(u, (I) => I.optionsElement), me = Me(() => ({ open: $ === Ne.Open, disabled: w, invalid: c.invalid, hover: K, focus: W, autofocus: S }), [c, K, W, S, w, c.invalid]), V = Yf({ ref: N, id: g, role: "combobox", type: y, "aria-controls": re == null ? void 0 : re.id, "aria-expanded": $ === Ne.Open, "aria-activedescendant": dt(u, u.selectors.activeDescendantId), "aria-labelledby": ue, "aria-describedby": X, "aria-autocomplete": "list", defaultValue: (r = (a = t.defaultValue) != null ? a : c.defaultValue !== void 0 ? v == null ? void 0 : v(c.defaultValue) : null) != null ? r : c.defaultValue, disabled: w || void 0, autoFocus: S, onCompositionStart: C, onCompositionEnd: _, onKeyDown: k, onChange: U, onFocus: se, onBlur: te }, Z, ae);
  return yt()({ ourProps: V, theirProps: b, slot: me, defaultTag: hE, name: "Combobox.Input" });
}
let yE = "button";
function bE(t, i) {
  let a = Hr("Combobox.Button"), r = gi("Combobox.Button"), [u, c] = Ee(null), d = $t(i, c, a.actions.setButtonElement), m = Rn(), { id: g = `headlessui-combobox-button-${m}`, disabled: p = r.disabled || !1, autoFocus: v = !1, ...w } = t, [S, y, b] = dt(a, (U) => [U.comboboxState, U.inputElement, U.optionsElement]), R = Av(y), M = S === Ne.Open;
  xx(M, { trigger: u, action: ze((U) => {
    if (u != null && u.contains(U.target) || y != null && y.contains(U.target)) return pr.Ignore;
    let te = U.target.closest('[role="option"]:not([data-disabled])');
    return hn(te) ? pr.Select(te) : b != null && b.contains(U.target) ? pr.Ignore : pr.Close;
  }, [u, y, b]), close: a.actions.closeCombobox, select: a.actions.selectActiveOption });
  let N = ve((U) => {
    switch (U.key) {
      case Mt.Space:
      case Mt.Enter:
        U.preventDefault(), U.stopPropagation(), a.state.comboboxState === Ne.Closed && fa(() => a.actions.openCombobox()), R();
        return;
      case Mt.ArrowDown:
        U.preventDefault(), U.stopPropagation(), a.state.comboboxState === Ne.Closed && (fa(() => a.actions.openCombobox()), a.state.dataRef.current.value || a.actions.goToOption({ focus: vt.First })), R();
        return;
      case Mt.ArrowUp:
        U.preventDefault(), U.stopPropagation(), a.state.comboboxState === Ne.Closed && (fa(() => a.actions.openCombobox()), a.state.dataRef.current.value || a.actions.goToOption({ focus: vt.Last })), R();
        return;
      case Mt.Escape:
        if (a.state.comboboxState !== Ne.Open) return;
        U.preventDefault(), a.state.optionsElement && !r.optionsPropsRef.current.static && U.stopPropagation(), fa(() => a.actions.closeCombobox()), R();
        return;
      default:
        return;
    }
  }), j = ve((U) => {
    U.preventDefault(), !wS(U.currentTarget) && (U.button === Jf.Left && (a.state.comboboxState === Ne.Open ? a.actions.closeCombobox() : a.actions.openCombobox()), R());
  }), $ = bu([g]), { isFocusVisible: B, focusProps: Y } = rv({ autoFocus: v }), { isHovered: Q, hoverProps: ee } = iv({ isDisabled: p }), { pressed: O, pressProps: C } = lS({ disabled: p }), _ = Me(() => ({ open: S === Ne.Open, active: O || S === Ne.Open, disabled: p, invalid: r.invalid, value: r.value, hover: Q, focus: B }), [r, Q, B, O, p, S]), k = Yf({ ref: d, id: g, type: wx(t, u), tabIndex: -1, "aria-haspopup": "listbox", "aria-controls": b == null ? void 0 : b.id, "aria-expanded": S === Ne.Open, "aria-labelledby": $, disabled: p || void 0, autoFocus: v, onPointerDown: j, onKeyDown: N }, Y, ee, C);
  return yt()({ ourProps: k, theirProps: w, slot: _, defaultTag: yE, name: "Combobox.Button" });
}
let SE = "div", xE = ui.RenderStrategy | ui.Static;
function wE(t, i) {
  var a, r, u;
  let c = Rn(), { id: d = `headlessui-combobox-options-${c}`, hold: m = !1, anchor: g, portal: p = !1, modal: v = !0, transition: w = !1, ...S } = t, y = Hr("Combobox.Options"), b = gi("Combobox.Options"), R = qw(g);
  R && (p = !0);
  let [M, N] = Iw(R), [j, $] = Ee(null), B = Yw(), Y = $t(i, R ? M : null, y.actions.setOptionsElement, $), [Q, ee, O, C, _] = dt(y, (oe) => [oe.comboboxState, oe.inputElement, oe.buttonElement, oe.optionsElement, oe.activationTrigger]), k = ha(ee || O), U = ha(C), te = $r(), [se, ue] = jv(w, j, te !== null ? (te & jt.Open) === jt.Open : Q === Ne.Open);
  Cv(se, ee, y.actions.closeCombobox);
  let X = b.__demoMode ? !1 : v && Q === Ne.Open;
  Dv(X, U);
  let W = b.__demoMode ? !1 : v && Q === Ne.Open;
  Ev(W, { allowed: ze(() => [ee, O, C], [ee, O, C]) }), ke(() => {
    var oe;
    b.optionsPropsRef.current.static = (oe = t.static) != null ? oe : !1;
  }, [b.optionsPropsRef, t.static]), ke(() => {
    b.optionsPropsRef.current.hold = m;
  }, [b.optionsPropsRef, m]), Hx(Q === Ne.Open, { container: C, accept(oe) {
    return oe.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : oe.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(oe) {
    oe.setAttribute("role", "none");
  } });
  let Z = bu([O == null ? void 0 : O.id]), K = Me(() => ({ open: Q === Ne.Open, option: void 0 }), [Q]), ae = ve(() => {
    y.actions.setActivationTrigger($l.Pointer);
  }), re = ve((oe) => {
    oe.preventDefault(), y.actions.setActivationTrigger($l.Pointer);
  }), me = Yf(R ? B() : {}, { "aria-labelledby": Z, role: "listbox", "aria-multiselectable": b.mode === Xt.Multi ? !0 : void 0, id: d, ref: Y, style: { ...S.style, ...N, "--input-width": ah(ee, !0).width, "--button-width": ah(O, !0).width }, onWheel: _ === $l.Pointer ? void 0 : ae, onMouseDown: re, ...Nv(ue) }), V = se && Q === Ne.Closed, I = Rf(V, (a = b.virtual) == null ? void 0 : a.options), de = Rf(V, b.value), xe = ve((oe) => b.compare(de, oe)), _e = Me(() => {
    if (!b.virtual) return b;
    if (I === void 0) throw new Error("Missing `options` in virtual mode");
    return I !== b.virtual.options ? { ...b, virtual: { ...b.virtual, options: I } } : b;
  }, [b, I, (r = b.virtual) == null ? void 0 : r.options]);
  b.virtual && Object.assign(S, { children: ie.createElement(Or.Provider, { value: _e }, ie.createElement(mE, { slot: K }, S.children)) });
  let ne = yt(), le = Me(() => b.mode === Xt.Multi ? b : { ...b, isSelected: xe }, [b, xe]);
  return ie.createElement(t0, { enabled: p ? t.static || se : !1, ownerDocument: k }, ie.createElement(Or.Provider, { value: le }, ne({ ourProps: me, theirProps: { ...S, children: ie.createElement(Kw, { freeze: V }, typeof S.children == "function" ? (u = S.children) == null ? void 0 : u.call(S, K) : S.children) }, slot: K, defaultTag: SE, features: xE, visible: se, name: "Combobox.Options" })));
}
let EE = "div";
function CE(t, i) {
  var a, r, u;
  let c = gi("Combobox.Option"), d = Hr("Combobox.Option"), m = Rn(), { id: g = `headlessui-combobox-option-${m}`, value: p, disabled: v = (u = (r = (a = c.virtual) == null ? void 0 : a.disabled) == null ? void 0 : r.call(a, p)) != null ? u : !1, order: w = null, ...S } = t, [y] = dt(d, (ue) => [ue.inputElement]), b = Av(y), R = dt(d, ze((ue) => d.selectors.isActive(ue, p, g), [p, g])), M = c.isSelected(p), N = pe(null), j = kl({ disabled: v, value: p, domRef: N, order: w }), $ = Ke(r0), B = $t(i, N, $ ? $.measureElement : null), Y = ve(() => {
    d.actions.setIsTyping(!1), d.actions.onChange(p);
  });
  ke(() => d.actions.registerOption(g, j), [j, g]);
  let Q = dt(d, ze((ue) => d.selectors.shouldScrollIntoView(ue, p, g), [p, g]));
  ke(() => {
    if (Q) return Ln().requestAnimationFrame(() => {
      var ue, X;
      (X = (ue = N.current) == null ? void 0 : ue.scrollIntoView) == null || X.call(ue, { block: "nearest" });
    });
  }, [Q, N]);
  let ee = ve((ue) => {
    ue.preventDefault(), ue.button === Jf.Left && (v || (Y(), xf() || requestAnimationFrame(() => b()), c.mode === Xt.Single && d.actions.closeCombobox()));
  }), O = ve(() => {
    if (v) return d.actions.goToOption({ focus: vt.Nothing });
    let ue = c.calculateIndex(p);
    d.actions.goToOption({ focus: vt.Specific, idx: ue });
  }), C = Ax(), _ = ve((ue) => C.update(ue)), k = ve((ue) => {
    if (!C.wasMoved(ue) || v || R) return;
    let X = c.calculateIndex(p);
    d.actions.goToOption({ focus: vt.Specific, idx: X }, $l.Pointer);
  }), U = ve((ue) => {
    C.wasMoved(ue) && (v || R && (c.optionsPropsRef.current.hold || d.actions.goToOption({ focus: vt.Nothing })));
  }), te = Me(() => ({ active: R, focus: R, selected: M, disabled: v }), [R, M, v]), se = { id: g, ref: B, role: "option", tabIndex: v === !0 ? void 0 : -1, "aria-disabled": v === !0 ? !0 : void 0, "aria-selected": M, disabled: void 0, onMouseDown: ee, onFocus: O, onPointerEnter: _, onMouseEnter: _, onPointerMove: k, onMouseMove: k, onPointerLeave: U, onMouseLeave: U };
  return yt()({ ourProps: se, theirProps: S, slot: te, defaultTag: EE, name: "Combobox.Option" });
}
let RE = ut(pE), Mf = ut(bE), o0 = ut(vE), TE = $S, u0 = ut(wE), Of = ut(CE), ME = Object.assign(RE, { Input: o0, Button: Mf, Label: TE, Options: u0, Option: Of });
function OE(t, i = typeof document < "u" ? document.defaultView : null, a) {
  let r = Dr(t, "escape");
  Xf(i, "keydown", (u) => {
    r && (u.defaultPrevented || u.key === Mt.Escape && a(u));
  });
}
function _E() {
  var t;
  let [i] = Ee(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [a, r] = Ee((t = i == null ? void 0 : i.matches) != null ? t : !1);
  return ke(() => {
    if (!i) return;
    function u(c) {
      r(c.matches);
    }
    return i.addEventListener("change", u), () => i.removeEventListener("change", u);
  }, [i]), a;
}
function AE({ defaultContainers: t = [], portals: i, mainTreeNode: a } = {}) {
  let r = ha(a), u = ve(() => {
    var c, d;
    let m = [];
    for (let g of t) g !== null && (ll(g) ? m.push(g) : "current" in g && ll(g.current) && m.push(g.current));
    if (i != null && i.current) for (let g of i.current) m.push(g);
    for (let g of (c = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? c : []) g !== document.body && g !== document.head && ll(g) && g.id !== "headlessui-portal-root" && (a && (g.contains(a) || g.contains((d = a == null ? void 0 : a.getRootNode()) == null ? void 0 : d.host)) || m.some((p) => g.contains(p)) || m.push(g));
    return m;
  });
  return { resolveContainers: u, contains: ve((c) => u().some((d) => d.contains(c))) };
}
let s0 = ot(null);
function Nh({ children: t, node: i }) {
  let [a, r] = Ee(null), u = c0(i ?? a);
  return ie.createElement(s0.Provider, { value: u }, t, u === null && ie.createElement(Cr, { features: si.Hidden, ref: (c) => {
    var d, m;
    if (c) {
      for (let g of (m = (d = fi(c)) == null ? void 0 : d.querySelectorAll("html > *, body > *")) != null ? m : []) if (g !== document.body && g !== document.head && ll(g) && g != null && g.contains(c)) {
        r(g);
        break;
      }
    }
  } }));
}
function c0(t = null) {
  var i;
  return (i = Ke(s0)) != null ? i : t;
}
function td() {
  let t = pe(!1);
  return ke(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
var br = ((t) => (t[t.Forwards = 0] = "Forwards", t[t.Backwards = 1] = "Backwards", t))(br || {});
function DE() {
  let t = pe(0);
  return Ov(!0, "keydown", (i) => {
    i.key === "Tab" && (t.current = i.shiftKey ? 1 : 0);
  }, !0), t;
}
function f0(t) {
  if (!t) return /* @__PURE__ */ new Set();
  if (typeof t == "function") return new Set(t());
  let i = /* @__PURE__ */ new Set();
  for (let a of t.current) ll(a.current) && i.add(a.current);
  return i;
}
let NE = "div";
var ca = ((t) => (t[t.None = 0] = "None", t[t.InitialFocus = 1] = "InitialFocus", t[t.TabLock = 2] = "TabLock", t[t.FocusLock = 4] = "FocusLock", t[t.RestoreFocus = 8] = "RestoreFocus", t[t.AutoFocus = 16] = "AutoFocus", t))(ca || {});
function jE(t, i) {
  let a = pe(null), r = $t(a, i), { initialFocus: u, initialFocusFallback: c, containers: d, features: m = 15, ...g } = t;
  Lr() || (m = 0);
  let p = ha(a);
  HE(m, { ownerDocument: p });
  let v = FE(m, { ownerDocument: p, container: a, initialFocus: u, initialFocusFallback: c });
  VE(m, { ownerDocument: p, container: a, containers: d, previousActiveElement: v });
  let w = DE(), S = ve((j) => {
    if (!hn(a.current)) return;
    let $ = a.current;
    ((B) => B())(() => {
      zt(w.current, { [br.Forwards]: () => {
        wr($, el.First, { skipElements: [j.relatedTarget, c] });
      }, [br.Backwards]: () => {
        wr($, el.Last, { skipElements: [j.relatedTarget, c] });
      } });
    });
  }), y = Dr(!!(m & 2), "focus-trap#tab-lock"), b = Sa(), R = pe(!1), M = { ref: r, onKeyDown(j) {
    j.key == "Tab" && (R.current = !0, b.requestAnimationFrame(() => {
      R.current = !1;
    }));
  }, onBlur(j) {
    if (!(m & 4)) return;
    let $ = f0(d);
    hn(a.current) && $.add(a.current);
    let B = j.relatedTarget;
    nl(B) && B.dataset.headlessuiFocusGuard !== "true" && (d0($, B) || (R.current ? wr(a.current, zt(w.current, { [br.Forwards]: () => el.Next, [br.Backwards]: () => el.Previous }) | el.WrapAround, { relativeTo: j.target }) : nl(j.target) && al(j.target)));
  } }, N = yt();
  return ie.createElement(ie.Fragment, null, y && ie.createElement(Cr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: S, features: si.Focusable }), N({ ourProps: M, theirProps: g, defaultTag: NE, name: "FocusTrap" }), y && ie.createElement(Cr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: S, features: si.Focusable }));
}
let zE = ut(jE), $E = Object.assign(zE, { features: ca });
function LE(t = !0) {
  let i = pe(jn.slice());
  return Rr(([a], [r]) => {
    r === !0 && a === !1 && hu(() => {
      i.current.splice(0);
    }), r === !1 && a === !0 && (i.current = jn.slice());
  }, [t, jn, i]), ve(() => {
    var a;
    return (a = i.current.find((r) => r != null && r.isConnected)) != null ? a : null;
  });
}
function HE(t, { ownerDocument: i }) {
  let a = !!(t & 8), r = LE(a);
  Rr(() => {
    a || (i == null ? void 0 : i.activeElement) === (i == null ? void 0 : i.body) && al(r());
  }, [a]), ed(() => {
    a && al(r());
  });
}
function FE(t, { ownerDocument: i, container: a, initialFocus: r, initialFocusFallback: u }) {
  let c = pe(null), d = Dr(!!(t & 1), "focus-trap#initial-focus"), m = td();
  return Rr(() => {
    if (t === 0) return;
    if (!d) {
      u != null && u.current && al(u.current);
      return;
    }
    let g = a.current;
    g && hu(() => {
      if (!m.current) return;
      let p = i == null ? void 0 : i.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === p) {
          c.current = p;
          return;
        }
      } else if (g.contains(p)) {
        c.current = p;
        return;
      }
      if (r != null && r.current) al(r.current);
      else {
        if (t & 16) {
          if (wr(g, el.First | el.AutoFocus) !== Sf.Error) return;
        } else if (wr(g, el.First) !== Sf.Error) return;
        if (u != null && u.current && (al(u.current), (i == null ? void 0 : i.activeElement) === u.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      c.current = i == null ? void 0 : i.activeElement;
    });
  }, [u, d, t]), c;
}
function VE(t, { ownerDocument: i, container: a, containers: r, previousActiveElement: u }) {
  let c = td(), d = !!(t & 4);
  Xf(i == null ? void 0 : i.defaultView, "focus", (m) => {
    if (!d || !c.current) return;
    let g = f0(r);
    hn(a.current) && g.add(a.current);
    let p = u.current;
    if (!p) return;
    let v = m.target;
    hn(v) ? d0(g, v) ? (u.current = v, al(v)) : (m.preventDefault(), m.stopPropagation(), al(p)) : al(u.current);
  }, !0);
}
function d0(t, i) {
  for (let a of t) if (a.contains(i)) return !0;
  return !1;
}
function m0(t) {
  var i;
  return !!(t.enter || t.enterFrom || t.enterTo || t.leave || t.leaveFrom || t.leaveTo) || ((i = t.as) != null ? i : p0) !== Zt || ie.Children.count(t.children) === 1;
}
let Tu = ot(null);
Tu.displayName = "TransitionContext";
var kE = ((t) => (t.Visible = "visible", t.Hidden = "hidden", t))(kE || {});
function UE() {
  let t = Ke(Tu);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
function BE() {
  let t = Ke(Mu);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
let Mu = ot(null);
Mu.displayName = "NestingContext";
function Ou(t) {
  return "children" in t ? Ou(t.children) : t.current.filter(({ el: i }) => i.current !== null).filter(({ state: i }) => i === "visible").length > 0;
}
function g0(t, i) {
  let a = kl(t), r = pe([]), u = td(), c = Sa(), d = ve((y, b = Nl.Hidden) => {
    let R = r.current.findIndex(({ el: M }) => M === y);
    R !== -1 && (zt(b, { [Nl.Unmount]() {
      r.current.splice(R, 1);
    }, [Nl.Hidden]() {
      r.current[R].state = "hidden";
    } }), c.microTask(() => {
      var M;
      !Ou(r) && u.current && ((M = a.current) == null || M.call(a));
    }));
  }), m = ve((y) => {
    let b = r.current.find(({ el: R }) => R === y);
    return b ? b.state !== "visible" && (b.state = "visible") : r.current.push({ el: y, state: "visible" }), () => d(y, Nl.Unmount);
  }), g = pe([]), p = pe(Promise.resolve()), v = pe({ enter: [], leave: [] }), w = ve((y, b, R) => {
    g.current.splice(0), i && (i.chains.current[b] = i.chains.current[b].filter(([M]) => M !== y)), i == null || i.chains.current[b].push([y, new Promise((M) => {
      g.current.push(M);
    })]), i == null || i.chains.current[b].push([y, new Promise((M) => {
      Promise.all(v.current[b].map(([N, j]) => j)).then(() => M());
    })]), b === "enter" ? p.current = p.current.then(() => i == null ? void 0 : i.wait.current).then(() => R(b)) : R(b);
  }), S = ve((y, b, R) => {
    Promise.all(v.current[b].splice(0).map(([M, N]) => N)).then(() => {
      var M;
      (M = g.current.shift()) == null || M();
    }).then(() => R(b));
  });
  return Me(() => ({ children: r, register: m, unregister: d, onStart: w, onStop: S, wait: p, chains: v }), [m, d, r, w, S, v, p]);
}
let p0 = Zt, h0 = ui.RenderStrategy;
function qE(t, i) {
  var a, r;
  let { transition: u = !0, beforeEnter: c, afterEnter: d, beforeLeave: m, afterLeave: g, enter: p, enterFrom: v, enterTo: w, entered: S, leave: y, leaveFrom: b, leaveTo: R, ...M } = t, [N, j] = Ee(null), $ = pe(null), B = m0(t), Y = $t(...B ? [$, i, j] : i === null ? [] : [i]), Q = (a = M.unmount) == null || a ? Nl.Unmount : Nl.Hidden, { show: ee, appear: O, initial: C } = UE(), [_, k] = Ee(ee ? "visible" : "hidden"), U = BE(), { register: te, unregister: se } = U;
  ke(() => te($), [te, $]), ke(() => {
    if (Q === Nl.Hidden && $.current) {
      if (ee && _ !== "visible") {
        k("visible");
        return;
      }
      return zt(_, { hidden: () => se($), visible: () => te($) });
    }
  }, [_, $, te, se, ee, Q]);
  let ue = Lr();
  ke(() => {
    if (B && ue && _ === "visible" && $.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [$, _, ue, B]);
  let X = C && !O, W = O && ee && C, Z = pe(!1), K = g0(() => {
    Z.current || (k("hidden"), se($));
  }, U), ae = ve((_e) => {
    Z.current = !0;
    let ne = _e ? "enter" : "leave";
    K.onStart($, ne, (le) => {
      le === "enter" ? c == null || c() : le === "leave" && (m == null || m());
    });
  }), re = ve((_e) => {
    let ne = _e ? "enter" : "leave";
    Z.current = !1, K.onStop($, ne, (le) => {
      le === "enter" ? d == null || d() : le === "leave" && (g == null || g());
    }), ne === "leave" && !Ou(K) && (k("hidden"), se($));
  });
  Ve(() => {
    B && u || (ae(ee), re(ee));
  }, [ee, B, u]);
  let me = !(!u || !B || !ue || X), [, V] = jv(me, N, ee, { start: ae, end: re }), I = Dl({ ref: Y, className: ((r = yf(M.className, W && p, W && v, V.enter && p, V.enter && V.closed && v, V.enter && !V.closed && w, V.leave && y, V.leave && !V.closed && b, V.leave && V.closed && R, !V.transition && ee && S)) == null ? void 0 : r.trim()) || void 0, ...Nv(V) }), de = 0;
  _ === "visible" && (de |= jt.Open), _ === "hidden" && (de |= jt.Closed), ee && _ === "hidden" && (de |= jt.Opening), !ee && _ === "visible" && (de |= jt.Closing);
  let xe = yt();
  return ie.createElement(Mu.Provider, { value: K }, ie.createElement(Kv, { value: de }, xe({ ourProps: I, theirProps: M, defaultTag: p0, features: h0, visible: _ === "visible", name: "Transition.Child" })));
}
function GE(t, i) {
  let { show: a, appear: r = !1, unmount: u = !0, ...c } = t, d = pe(null), m = m0(t), g = $t(...m ? [d, i] : i === null ? [] : [i]);
  Lr();
  let p = $r();
  if (a === void 0 && p !== null && (a = (p & jt.Open) === jt.Open), a === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [v, w] = Ee(a ? "visible" : "hidden"), S = g0(() => {
    a || w("hidden");
  }), [y, b] = Ee(!0), R = pe([a]);
  ke(() => {
    y !== !1 && R.current[R.current.length - 1] !== a && (R.current.push(a), b(!1));
  }, [R, a]);
  let M = Me(() => ({ show: a, appear: r, initial: y }), [a, r, y]);
  ke(() => {
    a ? w("visible") : !Ou(S) && d.current !== null && w("hidden");
  }, [a, S]);
  let N = { unmount: u }, j = ve(() => {
    var Y;
    y && b(!1), (Y = t.beforeEnter) == null || Y.call(t);
  }), $ = ve(() => {
    var Y;
    y && b(!1), (Y = t.beforeLeave) == null || Y.call(t);
  }), B = yt();
  return ie.createElement(Mu.Provider, { value: S }, ie.createElement(Tu.Provider, { value: M }, B({ ourProps: { ...N, as: Zt, children: ie.createElement(v0, { ref: g, ...N, ...c, beforeEnter: j, beforeLeave: $ }) }, theirProps: {}, defaultTag: Zt, features: h0, visible: v === "visible", name: "Transition" })));
}
function YE(t, i) {
  let a = Ke(Tu) !== null, r = $r() !== null;
  return ie.createElement(ie.Fragment, null, !a && r ? ie.createElement(_f, { ref: i, ...t }) : ie.createElement(v0, { ref: i, ...t }));
}
let _f = ut(GE), v0 = ut(qE), nd = ut(YE), IE = Object.assign(_f, { Child: nd, Root: _f });
var XE = ((t) => (t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(XE || {}), ZE = ((t) => (t[t.SetTitleId = 0] = "SetTitleId", t))(ZE || {});
let QE = { 0(t, i) {
  return t.titleId === i.id ? t : { ...t, titleId: i.id };
} }, ld = ot(null);
ld.displayName = "DialogContext";
function _u(t) {
  let i = Ke(ld);
  if (i === null) {
    let a = new Error(`<${t} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(a, _u), a;
  }
  return i;
}
function KE(t, i) {
  return zt(i.type, QE, t, i);
}
let jh = ut(function(t, i) {
  let a = Rn(), { id: r = `headlessui-dialog-${a}`, open: u, onClose: c, initialFocus: d, role: m = "dialog", autoFocus: g = !0, __demoMode: p = !1, unmount: v = !1, ...w } = t, S = pe(!1);
  m = function() {
    return m === "dialog" || m === "alertdialog" ? m : (S.current || (S.current = !0, console.warn(`Invalid role [${m}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let y = $r();
  u === void 0 && y !== null && (u = (y & jt.Open) === jt.Open);
  let b = pe(null), R = $t(b, i), M = ha(b), N = u ? 0 : 1, [j, $] = kf(KE, { titleId: null, descriptionId: null, panelRef: y1() }), B = ve(() => c(!1)), Y = ve((V) => $({ type: 0, id: V })), Q = Lr() ? N === 0 : !1, [ee, O] = oE(), C = { get current() {
    var V;
    return (V = j.panelRef.current) != null ? V : b.current;
  } }, _ = c0(), { resolveContainers: k } = AE({ mainTreeNode: _, portals: ee, defaultContainers: [C] }), U = y !== null ? (y & jt.Closing) === jt.Closing : !1;
  Ev(p || U ? !1 : Q, { allowed: ve(() => {
    var V, I;
    return [(I = (V = b.current) == null ? void 0 : V.closest("[data-headlessui-portal]")) != null ? I : null];
  }), disallowed: ve(() => {
    var V;
    return [(V = _ == null ? void 0 : _.closest("body > *:not(#headlessui-portal-root)")) != null ? V : null];
  }) });
  let te = Su.get(null);
  ke(() => {
    if (Q) return te.actions.push(r), () => te.actions.pop(r);
  }, [te, r, Q]);
  let se = dt(te, ze((V) => te.selectors.isTop(V, r), [te, r]));
  _v(se, k, (V) => {
    V.preventDefault(), B();
  }), OE(se, M == null ? void 0 : M.defaultView, (V) => {
    V.preventDefault(), V.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), B();
  }), Dv(p || U ? !1 : Q, M, k), Cv(Q, b, B);
  let [ue, X] = TS(), W = Me(() => [{ dialogState: N, close: B, setTitleId: Y, unmount: v }, j], [N, j, B, Y, v]), Z = Me(() => ({ open: N === 0 }), [N]), K = { ref: R, id: r, role: m, tabIndex: -1, "aria-modal": p ? void 0 : N === 0 ? !0 : void 0, "aria-labelledby": j.titleId, "aria-describedby": ue, unmount: v }, ae = !_E(), re = ca.None;
  Q && !p && (re |= ca.RestoreFocus, re |= ca.TabLock, g && (re |= ca.AutoFocus), ae && (re |= ca.InitialFocus));
  let me = yt();
  return ie.createElement(Pw, null, ie.createElement(Ah, { force: !0 }, ie.createElement(t0, null, ie.createElement(ld.Provider, { value: W }, ie.createElement(e0, { target: b }, ie.createElement(Ah, { force: !1 }, ie.createElement(X, { slot: Z }, ie.createElement(O, null, ie.createElement($E, { initialFocus: d, initialFocusFallback: b, containers: k, features: re }, ie.createElement(HS, { value: B }, me({ ourProps: K, theirProps: w, slot: Z, defaultTag: PE, features: WE, visible: N === 0, name: "Dialog" })))))))))));
}), PE = "div", WE = ui.RenderStrategy | ui.Static;
function JE(t, i) {
  let { transition: a = !1, open: r, ...u } = t, c = $r(), d = t.hasOwnProperty("open") || c !== null, m = t.hasOwnProperty("onClose");
  if (!d && !m) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!d) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!m) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!c && typeof t.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${t.open}`);
  if (typeof t.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${t.onClose}`);
  return (r !== void 0 || a) && !u.static ? ie.createElement(Nh, null, ie.createElement(IE, { show: r, transition: a, unmount: u.unmount }, ie.createElement(jh, { ref: i, ...u }))) : ie.createElement(Nh, null, ie.createElement(jh, { ref: i, open: r, ...u }));
}
let eC = "div";
function tC(t, i) {
  let a = Rn(), { id: r = `headlessui-dialog-panel-${a}`, transition: u = !1, ...c } = t, [{ dialogState: d, unmount: m }, g] = _u("Dialog.Panel"), p = $t(i, g.panelRef), v = Me(() => ({ open: d === 0 }), [d]), w = ve((M) => {
    M.stopPropagation();
  }), S = { ref: p, id: r, onClick: w }, y = u ? nd : Zt, b = u ? { unmount: m } : {}, R = yt();
  return ie.createElement(y, { ...b }, R({ ourProps: S, theirProps: c, slot: v, defaultTag: eC, name: "Dialog.Panel" }));
}
let nC = "div";
function lC(t, i) {
  let { transition: a = !1, ...r } = t, [{ dialogState: u, unmount: c }] = _u("Dialog.Backdrop"), d = Me(() => ({ open: u === 0 }), [u]), m = { ref: i, "aria-hidden": !0 }, g = a ? nd : Zt, p = a ? { unmount: c } : {}, v = yt();
  return ie.createElement(g, { ...p }, v({ ourProps: m, theirProps: r, slot: d, defaultTag: nC, name: "Dialog.Backdrop" }));
}
let aC = "h2";
function iC(t, i) {
  let a = Rn(), { id: r = `headlessui-dialog-title-${a}`, ...u } = t, [{ dialogState: c, setTitleId: d }] = _u("Dialog.Title"), m = $t(i);
  Ve(() => (d(r), () => d(null)), [r, d]);
  let g = Me(() => ({ open: c === 0 }), [c]), p = { ref: m, id: r };
  return yt()({ ourProps: p, theirProps: u, slot: g, defaultTag: aC, name: "Dialog.Title" });
}
let rC = ut(JE), y0 = ut(tC), oC = ut(lC), b0 = ut(iC), uC = Object.assign(rC, { Panel: y0, Title: b0, Description: AS });
function sC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
  }));
}
const cC = /* @__PURE__ */ H.forwardRef(sC);
function fC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
  }));
}
const dC = /* @__PURE__ */ H.forwardRef(fC);
function mC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 12.75 6 6 9-13.5"
  }));
}
const gC = /* @__PURE__ */ H.forwardRef(mC);
function pC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const hC = /* @__PURE__ */ H.forwardRef(pC);
function vC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const yC = /* @__PURE__ */ H.forwardRef(vC);
function bC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
  }));
}
const SC = /* @__PURE__ */ H.forwardRef(bC);
function xC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const wC = /* @__PURE__ */ H.forwardRef(xC);
function EC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const CC = /* @__PURE__ */ H.forwardRef(EC);
function RC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const TC = /* @__PURE__ */ H.forwardRef(RC);
function MC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m7.5-7.5h-15"
  }));
}
const OC = /* @__PURE__ */ H.forwardRef(MC);
function _C({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const AC = /* @__PURE__ */ H.forwardRef(_C);
function DC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const NC = /* @__PURE__ */ H.forwardRef(DC);
function jC({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const S0 = /* @__PURE__ */ H.forwardRef(jC), zC = { confirmationModal: { defaultConfirm: "Confirm", cancel: "Cancel" }, select: { optionPlaceholder: "Select an option", noOptions: "No options" } }, $C = { upload: "Upload", uploadBlocked: "Your data has validation errors. Fix them before uploading.", back: "Back", loader: { failed: "Something went wrong", uploading: "Uploading", success: "Success", retry: "Try again", backToPreview: "Back to edit" }, backToMappingConfirmation: { title: "Are you sure?", subTitle: "This will discard all changes made after the data was mapped", confirmationText: "Yes, go back", cancelText: "No, stay here" } }, LC = { uploadAFile: "Upload a file", requiredColumns: "Required columns", optionalColumns: "Optional columns", requiredColumnsTooltip: "This column is required for the import", optionalColumnsTooltip: "This column is optional for the import", importerInformation: "Make sure your file includes all the required columns.", dragAndDrop: "Drag and drop your file here", maxFileSizeInBytes: "Limit {{size}}", browseFiles: "Browse Files", enterManually: "Or just manually enter your data", expandOptional: "Show more", collapseOptional: "Show less" }, HC = { numberRowsImported: "{{count}} Rows Imported", back: "Back", confirm: "Confirm", noData: "No preview data", used: "Used", unused: "Unused", importedColumn: "Imported column", destinationColumn: "Destination column", dataPreview: "Data preview for {{csvHeader}}", mappingsNotValid: "Please set all required mappings", reviewAndConfirm: "Review and confirm each mapping" }, FC = { validationPassed: "All rows pass validation!", removeConfirmationModalTitle: "Remove rows", removeConfirmationModalConfirmationText: "Remove", removeConfirmationModalSubTitle: "Are you sure you want to remove {{rowsCount}} rows?", readOnly: "Read Only", editTooltip: "Double click to edit", all: "All", valid: "Valid", invalid: "Invalid", filterByError: "Filter by error", search: "Search", removeRowsTooltip: "Remove rows", removeRowsTooltipNoRowsSelected: "Please select at least one record in order to delete it", addRowsTooltip: "Add a new row", downloadSheetTooltip: "Download this sheet", reset: "Start over", resetTooltip: "Start over", resetConfirmationModalTitle: "Start over", resetConfirmationModalConfirmationText: "Start over", resetConfirmationModalSubTitle: "Are you sure you want to start over? This will remove all data and reset the sheet to its initial state." }, VC = { includes: "Value is not in the list of allowed values", integer: "This is not a valid number", multiIncludes: "This value is not valid", regex: "This value is invalid", required: "This value is required", unique: "This value is not unique" }, kC = { success: "Success", importSuccessful: "Import successful", importSuccessfulWithErrors: "Import successful with errors", successDescription: "{{totalRecords}} records were processed in your import", successDescriptionWithStats: "{{recordsImported}} out of {{totalRecords}} records were imported and are now available in your database", error: "Error", importFailed: "Import failed", failedDescription: "An error occurred while importing your data. Please try again", importDetails: "Import details", importDetailsDescription: "Details about your recent data import", fileInformation: "File information", dataEnteredManually: "Data entered manually", original: "Original", processed: "Processed", downloadProcessedData: "Download processed data", importResults: "Import results", totalRows: "{{totalRows}} rows", status: "Status", failed: "Failed", dataImport: "Data import", statisticsSkipped: "{{skipped}} skipped", statisticsFailed: "{{failed}} failed", statisticsImported: "{{imported}} imported", continue: "Continue" }, UC = {
  components: zC,
  importer: $C,
  uploader: LC,
  mapper: HC,
  sheet: FC,
  validators: VC,
  importStatus: kC
}, BC = { confirmationModal: { defaultConfirm: "Confirmer", cancel: "Annuler" }, select: { optionPlaceholder: "Sélectionnez une option", noOptions: "Pas d'options" } }, qC = { upload: "Télécharger", uploadBlocked: "Vos données comportent des erreurs de validation. Corrigez-les avant de les télécharger.", back: "Retour", loader: { failed: "Quelque chose a mal tourné", uploading: "Téléchargement en cours", success: "Succès", retry: "Réessayer", backToPreview: "Retour à modifier" }, backToMappingConfirmation: { title: "Êtes-vous sûr ?", subTitle: "Cela annulera toutes les modifications effectuées après le mappage des données", confirmationText: "Oui, revenir en arrière", cancelText: "Non, rester ici" } }, GC = { uploadAFile: "Télécharger un fichier", requiredColumns: "Colonnes requises", optionalColumns: "Colonnes optionnelles", requiredColumnsTooltip: "Cette colonne est requise pour l'importation", optionalColumnsTooltip: "Cette colonne est optionnelle pour l'importation", importerInformation: "Assurez-vous que votre fichier inclut toutes les colonnes requises.", dragAndDrop: "Glissez et déposez votre fichier ici", maxFileSizeInBytes: "Limite {{size}}", browseFiles: "Parcourir les fichiers", enterManually: "Ou saisissez vos données manuellement" }, YC = { numberRowsImported: "{{count}} lignes importées", back: "Retour", confirm: "Confirmer", noData: "Aucune donnée prévue", unused: "Non utilisées", used: "Utilisées", importedColumn: "Colonne importée", destinationColumn: "Colonne de destination", dataPreview: "Aperçu des données pour {{csvHeader}}", mappingsNotValid: "Veuillez définir toutes les mappings requis", reviewAndConfirm: "Revoir et confirmer chaque mapping" }, IC = { validationPassed: "Toutes les lignes passent la validation !", removeConfirmationModalTitle: "Supprimer les lignes", removeConfirmationModalConfirmationText: "Supprimer", removeConfirmationModalSubTitle: "Êtes-vous sûr de vouloir supprimer {{rowsCount}} lignes ?", readOnly: "Lecture seule", editTooltip: "Double-cliquez pour modifier", all: "Toutes", valid: "Valides", invalid: "Invalides", filterByError: "Filtrer par erreur", search: "Recherche", removeRowsTooltip: "Supprimer les lignes", removeRowsTooltipNoRowsSelected: "Veuillez sélectionner au moins un enregistrement avant de le supprimer", addRowsTooltip: "Ajouter une nouvelle ligne", downloadSheetTooltip: "Télécharger cette feuille", reset: "Recommencer", resetTooltip: "Recommencer", resetConfirmationModalTitle: "Recommencer", resetConfirmationModalConfirmationText: "Recommencer", resetConfirmationModalSubTitle: "Êtes-vous sûr de vouloir recommencer ? Cela supprimera toutes les données et réinitialisera la feuille à son état initial." }, XC = { includes: "La valeur n'est pas dans la liste des valeurs autorisées", integer: "Ce n'est pas un nombre valide", multiIncludes: "Cette valeur n'est pas valide", regex: "Cette valeur est invalide", required: "Cette valeur est obligatoire", unique: "Cette valeur n'est pas unique" }, ZC = { success: "Importation réussie", importSuccessful: "Importation réussie", importSuccessfulWithErrors: "Importation réussie avec erreurs", successDescription: "{{count}} enregistrements ont été importés avec succès", successDescriptionWithStats: "{{recordsImported}} sur {{totalRecords}} enregistrements ont été importés avec succès", error: "Importation échouée", errorDescription: "Une erreur est survenue lors de l'importation. Veuillez réessayer", importDetails: "Détails de l'importation", importDetailsDescription: "Détails sur votre dernière importation", fileInformation: "Informations sur le fichier", dataEnteredManually: "Données saisies manuellement", original: "Original", processed: "Traité", downloadProcessedData: "Télécharger les données traitées", importResults: "Résultats de l'importation", totalRows: "{{totalRows}} enregistrements", status: "Statut", failed: "Échoué", dataImport: "Importation de données", statisticsSkipped: "{{skipped}} ignorés", statisticsFailed: "{{failed}} échoués", statisticsImported: "{{imported}} importés", continue: "Continuer" }, QC = {
  components: BC,
  importer: qC,
  uploader: GC,
  mapper: YC,
  sheet: IC,
  validators: XC,
  importStatus: ZC
}, KC = { confirmationModal: { defaultConfirm: "Confirmar", cancel: "Cancelar" }, select: { optionPlaceholder: "Selecione uma opção", noOptions: "Sem opções" } }, PC = { upload: "Enviar", uploadBlocked: "Seus dados têm erros de validação. Corrija-os antes de enviar.", back: "Voltar", loader: { failed: "Algo deu errado", uploading: "Enviando", success: "Sucesso", retry: "Tentar novamente", backToPreview: "Voltar para editar" }, backToMappingConfirmation: { title: "Tem certeza?", subTitle: "Isso descartará todas as alterações feitas após o mapeamento dos dados", confirmationText: "Sim, voltar", cancelText: "Não, permanecer aqui" } }, WC = { uploadAFile: "Enviar um arquivo", requiredColumns: "Colunas obrigatórias", optionalColumns: "Colunas opcionais", requiredColumnsTooltip: "Esta coluna é obrigatória para a importação", optionalColumnsTooltip: "Esta coluna é opcional para a importação", importerInformation: "Certifique-se de que seu arquivo inclua todas as colunas obrigatórias.", dragAndDrop: "Arraste e solte seu arquivo aqui", maxFileSizeInBytes: "Limite {{size}}", browseFiles: "Procurar arquivos", enterManually: "Ou apenas insira seus dados manualmente" }, JC = { numberRowsImported: "{{count}} linhas importadas", back: "Voltar", confirm: "Confirmar", noData: "Nenhum dado de pré-visualização", used: "Usado", unused: "Não usado", importedColumn: "Coluna importada", destinationColumn: "Coluna de destino", dataPreview: "Pré-visualização de dados para {{csvHeader}}", mappingsNotValid: "Por favor, defina todos os mapeamentos obrigatórios", reviewAndConfirm: "Revise e confirme cada mapeamento" }, e2 = { validationPassed: "Todas as linhas passaram na validação!", removeConfirmationModalTitle: "Remover linhas", removeConfirmationModalConfirmationText: "Remover", removeConfirmationModalSubTitle: "Tem certeza que deseja remover {{rowsCount}} linhas?", readOnly: "Somente leitura", editTooltip: "Clique duas vezes para editar", all: "Todas", valid: "Válido", invalid: "Inválido", filterByError: "Filtrar por erro", search: "Buscar", removeRowsTooltip: "Remover linhas", removeRowsTooltipNoRowsSelected: "Selecione pelo menos um registro para deletá-lo", addRowsTooltip: "Adicionar nova linha", downloadSheetTooltip: "Baixar esta planilha", reset: "Recomeçar", resetTooltip: "Recomeçar", resetConfirmationModalTitle: "Recomeçar", resetConfirmationModalConfirmationText: "Recomeçar", resetConfirmationModalSubTitle: "Tem certeza que deseja recomeçar? Isso removerá todos os dados e resetará a planilha ao seu estado inicial." }, t2 = { includes: "O valor não está na lista de valores permitidos", integer: "Este não é um número válido", multiIncludes: "Este valor não é válido", regex: "Este valor é inválido", required: "Este valor é obrigatório", unique: "Este valor não é único" }, n2 = { success: "Sucesso", importSuccessful: "Importação bem-sucedida", importSuccessfulWithErrors: "Importação concluída com erros", successDescription: "{{totalRecords}} registros foram processados na sua importação", successDescriptionWithStats: "{{recordsImported}} de {{totalRecords}} registros foram importados e estão disponíveis na sua base de dados", error: "Erro", importFailed: "Falha na importação", failedDescription: "Ocorreu um erro ao importar seus dados. Tente novamente", importDetails: "Detalhes da importação", importDetailsDescription: "Detalhes sobre sua importação recente de dados", fileInformation: "Informações do arquivo", dataEnteredManually: "Dados inseridos manualmente", original: "Original", processed: "Processado", downloadProcessedData: "Baixar dados processados", importResults: "Resultados da importação", totalRows: "{{totalRows}} linhas", status: "Status", failed: "Falhou", dataImport: "Importação de dados", statisticsSkipped: "{{skipped}} ignoradas", statisticsFailed: "{{failed}} falharam", statisticsImported: "{{imported}} importadas", continue: "Continuar" }, l2 = {
  components: KC,
  importer: PC,
  uploader: WC,
  mapper: JC,
  sheet: e2,
  validators: t2,
  importStatus: n2
}, a2 = {
  en: UC,
  fr: QC,
  "pt-BR": l2
}, i2 = "en";
function zh(t, i) {
  const a = i.split(".");
  let r = a2[t];
  for (const u of a)
    if (r && typeof r == "object")
      r = r[u];
    else
      return i;
  return typeof r == "string" ? r : i;
}
function r2(t, i) {
  return t.replace(/{{([^}]+)}}/g, (a, r) => `${i[r] ?? `{${r}}`}`);
}
function o2(t, i) {
  const a = t.split(/({{[^}]+}})/g);
  return /* @__PURE__ */ E.jsx("span", { children: a.map((r) => {
    const u = r.match(/{{([^}]+)}}/);
    if (u) {
      const c = u[1];
      return i[c] ?? `{${c}}`;
    }
    return r;
  }) });
}
const x0 = ot(
  {}
);
function u2({
  children: t,
  selectedLocale: i
}) {
  const a = i ?? i2;
  function r(c, d = {}) {
    const m = zh(a, c);
    return r2(m, d);
  }
  function u(c, d = {}) {
    const m = zh(a, c);
    return o2(m, d);
  }
  return /* @__PURE__ */ E.jsx(x0.Provider, { value: { t: r, tHtml: u }, children: t });
}
function st() {
  return Ke(x0);
}
function Af({
  open: t,
  setOpen: i,
  title: a,
  subTitle: r,
  confirmationText: u,
  cancelText: c,
  onConfirm: d,
  variant: m = "default"
}) {
  const { t: g } = st(), p = {
    danger: {
      icon: /* @__PURE__ */ E.jsx(
        SC,
        {
          className: "text-hello-csv-danger size-6",
          "aria-hidden": "true"
        }
      ),
      btnVariant: "danger",
      bgColor: "bg-hello-csv-danger-extra-light"
    },
    default: {
      btnVariant: "primary"
    }
  }, { icon: v, btnVariant: w, bgColor: S } = p[m];
  return /* @__PURE__ */ E.jsxs(uC, { open: t, onClose: i, className: "relative z-10", children: [
    /* @__PURE__ */ E.jsx(
      oC,
      {
        transition: !0,
        className: "fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      }
    ),
    /* @__PURE__ */ E.jsx("div", { className: "fixed inset-0 z-10 w-screen overflow-y-auto", children: /* @__PURE__ */ E.jsx("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ E.jsxs(
      y0,
      {
        transition: !0,
        className: "relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95",
        children: [
          /* @__PURE__ */ E.jsxs("div", { className: "sm:flex sm:items-start", children: [
            v && /* @__PURE__ */ E.jsx(
              "div",
              {
                className: `mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${S} sm:mx-0 sm:size-10`,
                children: v
              }
            ),
            /* @__PURE__ */ E.jsxs("div", { className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left", children: [
              /* @__PURE__ */ E.jsx(
                b0,
                {
                  as: "h3",
                  className: "text-base font-semibold text-gray-900",
                  children: a
                }
              ),
              r && /* @__PURE__ */ E.jsx("div", { className: "mt-2", children: /* @__PURE__ */ E.jsx("p", { className: "text-sm text-gray-500", children: r }) })
            ] })
          ] }),
          /* @__PURE__ */ E.jsxs("div", { className: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse", children: [
            /* @__PURE__ */ E.jsx("div", { className: "sm:ml-3 sm:w-auto", children: /* @__PURE__ */ E.jsx(
              pn,
              {
                variant: w,
                onClick: () => {
                  d(), i(!1);
                },
                withFullWidth: !0,
                children: u ?? g("components.confirmationModal.defaultConfirm")
              }
            ) }),
            /* @__PURE__ */ E.jsx("div", { className: "mt-3 sm:mt-0 sm:w-auto", children: /* @__PURE__ */ E.jsx(
              pn,
              {
                variant: "tertiary",
                "data-autofocus": !0,
                onClick: () => i(!1),
                withFullWidth: !0,
                children: c ?? g("components.confirmationModal.cancel")
              }
            ) })
          ] })
        ]
      }
    ) }) })
  ] });
}
function wn(t) {
  return t && t.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (r) => r.toUpperCase());
}
const s2 = 100, w0 = 5, $h = [
  "text/csv",
  "text/tab-separated-values"
], Lh = ",", c2 = 500, f2 = "headlessui-portal-root", Df = "hello-csv", d2 = [
  // Name fields
  {
    id: "firstname",
    label: "First Name",
    type: "string",
    suggestedMappingKeywords: ["first name", "first"],
    validators: [{ validate: "required" }],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  {
    id: "lastname",
    label: "Last Name",
    type: "string",
    suggestedMappingKeywords: ["last name", "last"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  // Phone fields
  {
    id: "phone1Digits",
    label: "Primary Phone",
    type: "string",
    suggestedMappingKeywords: [
      "phone",
      "phone number",
      "phone number 1",
      "cell phone",
      "cell phone number",
      "cell phone number 1",
      "verified mobile phone",
      "home phone",
      "phone1",
      "phone 1",
      "mobile",
      "iphone",
      "home",
      "main"
    ],
    validators: [{ validate: "required" }],
    transformers: [
      {
        transformer: "custom",
        key: "phone_number",
        transformFn: (t) => typeof t != "string" ? "" : t.replace(/\D/g, "").slice(-10)
      }
    ]
  },
  {
    id: "phone1Label",
    label: "Primary Phone Type",
    type: "string",
    suggestedMappingKeywords: ["phone type", "phone type 1"],
    transformers: [
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      },
      {
        transformer: "strip"
      }
    ]
  },
  {
    id: "phone2Digits",
    label: "Secondary Phone",
    type: "string",
    suggestedMappingKeywords: [
      "phone number 2",
      "phone number 2 digits",
      "landline",
      "work phone",
      "work"
    ],
    transformers: [
      {
        transformer: "custom",
        key: "phone_number",
        transformFn: (t) => typeof t != "string" ? "" : t.replace(/\D/g, "").slice(-10)
      }
    ]
  },
  {
    id: "phone2Label",
    label: "Secondary Phone Type",
    type: "string",
    suggestedMappingKeywords: ["phone type", "phone type 2"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  // Email fields
  {
    id: "email1Email",
    label: "Primary Email",
    type: "string",
    suggestedMappingKeywords: [
      "email",
      "email address",
      "email address 1",
      "email_1"
    ],
    validators: [
      {
        validate: "email",
        error: "This email is not valid"
      }
    ],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "email1Label",
    label: "Primary Email Type",
    type: "string",
    suggestedMappingKeywords: ["email type", "email type 1"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  // Address fields
  {
    id: "address1Street",
    label: "Street Address",
    type: "string",
    suggestedMappingKeywords: ["address", "address 1", "address 1 street"],
    transformers: [
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      },
      {
        transformer: "strip"
      }
    ]
  },
  {
    id: "address1City",
    label: "City",
    type: "string",
    suggestedMappingKeywords: ["city", "city 1", "city 1 city"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  {
    id: "address1State",
    label: "State",
    type: "string",
    suggestedMappingKeywords: ["state", "state 1", "state 1 state"],
    transformers: [
      {
        transformer: "state_code"
      }
    ]
  },
  {
    id: "address1PostalCode",
    label: "Zip Code",
    type: "string",
    suggestedMappingKeywords: [
      "zip code",
      "zip code 1",
      "zip",
      "zip 1",
      "postal code",
      "postal code 1"
    ],
    validators: [
      {
        validate: "postal_code",
        error: "This is not a valid zip code"
      }
    ],
    transformers: [
      {
        transformer: "postal_code"
      }
    ]
  },
  // Donation fields
  {
    id: "expectedDonation",
    label: "Expected Donation",
    type: "number",
    suggestedMappingKeywords: [
      "expected donation",
      "likely donation",
      "amount"
    ],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "number",
        transformFn: (t) => {
          if (typeof t != "string") return 0;
          const i = parseInt(t.replace(/[^\d.]/g, ""));
          return isNaN(i) ? 0 : i;
        }
      }
    ]
  },
  {
    id: "pledgeAmount",
    label: "Pledge Amount",
    type: "number",
    suggestedMappingKeywords: [
      "pledge amount",
      "pledge amount 1",
      "pledge",
      "pledge amt"
    ],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "number",
        transformFn: (t) => {
          if (typeof t != "string") return 0;
          const i = parseInt(t.replace(/[^\d.]/g, ""));
          return isNaN(i) ? 0 : i;
        }
      }
    ]
  },
  {
    id: "pledgeDate",
    label: "Pledge Date",
    type: "string",
    suggestedMappingKeywords: ["pledge date", "pledge date 1"],
    transformers: [
      {
        transformer: "strip"
      }
    ]
  },
  {
    id: "donationAmount",
    label: "Donation Amount",
    type: "number",
    suggestedMappingKeywords: [
      "donation amount",
      "donation amount 1",
      "donation",
      "donated amt"
    ],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "number",
        transformFn: (t) => {
          if (typeof t != "string") return 0;
          const i = parseInt(t.replace(/[^\d.]/g, ""));
          return isNaN(i) ? 0 : i;
        }
      }
    ]
  },
  {
    id: "lastDonationDate",
    label: "Last Donation Date",
    type: "string",
    suggestedMappingKeywords: ["last donation date", "last donation date 1"],
    transformers: [
      {
        transformer: "strip"
      }
    ]
  },
  {
    id: "givingCapacity",
    label: "Giving Capacity",
    type: "number",
    suggestedMappingKeywords: ["giving capacity", "giving capacity 1"],
    transformers: [
      {
        transformer: "custom",
        key: "number",
        transformFn: (t) => {
          if (typeof t != "string") return 0;
          const i = parseInt(t.replace(/[^\d.]/g, ""));
          return isNaN(i) ? 0 : i;
        }
      }
    ]
  },
  {
    id: "totalHistoricalGiving",
    label: "Total Historical Giving",
    type: "number",
    suggestedMappingKeywords: [
      "total historical giving",
      "total historical giving 1",
      "total amount of contributions",
      "total donated"
    ],
    transformers: [
      {
        transformer: "custom",
        key: "number",
        transformFn: (t) => {
          if (typeof t != "string") return 0;
          const i = parseInt(t.replace(/[^\d.]/g, ""));
          return isNaN(i) ? 0 : i;
        }
      }
    ]
  },
  // Bio fields
  {
    id: "company",
    label: "Company",
    type: "string",
    suggestedMappingKeywords: [
      "company",
      "company 1",
      "employer",
      "organization"
    ],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  {
    id: "title",
    label: "Job Title",
    type: "string",
    suggestedMappingKeywords: [
      "job title",
      "job title 1",
      "job",
      "occupation",
      "occupation 1"
    ],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    type: "string",
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "bio",
    label: "Bio",
    type: "string",
    suggestedMappingKeywords: ["bio", "bio 1", "bio 1 bio"],
    transformers: [
      {
        transformer: "strip"
      }
    ]
  },
  {
    id: "researchLink1",
    label: "Research Link 1",
    type: "string",
    suggestedMappingKeywords: ["research link 1", "home page"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "researchLink2",
    label: "Research Link 2",
    type: "string",
    suggestedMappingKeywords: ["research link 2"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "researchLink3",
    label: "Research Link 3",
    type: "string",
    suggestedMappingKeywords: ["research link 3"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "researchLink4",
    label: "Research Link 4",
    type: "string",
    suggestedMappingKeywords: ["research link 4"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "researchLink5",
    label: "Research Link 5",
    type: "string",
    suggestedMappingKeywords: ["research link 5"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "researchLink6",
    label: "Research Link 6",
    type: "string",
    suggestedMappingKeywords: ["research link 6"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "researchLink7",
    label: "Research Link 7",
    type: "string",
    suggestedMappingKeywords: ["research link 7"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "researchLink8",
    label: "Research Link 8",
    type: "string",
    suggestedMappingKeywords: ["research link 8"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "lower",
        transformFn: (t) => typeof t != "string" ? "" : t.toLowerCase()
      }
    ]
  },
  {
    id: "gender",
    label: "Gender",
    type: "string",
    suggestedMappingKeywords: ["gender"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  },
  {
    id: "education",
    label: "Education",
    type: "string",
    suggestedMappingKeywords: ["education"],
    transformers: [
      {
        transformer: "strip"
      },
      {
        transformer: "custom",
        key: "capitalize",
        transformFn: (t) => typeof t != "string" ? "" : wn(t) ?? ""
      }
    ]
  }
], m2 = [
  {
    id: "contacts",
    label: "Contacts",
    columns: d2
  }
], g2 = pu(function({ children: i, className: a }, r) {
  return Ve(() => {
    const u = new MutationObserver((c) => {
      for (const d of c)
        d.addedNodes.forEach((m) => {
          m.nodeType === Node.ELEMENT_NODE && m.id === f2 && m.classList.add(Df);
        });
    });
    return u.observe(document.body, { childList: !0, subtree: !1 }), () => u.disconnect();
  }, []), /* @__PURE__ */ E.jsx(
    "div",
    {
      ref: r,
      className: `${Df} min-h-0 w-full bg-white p-6 overflow-auto${a ? ` ${a}` : ""}`,
      children: i
    }
  );
});
function p2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z",
    clipRule: "evenodd"
  }));
}
const h2 = /* @__PURE__ */ H.forwardRef(p2);
function v2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",
    clipRule: "evenodd"
  }));
}
const y2 = /* @__PURE__ */ H.forwardRef(v2);
function b2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z",
    clipRule: "evenodd"
  }));
}
const S2 = /* @__PURE__ */ H.forwardRef(b2);
function x2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z",
    clipRule: "evenodd"
  }));
}
const w2 = /* @__PURE__ */ H.forwardRef(x2);
function E2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
  }));
}
const E0 = /* @__PURE__ */ H.forwardRef(E2), C0 = pu(
  ({
    value: t,
    onBlur: i,
    onChange: a,
    placeholder: r,
    iconBuilder: u,
    classes: c,
    clearable: d,
    type: m = "text"
  }, g) => {
    const p = d && t != null && t !== "";
    function v(w) {
      const S = w.target, y = m === "number" ? S == null ? void 0 : S.valueAsNumber : S == null ? void 0 : S.value;
      return (typeof y == "number" && isNaN(y) ? "" : y) ?? "";
    }
    return /* @__PURE__ */ E.jsxs("div", { className: "grid grid-cols-1", children: [
      /* @__PURE__ */ E.jsx(
        "input",
        {
          ref: g,
          type: m,
          inputMode: m === "number" ? "numeric" : "text",
          placeholder: r,
          value: t,
          onChange: (w) => a == null ? void 0 : a(v(w)),
          className: `${c} ${u != null ? "pl-10" : ""} ${d ? "pr-10" : ""} focus:outline-hello-csv-primary col-start-1 row-start-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6`,
          onBlur: (w) => i == null ? void 0 : i(v(w))
        }
      ),
      u == null ? void 0 : u({
        "aria-hidden": "true",
        className: "pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
      }),
      p && /* @__PURE__ */ E.jsx(
        "span",
        {
          onClick: (w) => {
            w.stopPropagation(), a == null || a("");
          },
          className: "col-end-2 row-start-1 flex cursor-pointer items-center justify-self-end pr-2",
          children: /* @__PURE__ */ E.jsx(
            E0,
            {
              className: "h-5 w-5 text-gray-500 hover:text-gray-700",
              "aria-hidden": "true"
            }
          )
        }
      )
    ] });
  }
);
function _r({
  value: t,
  options: i,
  onChange: a,
  multiple: r = !1,
  compareFunction: u = (v, w) => v === w,
  clearable: c = !1,
  searchable: d = !1,
  placeholder: m,
  classes: g,
  displayPlaceholderWhenSelected: p = !1
}) {
  const { t: v } = st(), [w, S] = Ee(""), y = (C) => r && Array.isArray(t) ? t.some((_) => u(_, C)) : u(t, C), b = (C) => {
    if (S(""), r) {
      const _ = Array.isArray(C) ? C : [C];
      a(_);
    } else
      a(C);
  }, R = () => {
    S(""), a(r ? [] : null);
  }, M = i.filter((C) => y(C.value)), N = M.map((C) => C.label).join(", "), j = w && d ? i.filter(
    (C) => String(C.label).toLowerCase().includes(w.toLowerCase())
  ) : i, $ = m ?? v("components.select.optionPlaceholder"), B = () => d ? N : M.length > 0 ? p ? `${$}: ${N}` : N : "", Q = j.some((C) => C.group) ? Object.entries(
    j.reduce(
      (C, _) => {
        const k = _.group || "ungrouped";
        return C[k] = C[k] || [], C[k].push(_), C;
      },
      {}
    )
  ).map(([C, _]) => ({
    label: C,
    items: _
  })) : [{ label: null, items: j }], ee = Q.every(({ items: C }) => C.length === 0), O = c && M.length > 0;
  return /* @__PURE__ */ E.jsx(ME, { value: t, onChange: b, multiple: r, children: /* @__PURE__ */ E.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ E.jsx(Mf, { className: "w-full", children: /* @__PURE__ */ E.jsx(
      o0,
      {
        className: `${g} focus:outline-hello-csv-primary block w-full cursor-pointer truncate rounded-md bg-white py-1.5 focus:cursor-text ${O ? "pr-12" : "pr-2"} pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm`,
        displayValue: B,
        onChange: (C) => d && S(C.target.value),
        placeholder: $,
        readOnly: !d
      }
    ) }),
    O && /* @__PURE__ */ E.jsx(
      "span",
      {
        onClick: (C) => {
          C.stopPropagation(), R();
        },
        className: "absolute inset-y-0 right-6 flex cursor-pointer items-center text-gray-500 hover:text-gray-700",
        children: /* @__PURE__ */ E.jsx(
          E0,
          {
            className: "h-5 w-5 text-gray-500 hover:text-gray-700",
            "aria-hidden": "true"
          }
        )
      }
    ),
    /* @__PURE__ */ E.jsx(Mf, { className: "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2", children: /* @__PURE__ */ E.jsx(
      S2,
      {
        "aria-hidden": "true",
        className: "col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
      }
    ) }),
    /* @__PURE__ */ E.jsxs(
      u0,
      {
        anchor: "bottom",
        transition: !0,
        className: "absolute z-99 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm",
        children: [
          ee && /* @__PURE__ */ E.jsx(
            Of,
            {
              disabled: !0,
              value: null,
              className: "pointer-events-none relative flex items-center justify-center py-2 pr-9 pl-3 text-gray-400 select-none",
              children: /* @__PURE__ */ E.jsx("span", { className: "block truncate font-normal", children: v("components.select.noOptions") })
            },
            "no-options"
          ),
          Q.map(({ label: C, items: _ }) => /* @__PURE__ */ E.jsxs("div", { children: [
            C && /* @__PURE__ */ E.jsx("div", { className: "py-2 pr-9 pl-3 text-gray-400 uppercase", children: C }),
            _.map((k) => /* @__PURE__ */ E.jsxs(
              Of,
              {
                value: k.value,
                className: "group data-focus:bg-hello-csv-primary relative flex cursor-default items-center py-2 pr-9 pl-3 text-gray-900 select-none data-focus:text-white data-focus:outline-hidden",
                children: [
                  k.icon,
                  /* @__PURE__ */ E.jsx("span", { className: "block truncate font-normal group-data-selected:font-semibold", children: k.label }),
                  y(k.value) && /* @__PURE__ */ E.jsx("span", { className: "text-hello-csv-primary absolute inset-y-0 right-0 flex items-center pr-4 group-data-focus:text-white", children: /* @__PURE__ */ E.jsx(h2, { "aria-hidden": "true", className: "h-5 w-5" }) })
                ]
              },
              k.value
            ))
          ] }, C || "all"))
        ]
      }
    )
  ] }) });
}
function C2({ tabs: t, activeTab: i, onTabChange: a }) {
  return /* @__PURE__ */ E.jsxs("div", { children: [
    /* @__PURE__ */ E.jsx("div", { className: "grid grid-cols-1 sm:hidden", children: /* @__PURE__ */ E.jsx(
      _r,
      {
        options: t,
        value: i,
        onChange: (r) => a(r)
      }
    ) }),
    /* @__PURE__ */ E.jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ E.jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ E.jsx("nav", { "aria-label": "Tabs", className: "-mb-px flex space-x-8", children: t.map((r) => /* @__PURE__ */ E.jsxs(
      "button",
      {
        "aria-current": r.value === i ? "page" : void 0,
        onClick: () => a(r.value),
        className: ` ${r.value === i ? "border-hello-csv-primary text-hello-csv-primary" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} flex cursor-pointer items-center border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap`,
        children: [
          r.icon,
          r.label
        ]
      },
      r.label
    )) }) }) })
  ] });
}
const R2 = ba(
  "bg-gray-50 text-gray-900 absolute outline top-full w-full whitespace-normal z-5 mb-2 hidden px-2 py-4 text-xs group-focus-within:block group-hover:block",
  {
    variants: {
      variant: {
        error: "outline-hello-csv-danger",
        info: "outline-gray-500"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
), T2 = ba("group relative h-full w-full", {
  variants: {
    variant: {
      error: "focus-within:outline-hello-csv-danger hover:outline-hello-csv-danger",
      info: "focus-within:outline-gray-500 hover:outline-gray-500"
    },
    withOutline: {
      true: "focus-within:outline hover:outline hover:z-5 focus-within:z-5",
      false: ""
    }
  },
  defaultVariants: {
    variant: "info",
    withOutline: !1
  }
});
function M2({
  variant: t,
  children: i,
  tooltipText: a
}) {
  const r = R2({ variant: t }), u = T2({
    variant: t,
    withOutline: !!a
  });
  return /* @__PURE__ */ E.jsxs("div", { className: u, tabIndex: 0, children: [
    i,
    a && /* @__PURE__ */ E.jsx("span", { className: r, children: a })
  ] });
}
const O2 = ba(
  "relative inline-flex cursor-pointer items-center px-3 py-2 text-sm font-semibold ring-gray-300 ring-1 ring-inset focus:z-10",
  {
    variants: {
      active: {
        true: "",
        false: "bg-white hover:bg-gray-50"
      },
      variant: {
        default: "",
        danger: "text-hello-csv-danger"
      },
      location: {
        left: "rounded-l-md",
        center: "-ml-px",
        right: "rounded-r-md -ml-px "
      }
    },
    compoundVariants: [
      {
        active: !0,
        variant: "default",
        className: "bg-gray-900 text-white"
      },
      {
        active: !0,
        variant: "danger",
        className: "bg-hello-csv-danger text-white"
      },
      {
        active: !1,
        variant: "default",
        className: "text-gray-900"
      },
      {
        active: !1,
        variant: "danger",
        className: "text-hello-csv-danger"
      }
    ]
  }
);
function _2({ activeButton: t, buttons: i }) {
  return /* @__PURE__ */ E.jsx("span", { className: "isolate inline-flex rounded-md shadow-xs", children: i.map((a, r) => /* @__PURE__ */ E.jsx(
    "button",
    {
      type: "button",
      onClick: a.onClick,
      className: O2({
        active: a.value === t,
        variant: a.variant,
        location: r === 0 ? "left" : r === i.length - 1 ? "right" : "center"
      }),
      children: a.label
    },
    a.value
  )) });
}
const A2 = ba(
  "absolute z-50 w-max rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg transition-opacity duration-200",
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0 pointer-events-none"
      },
      hidden: {
        true: "hidden",
        false: ""
      }
    }
  }
);
function ii({
  tooltipText: t,
  children: i,
  className: a,
  hidden: r
}) {
  const [u, c] = Ee(!1), [d, m] = Ee({ top: 0, left: 0 }), g = pe(null), p = pe(null), [v, w] = Ee(null);
  Ve(() => {
    const b = document.createElement("div");
    return b.classList.add(Df), document.body.appendChild(b), w(b), () => {
      document.body.removeChild(b);
    };
  }, []);
  const S = () => {
    if (!g.current) return;
    const b = g.current.getBoundingClientRect();
    m({
      top: b.bottom + window.scrollY + 8,
      left: b.left + b.width / 2 + window.scrollX
    }), c(!0);
  }, y = () => c(!1);
  return /* @__PURE__ */ E.jsxs(
    "div",
    {
      ref: g,
      className: `${a} relative inline-block`,
      onMouseEnter: S,
      onMouseLeave: y,
      children: [
        i,
        v && Uf(
          /* @__PURE__ */ E.jsxs(
            "div",
            {
              ref: p,
              className: A2({ visible: u, hidden: r }),
              style: {
                top: `${d.top}px`,
                left: `${d.left}px`,
                transform: "translateX(-50%)"
              },
              children: [
                t,
                /* @__PURE__ */ E.jsx("div", { className: "absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-gray-900" })
              ]
            }
          ),
          v
        )
      ]
    }
  );
}
const D2 = ba("inline-flex items-center rounded-md px-1.5 py-0.5", {
  variants: {
    variant: {
      primary: "bg-hello-csv-primary-extra-light text-xs font-medium",
      success: "bg-hello-csv-success-extra-light text-hello-csv-success text-xs font-medium",
      error: "bg-hello-csv-danger-extra-light text-hello-csv-danger text-xs font-medium"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});
function ad({ children: t, variant: i }) {
  const a = D2({ variant: i });
  return /* @__PURE__ */ E.jsx("div", { className: a, children: t });
}
function N2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
    clipRule: "evenodd"
  }));
}
const R0 = /* @__PURE__ */ H.forwardRef(N2);
function j2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
    clipRule: "evenodd"
  }));
}
const z2 = /* @__PURE__ */ H.forwardRef(j2);
function $2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
    clipRule: "evenodd"
  }));
}
const Nf = /* @__PURE__ */ H.forwardRef($2);
function L2({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
    clipRule: "evenodd"
  }));
}
const H2 = /* @__PURE__ */ H.forwardRef(L2), F2 = {
  info: {
    icon: /* @__PURE__ */ E.jsx(
      H2,
      {
        className: "text-hello-csv-primary-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-primary-extra-light text-hello-csv-primary rounded-md p-4"
  },
  success: {
    icon: /* @__PURE__ */ E.jsx(
      R0,
      {
        className: "text-hello-csv-success-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-success-extra-light text-hello-csv-success rounded-md p-4"
  },
  error: {
    icon: /* @__PURE__ */ E.jsx(
      Nf,
      {
        className: "text-hello-csv-danger-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-danger-extra-light text-hello-csv-danger rounded-md p-4"
  },
  warning: {
    icon: /* @__PURE__ */ E.jsx(
      Nf,
      {
        className: "text-hello-csv-warning-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-warning-extra-light text-hello-csv-warning rounded-md p-4"
  }
};
function id({
  variant: t = "info",
  header: i,
  description: a
}) {
  const { icon: r, classes: u } = F2[t];
  return /* @__PURE__ */ E.jsx("div", { className: u, children: /* @__PURE__ */ E.jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ E.jsx("div", { className: "mt-1 shrink-0", children: r }),
    /* @__PURE__ */ E.jsxs("div", { className: "ml-3", children: [
      i && /* @__PURE__ */ E.jsx("div", { className: "text-md", children: i }),
      /* @__PURE__ */ E.jsx("div", { className: "text-sm", children: a })
    ] })
  ] }) });
}
function V2({ children: t }) {
  return /* @__PURE__ */ E.jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ E.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ E.jsx(
      NC,
      {
        "aria-hidden": "true",
        className: "text-hello-csv-danger size-5"
      }
    ) }),
    /* @__PURE__ */ E.jsx("div", { className: "ml-3 flex-1 md:flex md:justify-between", children: /* @__PURE__ */ E.jsx("p", { className: "text-hello-csv-danger text-sm", children: t }) })
  ] });
}
function T0(t, i) {
  return t.indexOf(i) !== -1;
}
function M0(t, i) {
  const a = {};
  return t.forEach((r) => {
    i(r, a);
  }), a;
}
function O0(t) {
  const i = { ...t };
  return delete i.rowIndex, Object.values(i).length > 0;
}
class xa {
  constructor(i) {
    It(this, "definition");
    this.definition = i;
  }
  isValid(i, a) {
    throw new Error("Not Implemented");
  }
}
class k2 extends xa {
  constructor(a) {
    super(a);
    It(this, "key");
    It(this, "validateFn");
    this.key = a.key, this.validateFn = a.validateFn;
  }
  isValid(a, r) {
    return this.validateFn(a, r);
  }
}
function U2(t) {
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}
class Au extends xa {
  constructor(a) {
    super(a);
    It(this, "regexp");
    typeof a.regex == "object" ? this.regexp = a.regex : this.regexp = new RegExp(U2(a.regex));
  }
  isValid(a) {
    if (!this.regexp.test(a == null ? void 0 : a.toString()))
      return this.definition.error || "validators.regex";
  }
}
class B2 extends Au {
  constructor() {
    super({
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      validate: "email"
    });
  }
}
class q2 extends xa {
  constructor(a) {
    super(a);
    It(this, "values");
    if (this.values = a.values, !this.values)
      throw new Error("Missing `values` for `includes` validator");
  }
  isValid(a) {
    if (!this.values.includes(a))
      return this.definition.error || "validators.includes";
  }
}
class G2 extends xa {
  isValid(i) {
    if (!(!isNaN(i) && i !== null && i !== void 0))
      return this.definition.error || "validators.integer";
  }
}
class Y2 extends xa {
  constructor(a) {
    super(a);
    It(this, "delimiter");
    It(this, "values");
    if (this.delimiter = a.delimiter || /[,|]/, this.values = a.values, !this.values)
      throw new Error("Missing values for `multi_includes` validator");
  }
  isValid(a) {
    if ((a == null ? void 0 : a.toString().split(this.delimiter)).some((u) => !this.values.includes(u.trim())))
      return this.definition.error || "validators.multiIncludes";
  }
}
class I2 extends Au {
  constructor() {
    super({
      regex: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      validate: "phone_number"
    });
  }
}
class X2 extends Au {
  constructor() {
    super({
      regex: /^\d{5}(-\d{4})?$/,
      validate: "postal_code"
    });
  }
}
class Z2 extends xa {
  isValid(i) {
    if (!i)
      return this.definition.error || "validators.required";
  }
}
class Q2 extends xa {
  constructor(a) {
    super(a);
    It(this, "seen");
    this.seen = {};
  }
  isValid(a) {
    if (a in this.seen)
      return this.definition.error || "validators.unique";
    this.seen[a] = !0;
  }
}
function K2(t) {
  const i = {
    regex_matches: Au,
    required: Z2,
    unique: Q2,
    includes: q2,
    multi_includes: Y2,
    is_integer: G2,
    postal_code: X2,
    phone_number: I2,
    email: B2,
    custom: k2
  };
  if (!(t.validate in i))
    throw new Error(
      `Missing validator for ${t.validate}. Valid validator options are ${Object.keys(i).join(", ")}`
    );
  const a = i[t.validate];
  return new a(t);
}
const P2 = (t) => t == null, W2 = (t) => t.rows.filter((i) => Object.keys(i).length > 0), J2 = (t) => P2(t) || t === "", Hh = (t) => [...new Set(t)];
function gu(t) {
  if (t == null)
    return null;
  const i = ["_", " ", ".", "-", "/"];
  return t.toString().toLowerCase().replace(
    new RegExp(i.map((a) => `\\${a}`).join("|"), "g"),
    ""
  );
}
function _0(t, i) {
  var u, c, d;
  const a = t.typeArguments, r = i.find(
    (m) => m.sheetId === a.sheetId
  );
  return ((d = (c = (u = r == null ? void 0 : r.rows) == null ? void 0 : u.map((m) => m[a.sheetColumnId])) == null ? void 0 : c.filter((m) => !J2(m))) == null ? void 0 : d.filter((m, g, p) => p.indexOf(m) === g)) ?? [];
}
function eR(t, i) {
  const a = t.columns.map((g) => g.id).join(Lh), r = i.map(
    (g) => t.columns.map((p) => g[p.id]).join(Lh)
  ), u = [a, ...r].join(`
`), c = new Blob([u], { type: "text/csv" }), d = URL.createObjectURL(c), m = document.createElement("a");
  m.href = d, m.download = `${t.label}.csv`, m.click(), URL.revokeObjectURL(d);
}
function A0(t, i, a) {
  return t.find((r) => r.sheetId === i).rows.indexOf(a);
}
function tR(t, i, a, r, u, c, d) {
  return Me(() => {
    let g = t.rows;
    switch (a) {
      case "errors":
        g = t.rows.filter(
          (p, v) => r.some((w) => w.rowIndex === v)
        );
        break;
      case "valid":
        g = t.rows.filter(
          (p, v) => !r.some((w) => w.rowIndex === v)
        );
        break;
      case "all":
      default:
        g = t.rows;
    }
    return u != null && (g = g.filter((p) => {
      const v = A0(i, c.id, p);
      return r.find(
        (S) => S.rowIndex === v && S.columnId === u
      ) != null;
    })), d.trim() !== "" && (g = g.filter(
      (p) => Object.values(p).some(
        (v) => {
          var w;
          return (w = gu(v)) == null ? void 0 : w.includes(gu(d));
        }
      )
    )), g;
  }, [
    t,
    a,
    r,
    u,
    c.id,
    i,
    d
  ]);
}
function D0(t) {
  return t.type === "calculated" ? !0 : !!t.isReadOnly;
}
function Fr(t) {
  return t.validators && t.validators.length > 0 ? !!t.validators.find(
    (a) => a.validate === "required"
  ) : !1;
}
function nR(t, i) {
  const a = [];
  if (t.type === "enum" && a.push({
    values: t.typeArguments.values.map((r) => r.value),
    validate: "includes"
  }), t.type === "reference") {
    const r = _0(
      t,
      i
    );
    a.push({
      values: r,
      validate: "includes"
    });
  }
  return a;
}
function lR(t, i, a) {
  const r = [], u = M0(t.columns, (c, d) => {
    d[c.id] = [], [
      ...c.validators ?? [],
      ...nR(c, a)
    ].forEach((g) => {
      d[c.id].push(
        K2(g)
      );
    });
  });
  return t.columns.forEach((c) => {
    i.rows.forEach((d, m) => {
      if (!O0(d) || !(c.id in d) && !Fr(c))
        return;
      const g = d[c.id];
      u[c.id].forEach((v) => {
        const w = v.isValid(g, d);
        w != null && r.push({
          sheetId: t.id,
          columnId: c.id,
          rowIndex: m,
          message: w
        });
      });
    });
  }), r;
}
function af(t, i) {
  const a = [];
  return t.forEach((r) => {
    const u = i.find(
      (c) => c.sheetId === r.id
    );
    if (u) {
      const c = lR(r, u, i);
      a.push(...c);
    }
  }), a;
}
function N0(t, i, a) {
  return i.map((r) => {
    const u = t.find(
      (d) => d.id === r.sheetId
    );
    if (u == null)
      return r;
    const c = r.rows.map((d, m) => {
      const g = { ...d };
      return a(u.columns, g, d, m), g;
    });
    return {
      ...r,
      rows: c
    };
  });
}
function aR(t, i) {
  return N0(
    t,
    i,
    (a, r, u, c) => {
      a.filter((d) => d.type === "reference").forEach((d) => {
        const m = i.find(
          (g) => g.sheetId === d.typeArguments.sheetId
        );
        if (m != null) {
          const p = m.rows.map(
            (v) => v[d.typeArguments.sheetColumnId]
          )[c];
          r[d.id] = p;
        }
      });
    }
  );
}
function iR(t, i) {
  return N0(
    t,
    i,
    (a, r, u) => {
      a.filter((c) => c.type === "calculated").forEach((c) => {
        r[c.id] = c.typeArguments.getValue(u);
      });
    }
  );
}
function rR(t, i) {
  if (i.type === "enum") {
    const a = i.typeArguments.values.find(
      (r) => r.label === t
    );
    if (a != null)
      return a.value;
  }
  return t;
}
function oR(t, i, a) {
  return t.map((r) => {
    const u = [], c = i.filter(
      (d) => d.sheetId === r.id
    );
    return a.map((d) => {
      const m = {};
      r.columns.forEach((g) => {
        const p = c.find(
          (v) => v.sheetColumnId === g.id
        );
        p != null && (m[p.sheetColumnId] = rR(
          d[p.csvColumnName],
          g
        ));
      }), u.push(m);
    }), {
      sheetId: r.id,
      rows: u
    };
  });
}
function uR(t, i, a) {
  const r = a.data, u = oR(t, i, r), c = iR(
    t,
    u
  );
  return aR(t, c);
}
function Du(t) {
  return t.type !== "reference" && t.type !== "calculated";
}
function sR(t) {
  const i = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    i.has(a.csvColumnName) || i.set(a.csvColumnName, a);
  }), Array.from(i.values());
}
function cR(t, i) {
  const a = [];
  return i.forEach((r) => {
    const u = t.columns.find((c) => {
      if (!Du(c))
        return !1;
      const d = [
        c.id,
        ...c.suggestedMappingKeywords || []
      ].map((g) => gu(g)), m = gu(r);
      return d.includes(m);
    });
    u && a.push({
      csvColumnName: r,
      sheetId: t.id,
      sheetColumnId: u.id
    });
  }), a;
}
const fR = (t, i) => {
  const a = [];
  return t.forEach((r) => {
    const u = cR(r, i);
    a.push(...u);
  }), sR(a);
};
function dR(t, i, a) {
  return a == null ? t.filter((u) => u.csvColumnName !== i) : [...t.filter(
    (u) => (u.sheetId !== a.sheetId || u.sheetColumnId !== a.sheetColumnId) && u.csvColumnName !== i
  ), { ...a, csvColumnName: i }];
}
function mR(t, i) {
  const a = gR(t, i), r = pR(a);
  return hR(r);
}
function gR(t, i) {
  return t.map((a) => a[i]).filter((a) => a != null && a.trim() !== "").slice(0, w0);
}
function pR(t) {
  return [
    ...t,
    ...Array(w0 - t.length).fill("")
  ];
}
function hR(t) {
  const i = [...t];
  let a = i.reduce(
    (r, u) => r + u.length,
    0
  );
  for (; a > c2 && i.length > 1; )
    i.pop(), a = i.reduce(
      (r, u) => r + u.length,
      0
    );
  return i;
}
function vR(t, i) {
  const { t: a } = st();
  return t.flatMap(
    (u) => u.columns.filter((c) => Du(c)).map((c) => ({
      label: `${c.label}${Fr(c) ? " *" : ""}`,
      value: {
        sheetId: u.id,
        sheetColumnId: c.id
      },
      group: i.some(
        (d) => d.sheetId === u.id && d.sheetColumnId === c.id
      ) ? a("mapper.used") : a("mapper.unused")
    }))
  ).sort((u, c) => yR(u, c, a("mapper.unused")));
}
function yR(t, i, a) {
  return t.group === a && i.group !== a ? -1 : t.group !== a && i.group === a ? 1 : t.label.localeCompare(i.label);
}
function bR(t, i) {
  for (const a of t)
    for (const r of a.columns)
      if (Fr(r) && Du(r) && i.find(
        (c) => c.sheetId === a.id && c.sheetColumnId === r.id
      ) == null)
        return !1;
  return !0;
}
function SR({
  examples: t,
  csvHeader: i
}) {
  const { t: a, tHtml: r } = st();
  return i && /* @__PURE__ */ E.jsx("div", { className: "m-4 rounded-sm border border-gray-300 bg-white px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ E.jsx("div", { className: "mt-6 flow-root", children: /* @__PURE__ */ E.jsx("div", { className: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8", children: /* @__PURE__ */ E.jsx("div", { className: "inline-block min-w-full py-2 align-middle", children: /* @__PURE__ */ E.jsxs("table", { className: "min-w-full divide-y divide-gray-300", children: [
    /* @__PURE__ */ E.jsx("thead", { children: /* @__PURE__ */ E.jsx("tr", { children: /* @__PURE__ */ E.jsx(
      "th",
      {
        scope: "col",
        className: "py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8",
        children: r("mapper.dataPreview", {
          csvHeader: /* @__PURE__ */ E.jsx(ad, { children: i })
        })
      }
    ) }) }),
    /* @__PURE__ */ E.jsx("tbody", { className: "divide-y divide-gray-300", children: t == null ? void 0 : t.map((u, c) => /* @__PURE__ */ E.jsx("tr", { children: /* @__PURE__ */ E.jsx("td", { className: "h-12 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8", children: u || c === 0 && /* @__PURE__ */ E.jsx("span", { className: "text-gray-500 italic", children: a("mapper.noData") }) }) }, c)) })
  ] }) }) }) }) });
}
function xR({
  csvHeader: t,
  setMapping: i,
  currentMapping: a,
  mappingSelectionOptions: r,
  onMouseEnter: u
}) {
  var d;
  const c = a == null ? null : ((d = r.find(
    (m) => m.value.sheetId === a.sheetId && m.value.sheetColumnId === a.sheetColumnId
  )) == null ? void 0 : d.value) ?? null;
  return /* @__PURE__ */ E.jsx(
    "div",
    {
      className: "hover:bg-hello-csv-muted rounded-sm",
      onMouseEnter: u,
      children: /* @__PURE__ */ E.jsxs("div", { className: "flex items-center py-2.5", children: [
        /* @__PURE__ */ E.jsxs("div", { className: "mx-2.5 flex flex-1 justify-between", children: [
          /* @__PURE__ */ E.jsx("div", { children: /* @__PURE__ */ E.jsx(ad, { children: t.slice(0, 30) }) }),
          /* @__PURE__ */ E.jsx("div", { className: "mx-5", children: /* @__PURE__ */ E.jsx(dC, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ E.jsx("div", { className: "mx-2.5 flex-1", children: /* @__PURE__ */ E.jsx(
          _r,
          {
            searchable: !0,
            clearable: !0,
            compareFunction: (m, g) => m == null || g == null ? !1 : m.sheetColumnId === g.sheetColumnId && m.sheetId === g.sheetId,
            value: c,
            options: r,
            onChange: (m) => i(m)
          }
        ) })
      ] })
    }
  );
}
function wR({
  parsed: t,
  sheetDefinitions: i,
  currentMapping: a,
  onMappingsChanged: r,
  onMappingsSet: u,
  onBack: c
}) {
  const { t: d } = st(), [m, g] = Ee(null), p = t.data, v = t.meta.fields, w = vR(
    i,
    a
  ), S = bR(
    i,
    a
  ), y = Me(() => m ? mR(p, m) : [], [m, p]);
  return /* @__PURE__ */ E.jsxs("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ E.jsx("div", { className: "flex-none text-2xl", children: d("mapper.reviewAndConfirm") }),
    /* @__PURE__ */ E.jsx("div", { className: "min-h-0 flex-auto", children: /* @__PURE__ */ E.jsxs("div", { className: "flex h-full justify-between space-x-5", children: [
      /* @__PURE__ */ E.jsxs("div", { className: "flex flex-2 flex-col", children: [
        /* @__PURE__ */ E.jsxs("div", { className: "my-5 flex text-sm font-light uppercase", children: [
          /* @__PURE__ */ E.jsx("div", { className: "flex-1", children: d("mapper.importedColumn") }),
          /* @__PURE__ */ E.jsx("div", { className: "flex-1", children: d("mapper.destinationColumn") })
        ] }),
        /* @__PURE__ */ E.jsx(
          "div",
          {
            className: `flex-1 ${v.length > 8 ? "max-h-none overflow-y-visible" : "max-h-[400px] overflow-y-auto"}`,
            children: v.map((b, R) => {
              const M = a.find(
                (N) => N.csvColumnName === b
              ) ?? null;
              return /* @__PURE__ */ E.jsx(
                xR,
                {
                  csvHeader: b,
                  currentMapping: M,
                  setMapping: (N) => {
                    const j = dR(
                      a,
                      b,
                      N
                    );
                    r(j);
                  },
                  mappingSelectionOptions: w,
                  onMouseEnter: () => {
                    g(b);
                  }
                },
                R
              );
            })
          }
        )
      ] }),
      /* @__PURE__ */ E.jsx("div", { className: "bg-hello-csv-muted hidden flex-1 overflow-y-auto sm:block", children: /* @__PURE__ */ E.jsx(
        SR,
        {
          examples: y,
          csvHeader: m ?? ""
        }
      ) })
    ] }) }),
    !S && /* @__PURE__ */ E.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ E.jsx(V2, { children: d("mapper.mappingsNotValid") }) }),
    /* @__PURE__ */ E.jsx("div", { className: "mt-auto flex-none", children: /* @__PURE__ */ E.jsxs("div", { className: "mt-5 flex justify-between", children: [
      /* @__PURE__ */ E.jsx(pn, { variant: "secondary", outline: !0, onClick: c, children: d("mapper.back") }),
      /* @__PURE__ */ E.jsx(pn, { onClick: u, disabled: !S, children: d("mapper.confirm") })
    ] }) })
  ] });
}
var ER = { NODE_ENV: "production" };
function jl(t, i) {
  return typeof t == "function" ? t(i) : t;
}
function Kt(t, i) {
  return (a) => {
    i.setState((r) => ({
      ...r,
      [t]: jl(a, r[t])
    }));
  };
}
function Nu(t) {
  return t instanceof Function;
}
function CR(t) {
  return Array.isArray(t) && t.every((i) => typeof i == "number");
}
function RR(t, i) {
  const a = [], r = (u) => {
    u.forEach((c) => {
      a.push(c);
      const d = i(c);
      d != null && d.length && r(d);
    });
  };
  return r(t), a;
}
function be(t, i, a) {
  let r = [], u;
  return (c) => {
    let d;
    a.key && a.debug && (d = Date.now());
    const m = t(c);
    if (!(m.length !== r.length || m.some((v, w) => r[w] !== v)))
      return u;
    r = m;
    let p;
    if (a.key && a.debug && (p = Date.now()), u = i(...m), a == null || a.onChange == null || a.onChange(u), a.key && a.debug && a != null && a.debug()) {
      const v = Math.round((Date.now() - d) * 100) / 100, w = Math.round((Date.now() - p) * 100) / 100, S = w / 16, y = (b, R) => {
        for (b = String(b); b.length < R; )
          b = " " + b;
        return b;
      };
      console.info(`%c⏱ ${y(w, 5)} /${y(v, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * S, 120))}deg 100% 31%);`, a == null ? void 0 : a.key);
    }
    return u;
  };
}
function Se(t, i, a, r) {
  return {
    debug: () => {
      var u;
      return (u = t == null ? void 0 : t.debugAll) != null ? u : t[i];
    },
    key: ER.NODE_ENV === "development",
    onChange: r
  };
}
function TR(t, i, a, r) {
  const u = () => {
    var d;
    return (d = c.getValue()) != null ? d : t.options.renderFallbackValue;
  }, c = {
    id: `${i.id}_${a.id}`,
    row: i,
    column: a,
    getValue: () => i.getValue(r),
    renderValue: u,
    getContext: be(() => [t, a, i, c], (d, m, g, p) => ({
      table: d,
      column: m,
      row: g,
      cell: p,
      getValue: p.getValue,
      renderValue: p.renderValue
    }), Se(t.options, "debugCells"))
  };
  return t._features.forEach((d) => {
    d.createCell == null || d.createCell(c, a, i, t);
  }, {}), c;
}
function MR(t, i, a, r) {
  var u, c;
  const m = {
    ...t._getDefaultColumnDef(),
    ...i
  }, g = m.accessorKey;
  let p = (u = (c = m.id) != null ? c : g ? typeof String.prototype.replaceAll == "function" ? g.replaceAll(".", "_") : g.replace(/\./g, "_") : void 0) != null ? u : typeof m.header == "string" ? m.header : void 0, v;
  if (m.accessorFn ? v = m.accessorFn : g && (g.includes(".") ? v = (S) => {
    let y = S;
    for (const R of g.split(".")) {
      var b;
      y = (b = y) == null ? void 0 : b[R];
    }
    return y;
  } : v = (S) => S[m.accessorKey]), !p)
    throw new Error();
  let w = {
    id: `${String(p)}`,
    accessorFn: v,
    parent: r,
    depth: a,
    columnDef: m,
    columns: [],
    getFlatColumns: be(() => [!0], () => {
      var S;
      return [w, ...(S = w.columns) == null ? void 0 : S.flatMap((y) => y.getFlatColumns())];
    }, Se(t.options, "debugColumns")),
    getLeafColumns: be(() => [t._getOrderColumnsFn()], (S) => {
      var y;
      if ((y = w.columns) != null && y.length) {
        let b = w.columns.flatMap((R) => R.getLeafColumns());
        return S(b);
      }
      return [w];
    }, Se(t.options, "debugColumns"))
  };
  for (const S of t._features)
    S.createColumn == null || S.createColumn(w, t);
  return w;
}
const Tt = "debugHeaders";
function Fh(t, i, a) {
  var r;
  let c = {
    id: (r = a.id) != null ? r : i.id,
    column: i,
    index: a.index,
    isPlaceholder: !!a.isPlaceholder,
    placeholderId: a.placeholderId,
    depth: a.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const d = [], m = (g) => {
        g.subHeaders && g.subHeaders.length && g.subHeaders.map(m), d.push(g);
      };
      return m(c), d;
    },
    getContext: () => ({
      table: t,
      header: c,
      column: i
    })
  };
  return t._features.forEach((d) => {
    d.createHeader == null || d.createHeader(c, t);
  }), c;
}
const OR = {
  createTable: (t) => {
    t.getHeaderGroups = be(() => [t.getAllColumns(), t.getVisibleLeafColumns(), t.getState().columnPinning.left, t.getState().columnPinning.right], (i, a, r, u) => {
      var c, d;
      const m = (c = r == null ? void 0 : r.map((w) => a.find((S) => S.id === w)).filter(Boolean)) != null ? c : [], g = (d = u == null ? void 0 : u.map((w) => a.find((S) => S.id === w)).filter(Boolean)) != null ? d : [], p = a.filter((w) => !(r != null && r.includes(w.id)) && !(u != null && u.includes(w.id)));
      return tu(i, [...m, ...p, ...g], t);
    }, Se(t.options, Tt)), t.getCenterHeaderGroups = be(() => [t.getAllColumns(), t.getVisibleLeafColumns(), t.getState().columnPinning.left, t.getState().columnPinning.right], (i, a, r, u) => (a = a.filter((c) => !(r != null && r.includes(c.id)) && !(u != null && u.includes(c.id))), tu(i, a, t, "center")), Se(t.options, Tt)), t.getLeftHeaderGroups = be(() => [t.getAllColumns(), t.getVisibleLeafColumns(), t.getState().columnPinning.left], (i, a, r) => {
      var u;
      const c = (u = r == null ? void 0 : r.map((d) => a.find((m) => m.id === d)).filter(Boolean)) != null ? u : [];
      return tu(i, c, t, "left");
    }, Se(t.options, Tt)), t.getRightHeaderGroups = be(() => [t.getAllColumns(), t.getVisibleLeafColumns(), t.getState().columnPinning.right], (i, a, r) => {
      var u;
      const c = (u = r == null ? void 0 : r.map((d) => a.find((m) => m.id === d)).filter(Boolean)) != null ? u : [];
      return tu(i, c, t, "right");
    }, Se(t.options, Tt)), t.getFooterGroups = be(() => [t.getHeaderGroups()], (i) => [...i].reverse(), Se(t.options, Tt)), t.getLeftFooterGroups = be(() => [t.getLeftHeaderGroups()], (i) => [...i].reverse(), Se(t.options, Tt)), t.getCenterFooterGroups = be(() => [t.getCenterHeaderGroups()], (i) => [...i].reverse(), Se(t.options, Tt)), t.getRightFooterGroups = be(() => [t.getRightHeaderGroups()], (i) => [...i].reverse(), Se(t.options, Tt)), t.getFlatHeaders = be(() => [t.getHeaderGroups()], (i) => i.map((a) => a.headers).flat(), Se(t.options, Tt)), t.getLeftFlatHeaders = be(() => [t.getLeftHeaderGroups()], (i) => i.map((a) => a.headers).flat(), Se(t.options, Tt)), t.getCenterFlatHeaders = be(() => [t.getCenterHeaderGroups()], (i) => i.map((a) => a.headers).flat(), Se(t.options, Tt)), t.getRightFlatHeaders = be(() => [t.getRightHeaderGroups()], (i) => i.map((a) => a.headers).flat(), Se(t.options, Tt)), t.getCenterLeafHeaders = be(() => [t.getCenterFlatHeaders()], (i) => i.filter((a) => {
      var r;
      return !((r = a.subHeaders) != null && r.length);
    }), Se(t.options, Tt)), t.getLeftLeafHeaders = be(() => [t.getLeftFlatHeaders()], (i) => i.filter((a) => {
      var r;
      return !((r = a.subHeaders) != null && r.length);
    }), Se(t.options, Tt)), t.getRightLeafHeaders = be(() => [t.getRightFlatHeaders()], (i) => i.filter((a) => {
      var r;
      return !((r = a.subHeaders) != null && r.length);
    }), Se(t.options, Tt)), t.getLeafHeaders = be(() => [t.getLeftHeaderGroups(), t.getCenterHeaderGroups(), t.getRightHeaderGroups()], (i, a, r) => {
      var u, c, d, m, g, p;
      return [...(u = (c = i[0]) == null ? void 0 : c.headers) != null ? u : [], ...(d = (m = a[0]) == null ? void 0 : m.headers) != null ? d : [], ...(g = (p = r[0]) == null ? void 0 : p.headers) != null ? g : []].map((v) => v.getLeafHeaders()).flat();
    }, Se(t.options, Tt));
  }
};
function tu(t, i, a, r) {
  var u, c;
  let d = 0;
  const m = function(S, y) {
    y === void 0 && (y = 1), d = Math.max(d, y), S.filter((b) => b.getIsVisible()).forEach((b) => {
      var R;
      (R = b.columns) != null && R.length && m(b.columns, y + 1);
    }, 0);
  };
  m(t);
  let g = [];
  const p = (S, y) => {
    const b = {
      depth: y,
      id: [r, `${y}`].filter(Boolean).join("_"),
      headers: []
    }, R = [];
    S.forEach((M) => {
      const N = [...R].reverse()[0], j = M.column.depth === b.depth;
      let $, B = !1;
      if (j && M.column.parent ? $ = M.column.parent : ($ = M.column, B = !0), N && (N == null ? void 0 : N.column) === $)
        N.subHeaders.push(M);
      else {
        const Y = Fh(a, $, {
          id: [r, y, $.id, M == null ? void 0 : M.id].filter(Boolean).join("_"),
          isPlaceholder: B,
          placeholderId: B ? `${R.filter((Q) => Q.column === $).length}` : void 0,
          depth: y,
          index: R.length
        });
        Y.subHeaders.push(M), R.push(Y);
      }
      b.headers.push(M), M.headerGroup = b;
    }), g.push(b), y > 0 && p(R, y - 1);
  }, v = i.map((S, y) => Fh(a, S, {
    depth: d,
    index: y
  }));
  p(v, d - 1), g.reverse();
  const w = (S) => S.filter((b) => b.column.getIsVisible()).map((b) => {
    let R = 0, M = 0, N = [0];
    b.subHeaders && b.subHeaders.length ? (N = [], w(b.subHeaders).forEach(($) => {
      let {
        colSpan: B,
        rowSpan: Y
      } = $;
      R += B, N.push(Y);
    })) : R = 1;
    const j = Math.min(...N);
    return M = M + j, b.colSpan = R, b.rowSpan = M, {
      colSpan: R,
      rowSpan: M
    };
  });
  return w((u = (c = g[0]) == null ? void 0 : c.headers) != null ? u : []), g;
}
const _R = (t, i, a, r, u, c, d) => {
  let m = {
    id: i,
    index: r,
    original: a,
    depth: u,
    parentId: d,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (g) => {
      if (m._valuesCache.hasOwnProperty(g))
        return m._valuesCache[g];
      const p = t.getColumn(g);
      if (p != null && p.accessorFn)
        return m._valuesCache[g] = p.accessorFn(m.original, r), m._valuesCache[g];
    },
    getUniqueValues: (g) => {
      if (m._uniqueValuesCache.hasOwnProperty(g))
        return m._uniqueValuesCache[g];
      const p = t.getColumn(g);
      if (p != null && p.accessorFn)
        return p.columnDef.getUniqueValues ? (m._uniqueValuesCache[g] = p.columnDef.getUniqueValues(m.original, r), m._uniqueValuesCache[g]) : (m._uniqueValuesCache[g] = [m.getValue(g)], m._uniqueValuesCache[g]);
    },
    renderValue: (g) => {
      var p;
      return (p = m.getValue(g)) != null ? p : t.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => RR(m.subRows, (g) => g.subRows),
    getParentRow: () => m.parentId ? t.getRow(m.parentId, !0) : void 0,
    getParentRows: () => {
      let g = [], p = m;
      for (; ; ) {
        const v = p.getParentRow();
        if (!v) break;
        g.push(v), p = v;
      }
      return g.reverse();
    },
    getAllCells: be(() => [t.getAllLeafColumns()], (g) => g.map((p) => TR(t, m, p, p.id)), Se(t.options, "debugRows")),
    _getAllCellsByColumnId: be(() => [m.getAllCells()], (g) => g.reduce((p, v) => (p[v.column.id] = v, p), {}), Se(t.options, "debugRows"))
  };
  for (let g = 0; g < t._features.length; g++) {
    const p = t._features[g];
    p == null || p.createRow == null || p.createRow(m, t);
  }
  return m;
}, AR = {
  createColumn: (t, i) => {
    t._getFacetedRowModel = i.options.getFacetedRowModel && i.options.getFacetedRowModel(i, t.id), t.getFacetedRowModel = () => t._getFacetedRowModel ? t._getFacetedRowModel() : i.getPreFilteredRowModel(), t._getFacetedUniqueValues = i.options.getFacetedUniqueValues && i.options.getFacetedUniqueValues(i, t.id), t.getFacetedUniqueValues = () => t._getFacetedUniqueValues ? t._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), t._getFacetedMinMaxValues = i.options.getFacetedMinMaxValues && i.options.getFacetedMinMaxValues(i, t.id), t.getFacetedMinMaxValues = () => {
      if (t._getFacetedMinMaxValues)
        return t._getFacetedMinMaxValues();
    };
  }
}, j0 = (t, i, a) => {
  var r, u;
  const c = a == null || (r = a.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((u = t.getValue(i)) == null || (u = u.toString()) == null || (u = u.toLowerCase()) == null) && u.includes(c));
};
j0.autoRemove = (t) => En(t);
const z0 = (t, i, a) => {
  var r;
  return !!(!((r = t.getValue(i)) == null || (r = r.toString()) == null) && r.includes(a));
};
z0.autoRemove = (t) => En(t);
const $0 = (t, i, a) => {
  var r;
  return ((r = t.getValue(i)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (a == null ? void 0 : a.toLowerCase());
};
$0.autoRemove = (t) => En(t);
const L0 = (t, i, a) => {
  var r;
  return (r = t.getValue(i)) == null ? void 0 : r.includes(a);
};
L0.autoRemove = (t) => En(t);
const H0 = (t, i, a) => !a.some((r) => {
  var u;
  return !((u = t.getValue(i)) != null && u.includes(r));
});
H0.autoRemove = (t) => En(t) || !(t != null && t.length);
const F0 = (t, i, a) => a.some((r) => {
  var u;
  return (u = t.getValue(i)) == null ? void 0 : u.includes(r);
});
F0.autoRemove = (t) => En(t) || !(t != null && t.length);
const V0 = (t, i, a) => t.getValue(i) === a;
V0.autoRemove = (t) => En(t);
const k0 = (t, i, a) => t.getValue(i) == a;
k0.autoRemove = (t) => En(t);
const rd = (t, i, a) => {
  let [r, u] = a;
  const c = t.getValue(i);
  return c >= r && c <= u;
};
rd.resolveFilterValue = (t) => {
  let [i, a] = t, r = typeof i != "number" ? parseFloat(i) : i, u = typeof a != "number" ? parseFloat(a) : a, c = i === null || Number.isNaN(r) ? -1 / 0 : r, d = a === null || Number.isNaN(u) ? 1 / 0 : u;
  if (c > d) {
    const m = c;
    c = d, d = m;
  }
  return [c, d];
};
rd.autoRemove = (t) => En(t) || En(t[0]) && En(t[1]);
const Jn = {
  includesString: j0,
  includesStringSensitive: z0,
  equalsString: $0,
  arrIncludes: L0,
  arrIncludesAll: H0,
  arrIncludesSome: F0,
  equals: V0,
  weakEquals: k0,
  inNumberRange: rd
};
function En(t) {
  return t == null || t === "";
}
const DR = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (t) => ({
    columnFilters: [],
    ...t
  }),
  getDefaultOptions: (t) => ({
    onColumnFiltersChange: Kt("columnFilters", t),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (t, i) => {
    t.getAutoFilterFn = () => {
      const a = i.getCoreRowModel().flatRows[0], r = a == null ? void 0 : a.getValue(t.id);
      return typeof r == "string" ? Jn.includesString : typeof r == "number" ? Jn.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? Jn.equals : Array.isArray(r) ? Jn.arrIncludes : Jn.weakEquals;
    }, t.getFilterFn = () => {
      var a, r;
      return Nu(t.columnDef.filterFn) ? t.columnDef.filterFn : t.columnDef.filterFn === "auto" ? t.getAutoFilterFn() : (
        // @ts-ignore
        (a = (r = i.options.filterFns) == null ? void 0 : r[t.columnDef.filterFn]) != null ? a : Jn[t.columnDef.filterFn]
      );
    }, t.getCanFilter = () => {
      var a, r, u;
      return ((a = t.columnDef.enableColumnFilter) != null ? a : !0) && ((r = i.options.enableColumnFilters) != null ? r : !0) && ((u = i.options.enableFilters) != null ? u : !0) && !!t.accessorFn;
    }, t.getIsFiltered = () => t.getFilterIndex() > -1, t.getFilterValue = () => {
      var a;
      return (a = i.getState().columnFilters) == null || (a = a.find((r) => r.id === t.id)) == null ? void 0 : a.value;
    }, t.getFilterIndex = () => {
      var a, r;
      return (a = (r = i.getState().columnFilters) == null ? void 0 : r.findIndex((u) => u.id === t.id)) != null ? a : -1;
    }, t.setFilterValue = (a) => {
      i.setColumnFilters((r) => {
        const u = t.getFilterFn(), c = r == null ? void 0 : r.find((v) => v.id === t.id), d = jl(a, c ? c.value : void 0);
        if (Vh(u, d, t)) {
          var m;
          return (m = r == null ? void 0 : r.filter((v) => v.id !== t.id)) != null ? m : [];
        }
        const g = {
          id: t.id,
          value: d
        };
        if (c) {
          var p;
          return (p = r == null ? void 0 : r.map((v) => v.id === t.id ? g : v)) != null ? p : [];
        }
        return r != null && r.length ? [...r, g] : [g];
      });
    };
  },
  createRow: (t, i) => {
    t.columnFilters = {}, t.columnFiltersMeta = {};
  },
  createTable: (t) => {
    t.setColumnFilters = (i) => {
      const a = t.getAllLeafColumns(), r = (u) => {
        var c;
        return (c = jl(i, u)) == null ? void 0 : c.filter((d) => {
          const m = a.find((g) => g.id === d.id);
          if (m) {
            const g = m.getFilterFn();
            if (Vh(g, d.value, m))
              return !1;
          }
          return !0;
        });
      };
      t.options.onColumnFiltersChange == null || t.options.onColumnFiltersChange(r);
    }, t.resetColumnFilters = (i) => {
      var a, r;
      t.setColumnFilters(i ? [] : (a = (r = t.initialState) == null ? void 0 : r.columnFilters) != null ? a : []);
    }, t.getPreFilteredRowModel = () => t.getCoreRowModel(), t.getFilteredRowModel = () => (!t._getFilteredRowModel && t.options.getFilteredRowModel && (t._getFilteredRowModel = t.options.getFilteredRowModel(t)), t.options.manualFiltering || !t._getFilteredRowModel ? t.getPreFilteredRowModel() : t._getFilteredRowModel());
  }
};
function Vh(t, i, a) {
  return (t && t.autoRemove ? t.autoRemove(i, a) : !1) || typeof i > "u" || typeof i == "string" && !i;
}
const NR = (t, i, a) => a.reduce((r, u) => {
  const c = u.getValue(t);
  return r + (typeof c == "number" ? c : 0);
}, 0), jR = (t, i, a) => {
  let r;
  return a.forEach((u) => {
    const c = u.getValue(t);
    c != null && (r > c || r === void 0 && c >= c) && (r = c);
  }), r;
}, zR = (t, i, a) => {
  let r;
  return a.forEach((u) => {
    const c = u.getValue(t);
    c != null && (r < c || r === void 0 && c >= c) && (r = c);
  }), r;
}, $R = (t, i, a) => {
  let r, u;
  return a.forEach((c) => {
    const d = c.getValue(t);
    d != null && (r === void 0 ? d >= d && (r = u = d) : (r > d && (r = d), u < d && (u = d)));
  }), [r, u];
}, LR = (t, i) => {
  let a = 0, r = 0;
  if (i.forEach((u) => {
    let c = u.getValue(t);
    c != null && (c = +c) >= c && (++a, r += c);
  }), a) return r / a;
}, HR = (t, i) => {
  if (!i.length)
    return;
  const a = i.map((c) => c.getValue(t));
  if (!CR(a))
    return;
  if (a.length === 1)
    return a[0];
  const r = Math.floor(a.length / 2), u = a.sort((c, d) => c - d);
  return a.length % 2 !== 0 ? u[r] : (u[r - 1] + u[r]) / 2;
}, FR = (t, i) => Array.from(new Set(i.map((a) => a.getValue(t))).values()), VR = (t, i) => new Set(i.map((a) => a.getValue(t))).size, kR = (t, i) => i.length, rf = {
  sum: NR,
  min: jR,
  max: zR,
  extent: $R,
  mean: LR,
  median: HR,
  unique: FR,
  uniqueCount: VR,
  count: kR
}, UR = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (t) => {
      var i, a;
      return (i = (a = t.getValue()) == null || a.toString == null ? void 0 : a.toString()) != null ? i : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (t) => ({
    grouping: [],
    ...t
  }),
  getDefaultOptions: (t) => ({
    onGroupingChange: Kt("grouping", t),
    groupedColumnMode: "reorder"
  }),
  createColumn: (t, i) => {
    t.toggleGrouping = () => {
      i.setGrouping((a) => a != null && a.includes(t.id) ? a.filter((r) => r !== t.id) : [...a ?? [], t.id]);
    }, t.getCanGroup = () => {
      var a, r;
      return ((a = t.columnDef.enableGrouping) != null ? a : !0) && ((r = i.options.enableGrouping) != null ? r : !0) && (!!t.accessorFn || !!t.columnDef.getGroupingValue);
    }, t.getIsGrouped = () => {
      var a;
      return (a = i.getState().grouping) == null ? void 0 : a.includes(t.id);
    }, t.getGroupedIndex = () => {
      var a;
      return (a = i.getState().grouping) == null ? void 0 : a.indexOf(t.id);
    }, t.getToggleGroupingHandler = () => {
      const a = t.getCanGroup();
      return () => {
        a && t.toggleGrouping();
      };
    }, t.getAutoAggregationFn = () => {
      const a = i.getCoreRowModel().flatRows[0], r = a == null ? void 0 : a.getValue(t.id);
      if (typeof r == "number")
        return rf.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return rf.extent;
    }, t.getAggregationFn = () => {
      var a, r;
      if (!t)
        throw new Error();
      return Nu(t.columnDef.aggregationFn) ? t.columnDef.aggregationFn : t.columnDef.aggregationFn === "auto" ? t.getAutoAggregationFn() : (a = (r = i.options.aggregationFns) == null ? void 0 : r[t.columnDef.aggregationFn]) != null ? a : rf[t.columnDef.aggregationFn];
    };
  },
  createTable: (t) => {
    t.setGrouping = (i) => t.options.onGroupingChange == null ? void 0 : t.options.onGroupingChange(i), t.resetGrouping = (i) => {
      var a, r;
      t.setGrouping(i ? [] : (a = (r = t.initialState) == null ? void 0 : r.grouping) != null ? a : []);
    }, t.getPreGroupedRowModel = () => t.getFilteredRowModel(), t.getGroupedRowModel = () => (!t._getGroupedRowModel && t.options.getGroupedRowModel && (t._getGroupedRowModel = t.options.getGroupedRowModel(t)), t.options.manualGrouping || !t._getGroupedRowModel ? t.getPreGroupedRowModel() : t._getGroupedRowModel());
  },
  createRow: (t, i) => {
    t.getIsGrouped = () => !!t.groupingColumnId, t.getGroupingValue = (a) => {
      if (t._groupingValuesCache.hasOwnProperty(a))
        return t._groupingValuesCache[a];
      const r = i.getColumn(a);
      return r != null && r.columnDef.getGroupingValue ? (t._groupingValuesCache[a] = r.columnDef.getGroupingValue(t.original), t._groupingValuesCache[a]) : t.getValue(a);
    }, t._groupingValuesCache = {};
  },
  createCell: (t, i, a, r) => {
    t.getIsGrouped = () => i.getIsGrouped() && i.id === a.groupingColumnId, t.getIsPlaceholder = () => !t.getIsGrouped() && i.getIsGrouped(), t.getIsAggregated = () => {
      var u;
      return !t.getIsGrouped() && !t.getIsPlaceholder() && !!((u = a.subRows) != null && u.length);
    };
  }
};
function BR(t, i, a) {
  if (!(i != null && i.length) || !a)
    return t;
  const r = t.filter((c) => !i.includes(c.id));
  return a === "remove" ? r : [...i.map((c) => t.find((d) => d.id === c)).filter(Boolean), ...r];
}
const qR = {
  getInitialState: (t) => ({
    columnOrder: [],
    ...t
  }),
  getDefaultOptions: (t) => ({
    onColumnOrderChange: Kt("columnOrder", t)
  }),
  createColumn: (t, i) => {
    t.getIndex = be((a) => [Er(i, a)], (a) => a.findIndex((r) => r.id === t.id), Se(i.options, "debugColumns")), t.getIsFirstColumn = (a) => {
      var r;
      return ((r = Er(i, a)[0]) == null ? void 0 : r.id) === t.id;
    }, t.getIsLastColumn = (a) => {
      var r;
      const u = Er(i, a);
      return ((r = u[u.length - 1]) == null ? void 0 : r.id) === t.id;
    };
  },
  createTable: (t) => {
    t.setColumnOrder = (i) => t.options.onColumnOrderChange == null ? void 0 : t.options.onColumnOrderChange(i), t.resetColumnOrder = (i) => {
      var a;
      t.setColumnOrder(i ? [] : (a = t.initialState.columnOrder) != null ? a : []);
    }, t._getOrderColumnsFn = be(() => [t.getState().columnOrder, t.getState().grouping, t.options.groupedColumnMode], (i, a, r) => (u) => {
      let c = [];
      if (!(i != null && i.length))
        c = u;
      else {
        const d = [...i], m = [...u];
        for (; m.length && d.length; ) {
          const g = d.shift(), p = m.findIndex((v) => v.id === g);
          p > -1 && c.push(m.splice(p, 1)[0]);
        }
        c = [...c, ...m];
      }
      return BR(c, a, r);
    }, Se(t.options, "debugTable"));
  }
}, of = () => ({
  left: [],
  right: []
}), GR = {
  getInitialState: (t) => ({
    columnPinning: of(),
    ...t
  }),
  getDefaultOptions: (t) => ({
    onColumnPinningChange: Kt("columnPinning", t)
  }),
  createColumn: (t, i) => {
    t.pin = (a) => {
      const r = t.getLeafColumns().map((u) => u.id).filter(Boolean);
      i.setColumnPinning((u) => {
        var c, d;
        if (a === "right") {
          var m, g;
          return {
            left: ((m = u == null ? void 0 : u.left) != null ? m : []).filter((w) => !(r != null && r.includes(w))),
            right: [...((g = u == null ? void 0 : u.right) != null ? g : []).filter((w) => !(r != null && r.includes(w))), ...r]
          };
        }
        if (a === "left") {
          var p, v;
          return {
            left: [...((p = u == null ? void 0 : u.left) != null ? p : []).filter((w) => !(r != null && r.includes(w))), ...r],
            right: ((v = u == null ? void 0 : u.right) != null ? v : []).filter((w) => !(r != null && r.includes(w)))
          };
        }
        return {
          left: ((c = u == null ? void 0 : u.left) != null ? c : []).filter((w) => !(r != null && r.includes(w))),
          right: ((d = u == null ? void 0 : u.right) != null ? d : []).filter((w) => !(r != null && r.includes(w)))
        };
      });
    }, t.getCanPin = () => t.getLeafColumns().some((r) => {
      var u, c, d;
      return ((u = r.columnDef.enablePinning) != null ? u : !0) && ((c = (d = i.options.enableColumnPinning) != null ? d : i.options.enablePinning) != null ? c : !0);
    }), t.getIsPinned = () => {
      const a = t.getLeafColumns().map((m) => m.id), {
        left: r,
        right: u
      } = i.getState().columnPinning, c = a.some((m) => r == null ? void 0 : r.includes(m)), d = a.some((m) => u == null ? void 0 : u.includes(m));
      return c ? "left" : d ? "right" : !1;
    }, t.getPinnedIndex = () => {
      var a, r;
      const u = t.getIsPinned();
      return u ? (a = (r = i.getState().columnPinning) == null || (r = r[u]) == null ? void 0 : r.indexOf(t.id)) != null ? a : -1 : 0;
    };
  },
  createRow: (t, i) => {
    t.getCenterVisibleCells = be(() => [t._getAllVisibleCells(), i.getState().columnPinning.left, i.getState().columnPinning.right], (a, r, u) => {
      const c = [...r ?? [], ...u ?? []];
      return a.filter((d) => !c.includes(d.column.id));
    }, Se(i.options, "debugRows")), t.getLeftVisibleCells = be(() => [t._getAllVisibleCells(), i.getState().columnPinning.left], (a, r) => (r ?? []).map((c) => a.find((d) => d.column.id === c)).filter(Boolean).map((c) => ({
      ...c,
      position: "left"
    })), Se(i.options, "debugRows")), t.getRightVisibleCells = be(() => [t._getAllVisibleCells(), i.getState().columnPinning.right], (a, r) => (r ?? []).map((c) => a.find((d) => d.column.id === c)).filter(Boolean).map((c) => ({
      ...c,
      position: "right"
    })), Se(i.options, "debugRows"));
  },
  createTable: (t) => {
    t.setColumnPinning = (i) => t.options.onColumnPinningChange == null ? void 0 : t.options.onColumnPinningChange(i), t.resetColumnPinning = (i) => {
      var a, r;
      return t.setColumnPinning(i ? of() : (a = (r = t.initialState) == null ? void 0 : r.columnPinning) != null ? a : of());
    }, t.getIsSomeColumnsPinned = (i) => {
      var a;
      const r = t.getState().columnPinning;
      if (!i) {
        var u, c;
        return !!((u = r.left) != null && u.length || (c = r.right) != null && c.length);
      }
      return !!((a = r[i]) != null && a.length);
    }, t.getLeftLeafColumns = be(() => [t.getAllLeafColumns(), t.getState().columnPinning.left], (i, a) => (a ?? []).map((r) => i.find((u) => u.id === r)).filter(Boolean), Se(t.options, "debugColumns")), t.getRightLeafColumns = be(() => [t.getAllLeafColumns(), t.getState().columnPinning.right], (i, a) => (a ?? []).map((r) => i.find((u) => u.id === r)).filter(Boolean), Se(t.options, "debugColumns")), t.getCenterLeafColumns = be(() => [t.getAllLeafColumns(), t.getState().columnPinning.left, t.getState().columnPinning.right], (i, a, r) => {
      const u = [...a ?? [], ...r ?? []];
      return i.filter((c) => !u.includes(c.id));
    }, Se(t.options, "debugColumns"));
  }
};
function YR(t) {
  return t || (typeof document < "u" ? document : null);
}
const nu = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, uf = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), IR = {
  getDefaultColumnDef: () => nu,
  getInitialState: (t) => ({
    columnSizing: {},
    columnSizingInfo: uf(),
    ...t
  }),
  getDefaultOptions: (t) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Kt("columnSizing", t),
    onColumnSizingInfoChange: Kt("columnSizingInfo", t)
  }),
  createColumn: (t, i) => {
    t.getSize = () => {
      var a, r, u;
      const c = i.getState().columnSizing[t.id];
      return Math.min(Math.max((a = t.columnDef.minSize) != null ? a : nu.minSize, (r = c ?? t.columnDef.size) != null ? r : nu.size), (u = t.columnDef.maxSize) != null ? u : nu.maxSize);
    }, t.getStart = be((a) => [a, Er(i, a), i.getState().columnSizing], (a, r) => r.slice(0, t.getIndex(a)).reduce((u, c) => u + c.getSize(), 0), Se(i.options, "debugColumns")), t.getAfter = be((a) => [a, Er(i, a), i.getState().columnSizing], (a, r) => r.slice(t.getIndex(a) + 1).reduce((u, c) => u + c.getSize(), 0), Se(i.options, "debugColumns")), t.resetSize = () => {
      i.setColumnSizing((a) => {
        let {
          [t.id]: r,
          ...u
        } = a;
        return u;
      });
    }, t.getCanResize = () => {
      var a, r;
      return ((a = t.columnDef.enableResizing) != null ? a : !0) && ((r = i.options.enableColumnResizing) != null ? r : !0);
    }, t.getIsResizing = () => i.getState().columnSizingInfo.isResizingColumn === t.id;
  },
  createHeader: (t, i) => {
    t.getSize = () => {
      let a = 0;
      const r = (u) => {
        if (u.subHeaders.length)
          u.subHeaders.forEach(r);
        else {
          var c;
          a += (c = u.column.getSize()) != null ? c : 0;
        }
      };
      return r(t), a;
    }, t.getStart = () => {
      if (t.index > 0) {
        const a = t.headerGroup.headers[t.index - 1];
        return a.getStart() + a.getSize();
      }
      return 0;
    }, t.getResizeHandler = (a) => {
      const r = i.getColumn(t.column.id), u = r == null ? void 0 : r.getCanResize();
      return (c) => {
        if (!r || !u || (c.persist == null || c.persist(), sf(c) && c.touches && c.touches.length > 1))
          return;
        const d = t.getSize(), m = t ? t.getLeafHeaders().map((N) => [N.column.id, N.column.getSize()]) : [[r.id, r.getSize()]], g = sf(c) ? Math.round(c.touches[0].clientX) : c.clientX, p = {}, v = (N, j) => {
          typeof j == "number" && (i.setColumnSizingInfo(($) => {
            var B, Y;
            const Q = i.options.columnResizeDirection === "rtl" ? -1 : 1, ee = (j - ((B = $ == null ? void 0 : $.startOffset) != null ? B : 0)) * Q, O = Math.max(ee / ((Y = $ == null ? void 0 : $.startSize) != null ? Y : 0), -0.999999);
            return $.columnSizingStart.forEach((C) => {
              let [_, k] = C;
              p[_] = Math.round(Math.max(k + k * O, 0) * 100) / 100;
            }), {
              ...$,
              deltaOffset: ee,
              deltaPercentage: O
            };
          }), (i.options.columnResizeMode === "onChange" || N === "end") && i.setColumnSizing(($) => ({
            ...$,
            ...p
          })));
        }, w = (N) => v("move", N), S = (N) => {
          v("end", N), i.setColumnSizingInfo((j) => ({
            ...j,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, y = YR(a), b = {
          moveHandler: (N) => w(N.clientX),
          upHandler: (N) => {
            y == null || y.removeEventListener("mousemove", b.moveHandler), y == null || y.removeEventListener("mouseup", b.upHandler), S(N.clientX);
          }
        }, R = {
          moveHandler: (N) => (N.cancelable && (N.preventDefault(), N.stopPropagation()), w(N.touches[0].clientX), !1),
          upHandler: (N) => {
            var j;
            y == null || y.removeEventListener("touchmove", R.moveHandler), y == null || y.removeEventListener("touchend", R.upHandler), N.cancelable && (N.preventDefault(), N.stopPropagation()), S((j = N.touches[0]) == null ? void 0 : j.clientX);
          }
        }, M = XR() ? {
          passive: !1
        } : !1;
        sf(c) ? (y == null || y.addEventListener("touchmove", R.moveHandler, M), y == null || y.addEventListener("touchend", R.upHandler, M)) : (y == null || y.addEventListener("mousemove", b.moveHandler, M), y == null || y.addEventListener("mouseup", b.upHandler, M)), i.setColumnSizingInfo((N) => ({
          ...N,
          startOffset: g,
          startSize: d,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: m,
          isResizingColumn: r.id
        }));
      };
    };
  },
  createTable: (t) => {
    t.setColumnSizing = (i) => t.options.onColumnSizingChange == null ? void 0 : t.options.onColumnSizingChange(i), t.setColumnSizingInfo = (i) => t.options.onColumnSizingInfoChange == null ? void 0 : t.options.onColumnSizingInfoChange(i), t.resetColumnSizing = (i) => {
      var a;
      t.setColumnSizing(i ? {} : (a = t.initialState.columnSizing) != null ? a : {});
    }, t.resetHeaderSizeInfo = (i) => {
      var a;
      t.setColumnSizingInfo(i ? uf() : (a = t.initialState.columnSizingInfo) != null ? a : uf());
    }, t.getTotalSize = () => {
      var i, a;
      return (i = (a = t.getHeaderGroups()[0]) == null ? void 0 : a.headers.reduce((r, u) => r + u.getSize(), 0)) != null ? i : 0;
    }, t.getLeftTotalSize = () => {
      var i, a;
      return (i = (a = t.getLeftHeaderGroups()[0]) == null ? void 0 : a.headers.reduce((r, u) => r + u.getSize(), 0)) != null ? i : 0;
    }, t.getCenterTotalSize = () => {
      var i, a;
      return (i = (a = t.getCenterHeaderGroups()[0]) == null ? void 0 : a.headers.reduce((r, u) => r + u.getSize(), 0)) != null ? i : 0;
    }, t.getRightTotalSize = () => {
      var i, a;
      return (i = (a = t.getRightHeaderGroups()[0]) == null ? void 0 : a.headers.reduce((r, u) => r + u.getSize(), 0)) != null ? i : 0;
    };
  }
};
let lu = null;
function XR() {
  if (typeof lu == "boolean") return lu;
  let t = !1;
  try {
    const i = {
      get passive() {
        return t = !0, !1;
      }
    }, a = () => {
    };
    window.addEventListener("test", a, i), window.removeEventListener("test", a);
  } catch {
    t = !1;
  }
  return lu = t, lu;
}
function sf(t) {
  return t.type === "touchstart";
}
const ZR = {
  getInitialState: (t) => ({
    columnVisibility: {},
    ...t
  }),
  getDefaultOptions: (t) => ({
    onColumnVisibilityChange: Kt("columnVisibility", t)
  }),
  createColumn: (t, i) => {
    t.toggleVisibility = (a) => {
      t.getCanHide() && i.setColumnVisibility((r) => ({
        ...r,
        [t.id]: a ?? !t.getIsVisible()
      }));
    }, t.getIsVisible = () => {
      var a, r;
      const u = t.columns;
      return (a = u.length ? u.some((c) => c.getIsVisible()) : (r = i.getState().columnVisibility) == null ? void 0 : r[t.id]) != null ? a : !0;
    }, t.getCanHide = () => {
      var a, r;
      return ((a = t.columnDef.enableHiding) != null ? a : !0) && ((r = i.options.enableHiding) != null ? r : !0);
    }, t.getToggleVisibilityHandler = () => (a) => {
      t.toggleVisibility == null || t.toggleVisibility(a.target.checked);
    };
  },
  createRow: (t, i) => {
    t._getAllVisibleCells = be(() => [t.getAllCells(), i.getState().columnVisibility], (a) => a.filter((r) => r.column.getIsVisible()), Se(i.options, "debugRows")), t.getVisibleCells = be(() => [t.getLeftVisibleCells(), t.getCenterVisibleCells(), t.getRightVisibleCells()], (a, r, u) => [...a, ...r, ...u], Se(i.options, "debugRows"));
  },
  createTable: (t) => {
    const i = (a, r) => be(() => [r(), r().filter((u) => u.getIsVisible()).map((u) => u.id).join("_")], (u) => u.filter((c) => c.getIsVisible == null ? void 0 : c.getIsVisible()), Se(t.options, "debugColumns"));
    t.getVisibleFlatColumns = i("getVisibleFlatColumns", () => t.getAllFlatColumns()), t.getVisibleLeafColumns = i("getVisibleLeafColumns", () => t.getAllLeafColumns()), t.getLeftVisibleLeafColumns = i("getLeftVisibleLeafColumns", () => t.getLeftLeafColumns()), t.getRightVisibleLeafColumns = i("getRightVisibleLeafColumns", () => t.getRightLeafColumns()), t.getCenterVisibleLeafColumns = i("getCenterVisibleLeafColumns", () => t.getCenterLeafColumns()), t.setColumnVisibility = (a) => t.options.onColumnVisibilityChange == null ? void 0 : t.options.onColumnVisibilityChange(a), t.resetColumnVisibility = (a) => {
      var r;
      t.setColumnVisibility(a ? {} : (r = t.initialState.columnVisibility) != null ? r : {});
    }, t.toggleAllColumnsVisible = (a) => {
      var r;
      a = (r = a) != null ? r : !t.getIsAllColumnsVisible(), t.setColumnVisibility(t.getAllLeafColumns().reduce((u, c) => ({
        ...u,
        [c.id]: a || !(c.getCanHide != null && c.getCanHide())
      }), {}));
    }, t.getIsAllColumnsVisible = () => !t.getAllLeafColumns().some((a) => !(a.getIsVisible != null && a.getIsVisible())), t.getIsSomeColumnsVisible = () => t.getAllLeafColumns().some((a) => a.getIsVisible == null ? void 0 : a.getIsVisible()), t.getToggleAllColumnsVisibilityHandler = () => (a) => {
      var r;
      t.toggleAllColumnsVisible((r = a.target) == null ? void 0 : r.checked);
    };
  }
};
function Er(t, i) {
  return i ? i === "center" ? t.getCenterVisibleLeafColumns() : i === "left" ? t.getLeftVisibleLeafColumns() : t.getRightVisibleLeafColumns() : t.getVisibleLeafColumns();
}
const QR = {
  createTable: (t) => {
    t._getGlobalFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, "__global__"), t.getGlobalFacetedRowModel = () => t.options.manualFiltering || !t._getGlobalFacetedRowModel ? t.getPreFilteredRowModel() : t._getGlobalFacetedRowModel(), t._getGlobalFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, "__global__"), t.getGlobalFacetedUniqueValues = () => t._getGlobalFacetedUniqueValues ? t._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), t._getGlobalFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, "__global__"), t.getGlobalFacetedMinMaxValues = () => {
      if (t._getGlobalFacetedMinMaxValues)
        return t._getGlobalFacetedMinMaxValues();
    };
  }
}, KR = {
  getInitialState: (t) => ({
    globalFilter: void 0,
    ...t
  }),
  getDefaultOptions: (t) => ({
    onGlobalFilterChange: Kt("globalFilter", t),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (i) => {
      var a;
      const r = (a = t.getCoreRowModel().flatRows[0]) == null || (a = a._getAllCellsByColumnId()[i.id]) == null ? void 0 : a.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (t, i) => {
    t.getCanGlobalFilter = () => {
      var a, r, u, c;
      return ((a = t.columnDef.enableGlobalFilter) != null ? a : !0) && ((r = i.options.enableGlobalFilter) != null ? r : !0) && ((u = i.options.enableFilters) != null ? u : !0) && ((c = i.options.getColumnCanGlobalFilter == null ? void 0 : i.options.getColumnCanGlobalFilter(t)) != null ? c : !0) && !!t.accessorFn;
    };
  },
  createTable: (t) => {
    t.getGlobalAutoFilterFn = () => Jn.includesString, t.getGlobalFilterFn = () => {
      var i, a;
      const {
        globalFilterFn: r
      } = t.options;
      return Nu(r) ? r : r === "auto" ? t.getGlobalAutoFilterFn() : (i = (a = t.options.filterFns) == null ? void 0 : a[r]) != null ? i : Jn[r];
    }, t.setGlobalFilter = (i) => {
      t.options.onGlobalFilterChange == null || t.options.onGlobalFilterChange(i);
    }, t.resetGlobalFilter = (i) => {
      t.setGlobalFilter(i ? void 0 : t.initialState.globalFilter);
    };
  }
}, PR = {
  getInitialState: (t) => ({
    expanded: {},
    ...t
  }),
  getDefaultOptions: (t) => ({
    onExpandedChange: Kt("expanded", t),
    paginateExpandedRows: !0
  }),
  createTable: (t) => {
    let i = !1, a = !1;
    t._autoResetExpanded = () => {
      var r, u;
      if (!i) {
        t._queue(() => {
          i = !0;
        });
        return;
      }
      if ((r = (u = t.options.autoResetAll) != null ? u : t.options.autoResetExpanded) != null ? r : !t.options.manualExpanding) {
        if (a) return;
        a = !0, t._queue(() => {
          t.resetExpanded(), a = !1;
        });
      }
    }, t.setExpanded = (r) => t.options.onExpandedChange == null ? void 0 : t.options.onExpandedChange(r), t.toggleAllRowsExpanded = (r) => {
      r ?? !t.getIsAllRowsExpanded() ? t.setExpanded(!0) : t.setExpanded({});
    }, t.resetExpanded = (r) => {
      var u, c;
      t.setExpanded(r ? {} : (u = (c = t.initialState) == null ? void 0 : c.expanded) != null ? u : {});
    }, t.getCanSomeRowsExpand = () => t.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand()), t.getToggleAllRowsExpandedHandler = () => (r) => {
      r.persist == null || r.persist(), t.toggleAllRowsExpanded();
    }, t.getIsSomeRowsExpanded = () => {
      const r = t.getState().expanded;
      return r === !0 || Object.values(r).some(Boolean);
    }, t.getIsAllRowsExpanded = () => {
      const r = t.getState().expanded;
      return typeof r == "boolean" ? r === !0 : !(!Object.keys(r).length || t.getRowModel().flatRows.some((u) => !u.getIsExpanded()));
    }, t.getExpandedDepth = () => {
      let r = 0;
      return (t.getState().expanded === !0 ? Object.keys(t.getRowModel().rowsById) : Object.keys(t.getState().expanded)).forEach((c) => {
        const d = c.split(".");
        r = Math.max(r, d.length);
      }), r;
    }, t.getPreExpandedRowModel = () => t.getSortedRowModel(), t.getExpandedRowModel = () => (!t._getExpandedRowModel && t.options.getExpandedRowModel && (t._getExpandedRowModel = t.options.getExpandedRowModel(t)), t.options.manualExpanding || !t._getExpandedRowModel ? t.getPreExpandedRowModel() : t._getExpandedRowModel());
  },
  createRow: (t, i) => {
    t.toggleExpanded = (a) => {
      i.setExpanded((r) => {
        var u;
        const c = r === !0 ? !0 : !!(r != null && r[t.id]);
        let d = {};
        if (r === !0 ? Object.keys(i.getRowModel().rowsById).forEach((m) => {
          d[m] = !0;
        }) : d = r, a = (u = a) != null ? u : !c, !c && a)
          return {
            ...d,
            [t.id]: !0
          };
        if (c && !a) {
          const {
            [t.id]: m,
            ...g
          } = d;
          return g;
        }
        return r;
      });
    }, t.getIsExpanded = () => {
      var a;
      const r = i.getState().expanded;
      return !!((a = i.options.getIsRowExpanded == null ? void 0 : i.options.getIsRowExpanded(t)) != null ? a : r === !0 || r != null && r[t.id]);
    }, t.getCanExpand = () => {
      var a, r, u;
      return (a = i.options.getRowCanExpand == null ? void 0 : i.options.getRowCanExpand(t)) != null ? a : ((r = i.options.enableExpanding) != null ? r : !0) && !!((u = t.subRows) != null && u.length);
    }, t.getIsAllParentsExpanded = () => {
      let a = !0, r = t;
      for (; a && r.parentId; )
        r = i.getRow(r.parentId, !0), a = r.getIsExpanded();
      return a;
    }, t.getToggleExpandedHandler = () => {
      const a = t.getCanExpand();
      return () => {
        a && t.toggleExpanded();
      };
    };
  }
}, jf = 0, zf = 10, cf = () => ({
  pageIndex: jf,
  pageSize: zf
}), WR = {
  getInitialState: (t) => ({
    ...t,
    pagination: {
      ...cf(),
      ...t == null ? void 0 : t.pagination
    }
  }),
  getDefaultOptions: (t) => ({
    onPaginationChange: Kt("pagination", t)
  }),
  createTable: (t) => {
    let i = !1, a = !1;
    t._autoResetPageIndex = () => {
      var r, u;
      if (!i) {
        t._queue(() => {
          i = !0;
        });
        return;
      }
      if ((r = (u = t.options.autoResetAll) != null ? u : t.options.autoResetPageIndex) != null ? r : !t.options.manualPagination) {
        if (a) return;
        a = !0, t._queue(() => {
          t.resetPageIndex(), a = !1;
        });
      }
    }, t.setPagination = (r) => {
      const u = (c) => jl(r, c);
      return t.options.onPaginationChange == null ? void 0 : t.options.onPaginationChange(u);
    }, t.resetPagination = (r) => {
      var u;
      t.setPagination(r ? cf() : (u = t.initialState.pagination) != null ? u : cf());
    }, t.setPageIndex = (r) => {
      t.setPagination((u) => {
        let c = jl(r, u.pageIndex);
        const d = typeof t.options.pageCount > "u" || t.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : t.options.pageCount - 1;
        return c = Math.max(0, Math.min(c, d)), {
          ...u,
          pageIndex: c
        };
      });
    }, t.resetPageIndex = (r) => {
      var u, c;
      t.setPageIndex(r ? jf : (u = (c = t.initialState) == null || (c = c.pagination) == null ? void 0 : c.pageIndex) != null ? u : jf);
    }, t.resetPageSize = (r) => {
      var u, c;
      t.setPageSize(r ? zf : (u = (c = t.initialState) == null || (c = c.pagination) == null ? void 0 : c.pageSize) != null ? u : zf);
    }, t.setPageSize = (r) => {
      t.setPagination((u) => {
        const c = Math.max(1, jl(r, u.pageSize)), d = u.pageSize * u.pageIndex, m = Math.floor(d / c);
        return {
          ...u,
          pageIndex: m,
          pageSize: c
        };
      });
    }, t.setPageCount = (r) => t.setPagination((u) => {
      var c;
      let d = jl(r, (c = t.options.pageCount) != null ? c : -1);
      return typeof d == "number" && (d = Math.max(-1, d)), {
        ...u,
        pageCount: d
      };
    }), t.getPageOptions = be(() => [t.getPageCount()], (r) => {
      let u = [];
      return r && r > 0 && (u = [...new Array(r)].fill(null).map((c, d) => d)), u;
    }, Se(t.options, "debugTable")), t.getCanPreviousPage = () => t.getState().pagination.pageIndex > 0, t.getCanNextPage = () => {
      const {
        pageIndex: r
      } = t.getState().pagination, u = t.getPageCount();
      return u === -1 ? !0 : u === 0 ? !1 : r < u - 1;
    }, t.previousPage = () => t.setPageIndex((r) => r - 1), t.nextPage = () => t.setPageIndex((r) => r + 1), t.firstPage = () => t.setPageIndex(0), t.lastPage = () => t.setPageIndex(t.getPageCount() - 1), t.getPrePaginationRowModel = () => t.getExpandedRowModel(), t.getPaginationRowModel = () => (!t._getPaginationRowModel && t.options.getPaginationRowModel && (t._getPaginationRowModel = t.options.getPaginationRowModel(t)), t.options.manualPagination || !t._getPaginationRowModel ? t.getPrePaginationRowModel() : t._getPaginationRowModel()), t.getPageCount = () => {
      var r;
      return (r = t.options.pageCount) != null ? r : Math.ceil(t.getRowCount() / t.getState().pagination.pageSize);
    }, t.getRowCount = () => {
      var r;
      return (r = t.options.rowCount) != null ? r : t.getPrePaginationRowModel().rows.length;
    };
  }
}, ff = () => ({
  top: [],
  bottom: []
}), JR = {
  getInitialState: (t) => ({
    rowPinning: ff(),
    ...t
  }),
  getDefaultOptions: (t) => ({
    onRowPinningChange: Kt("rowPinning", t)
  }),
  createRow: (t, i) => {
    t.pin = (a, r, u) => {
      const c = r ? t.getLeafRows().map((g) => {
        let {
          id: p
        } = g;
        return p;
      }) : [], d = u ? t.getParentRows().map((g) => {
        let {
          id: p
        } = g;
        return p;
      }) : [], m = /* @__PURE__ */ new Set([...d, t.id, ...c]);
      i.setRowPinning((g) => {
        var p, v;
        if (a === "bottom") {
          var w, S;
          return {
            top: ((w = g == null ? void 0 : g.top) != null ? w : []).filter((R) => !(m != null && m.has(R))),
            bottom: [...((S = g == null ? void 0 : g.bottom) != null ? S : []).filter((R) => !(m != null && m.has(R))), ...Array.from(m)]
          };
        }
        if (a === "top") {
          var y, b;
          return {
            top: [...((y = g == null ? void 0 : g.top) != null ? y : []).filter((R) => !(m != null && m.has(R))), ...Array.from(m)],
            bottom: ((b = g == null ? void 0 : g.bottom) != null ? b : []).filter((R) => !(m != null && m.has(R)))
          };
        }
        return {
          top: ((p = g == null ? void 0 : g.top) != null ? p : []).filter((R) => !(m != null && m.has(R))),
          bottom: ((v = g == null ? void 0 : g.bottom) != null ? v : []).filter((R) => !(m != null && m.has(R)))
        };
      });
    }, t.getCanPin = () => {
      var a;
      const {
        enableRowPinning: r,
        enablePinning: u
      } = i.options;
      return typeof r == "function" ? r(t) : (a = r ?? u) != null ? a : !0;
    }, t.getIsPinned = () => {
      const a = [t.id], {
        top: r,
        bottom: u
      } = i.getState().rowPinning, c = a.some((m) => r == null ? void 0 : r.includes(m)), d = a.some((m) => u == null ? void 0 : u.includes(m));
      return c ? "top" : d ? "bottom" : !1;
    }, t.getPinnedIndex = () => {
      var a, r;
      const u = t.getIsPinned();
      if (!u) return -1;
      const c = (a = u === "top" ? i.getTopRows() : i.getBottomRows()) == null ? void 0 : a.map((d) => {
        let {
          id: m
        } = d;
        return m;
      });
      return (r = c == null ? void 0 : c.indexOf(t.id)) != null ? r : -1;
    };
  },
  createTable: (t) => {
    t.setRowPinning = (i) => t.options.onRowPinningChange == null ? void 0 : t.options.onRowPinningChange(i), t.resetRowPinning = (i) => {
      var a, r;
      return t.setRowPinning(i ? ff() : (a = (r = t.initialState) == null ? void 0 : r.rowPinning) != null ? a : ff());
    }, t.getIsSomeRowsPinned = (i) => {
      var a;
      const r = t.getState().rowPinning;
      if (!i) {
        var u, c;
        return !!((u = r.top) != null && u.length || (c = r.bottom) != null && c.length);
      }
      return !!((a = r[i]) != null && a.length);
    }, t._getPinnedRows = (i, a, r) => {
      var u;
      return ((u = t.options.keepPinnedRows) == null || u ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (a ?? []).map((d) => {
          const m = t.getRow(d, !0);
          return m.getIsAllParentsExpanded() ? m : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (a ?? []).map((d) => i.find((m) => m.id === d))
      )).filter(Boolean).map((d) => ({
        ...d,
        position: r
      }));
    }, t.getTopRows = be(() => [t.getRowModel().rows, t.getState().rowPinning.top], (i, a) => t._getPinnedRows(i, a, "top"), Se(t.options, "debugRows")), t.getBottomRows = be(() => [t.getRowModel().rows, t.getState().rowPinning.bottom], (i, a) => t._getPinnedRows(i, a, "bottom"), Se(t.options, "debugRows")), t.getCenterRows = be(() => [t.getRowModel().rows, t.getState().rowPinning.top, t.getState().rowPinning.bottom], (i, a, r) => {
      const u = /* @__PURE__ */ new Set([...a ?? [], ...r ?? []]);
      return i.filter((c) => !u.has(c.id));
    }, Se(t.options, "debugRows"));
  }
}, eT = {
  getInitialState: (t) => ({
    rowSelection: {},
    ...t
  }),
  getDefaultOptions: (t) => ({
    onRowSelectionChange: Kt("rowSelection", t),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (t) => {
    t.setRowSelection = (i) => t.options.onRowSelectionChange == null ? void 0 : t.options.onRowSelectionChange(i), t.resetRowSelection = (i) => {
      var a;
      return t.setRowSelection(i ? {} : (a = t.initialState.rowSelection) != null ? a : {});
    }, t.toggleAllRowsSelected = (i) => {
      t.setRowSelection((a) => {
        i = typeof i < "u" ? i : !t.getIsAllRowsSelected();
        const r = {
          ...a
        }, u = t.getPreGroupedRowModel().flatRows;
        return i ? u.forEach((c) => {
          c.getCanSelect() && (r[c.id] = !0);
        }) : u.forEach((c) => {
          delete r[c.id];
        }), r;
      });
    }, t.toggleAllPageRowsSelected = (i) => t.setRowSelection((a) => {
      const r = typeof i < "u" ? i : !t.getIsAllPageRowsSelected(), u = {
        ...a
      };
      return t.getRowModel().rows.forEach((c) => {
        $f(u, c.id, r, !0, t);
      }), u;
    }), t.getPreSelectedRowModel = () => t.getCoreRowModel(), t.getSelectedRowModel = be(() => [t.getState().rowSelection, t.getCoreRowModel()], (i, a) => Object.keys(i).length ? df(t, a) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Se(t.options, "debugTable")), t.getFilteredSelectedRowModel = be(() => [t.getState().rowSelection, t.getFilteredRowModel()], (i, a) => Object.keys(i).length ? df(t, a) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Se(t.options, "debugTable")), t.getGroupedSelectedRowModel = be(() => [t.getState().rowSelection, t.getSortedRowModel()], (i, a) => Object.keys(i).length ? df(t, a) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Se(t.options, "debugTable")), t.getIsAllRowsSelected = () => {
      const i = t.getFilteredRowModel().flatRows, {
        rowSelection: a
      } = t.getState();
      let r = !!(i.length && Object.keys(a).length);
      return r && i.some((u) => u.getCanSelect() && !a[u.id]) && (r = !1), r;
    }, t.getIsAllPageRowsSelected = () => {
      const i = t.getPaginationRowModel().flatRows.filter((u) => u.getCanSelect()), {
        rowSelection: a
      } = t.getState();
      let r = !!i.length;
      return r && i.some((u) => !a[u.id]) && (r = !1), r;
    }, t.getIsSomeRowsSelected = () => {
      var i;
      const a = Object.keys((i = t.getState().rowSelection) != null ? i : {}).length;
      return a > 0 && a < t.getFilteredRowModel().flatRows.length;
    }, t.getIsSomePageRowsSelected = () => {
      const i = t.getPaginationRowModel().flatRows;
      return t.getIsAllPageRowsSelected() ? !1 : i.filter((a) => a.getCanSelect()).some((a) => a.getIsSelected() || a.getIsSomeSelected());
    }, t.getToggleAllRowsSelectedHandler = () => (i) => {
      t.toggleAllRowsSelected(i.target.checked);
    }, t.getToggleAllPageRowsSelectedHandler = () => (i) => {
      t.toggleAllPageRowsSelected(i.target.checked);
    };
  },
  createRow: (t, i) => {
    t.toggleSelected = (a, r) => {
      const u = t.getIsSelected();
      i.setRowSelection((c) => {
        var d;
        if (a = typeof a < "u" ? a : !u, t.getCanSelect() && u === a)
          return c;
        const m = {
          ...c
        };
        return $f(m, t.id, a, (d = r == null ? void 0 : r.selectChildren) != null ? d : !0, i), m;
      });
    }, t.getIsSelected = () => {
      const {
        rowSelection: a
      } = i.getState();
      return od(t, a);
    }, t.getIsSomeSelected = () => {
      const {
        rowSelection: a
      } = i.getState();
      return Lf(t, a) === "some";
    }, t.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: a
      } = i.getState();
      return Lf(t, a) === "all";
    }, t.getCanSelect = () => {
      var a;
      return typeof i.options.enableRowSelection == "function" ? i.options.enableRowSelection(t) : (a = i.options.enableRowSelection) != null ? a : !0;
    }, t.getCanSelectSubRows = () => {
      var a;
      return typeof i.options.enableSubRowSelection == "function" ? i.options.enableSubRowSelection(t) : (a = i.options.enableSubRowSelection) != null ? a : !0;
    }, t.getCanMultiSelect = () => {
      var a;
      return typeof i.options.enableMultiRowSelection == "function" ? i.options.enableMultiRowSelection(t) : (a = i.options.enableMultiRowSelection) != null ? a : !0;
    }, t.getToggleSelectedHandler = () => {
      const a = t.getCanSelect();
      return (r) => {
        var u;
        a && t.toggleSelected((u = r.target) == null ? void 0 : u.checked);
      };
    };
  }
}, $f = (t, i, a, r, u) => {
  var c;
  const d = u.getRow(i, !0);
  a ? (d.getCanMultiSelect() || Object.keys(t).forEach((m) => delete t[m]), d.getCanSelect() && (t[i] = !0)) : delete t[i], r && (c = d.subRows) != null && c.length && d.getCanSelectSubRows() && d.subRows.forEach((m) => $f(t, m.id, a, r, u));
};
function df(t, i) {
  const a = t.getState().rowSelection, r = [], u = {}, c = function(d, m) {
    return d.map((g) => {
      var p;
      const v = od(g, a);
      if (v && (r.push(g), u[g.id] = g), (p = g.subRows) != null && p.length && (g = {
        ...g,
        subRows: c(g.subRows)
      }), v)
        return g;
    }).filter(Boolean);
  };
  return {
    rows: c(i.rows),
    flatRows: r,
    rowsById: u
  };
}
function od(t, i) {
  var a;
  return (a = i[t.id]) != null ? a : !1;
}
function Lf(t, i, a) {
  var r;
  if (!((r = t.subRows) != null && r.length)) return !1;
  let u = !0, c = !1;
  return t.subRows.forEach((d) => {
    if (!(c && !u) && (d.getCanSelect() && (od(d, i) ? c = !0 : u = !1), d.subRows && d.subRows.length)) {
      const m = Lf(d, i);
      m === "all" ? c = !0 : (m === "some" && (c = !0), u = !1);
    }
  }), u ? "all" : c ? "some" : !1;
}
const Hf = /([0-9]+)/gm, tT = (t, i, a) => U0(Fl(t.getValue(a)).toLowerCase(), Fl(i.getValue(a)).toLowerCase()), nT = (t, i, a) => U0(Fl(t.getValue(a)), Fl(i.getValue(a))), lT = (t, i, a) => ud(Fl(t.getValue(a)).toLowerCase(), Fl(i.getValue(a)).toLowerCase()), aT = (t, i, a) => ud(Fl(t.getValue(a)), Fl(i.getValue(a))), iT = (t, i, a) => {
  const r = t.getValue(a), u = i.getValue(a);
  return r > u ? 1 : r < u ? -1 : 0;
}, rT = (t, i, a) => ud(t.getValue(a), i.getValue(a));
function ud(t, i) {
  return t === i ? 0 : t > i ? 1 : -1;
}
function Fl(t) {
  return typeof t == "number" ? isNaN(t) || t === 1 / 0 || t === -1 / 0 ? "" : String(t) : typeof t == "string" ? t : "";
}
function U0(t, i) {
  const a = t.split(Hf).filter(Boolean), r = i.split(Hf).filter(Boolean);
  for (; a.length && r.length; ) {
    const u = a.shift(), c = r.shift(), d = parseInt(u, 10), m = parseInt(c, 10), g = [d, m].sort();
    if (isNaN(g[0])) {
      if (u > c)
        return 1;
      if (c > u)
        return -1;
      continue;
    }
    if (isNaN(g[1]))
      return isNaN(d) ? -1 : 1;
    if (d > m)
      return 1;
    if (m > d)
      return -1;
  }
  return a.length - r.length;
}
const hr = {
  alphanumeric: tT,
  alphanumericCaseSensitive: nT,
  text: lT,
  textCaseSensitive: aT,
  datetime: iT,
  basic: rT
}, oT = {
  getInitialState: (t) => ({
    sorting: [],
    ...t
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (t) => ({
    onSortingChange: Kt("sorting", t),
    isMultiSortEvent: (i) => i.shiftKey
  }),
  createColumn: (t, i) => {
    t.getAutoSortingFn = () => {
      const a = i.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const u of a) {
        const c = u == null ? void 0 : u.getValue(t.id);
        if (Object.prototype.toString.call(c) === "[object Date]")
          return hr.datetime;
        if (typeof c == "string" && (r = !0, c.split(Hf).length > 1))
          return hr.alphanumeric;
      }
      return r ? hr.text : hr.basic;
    }, t.getAutoSortDir = () => {
      const a = i.getFilteredRowModel().flatRows[0];
      return typeof (a == null ? void 0 : a.getValue(t.id)) == "string" ? "asc" : "desc";
    }, t.getSortingFn = () => {
      var a, r;
      if (!t)
        throw new Error();
      return Nu(t.columnDef.sortingFn) ? t.columnDef.sortingFn : t.columnDef.sortingFn === "auto" ? t.getAutoSortingFn() : (a = (r = i.options.sortingFns) == null ? void 0 : r[t.columnDef.sortingFn]) != null ? a : hr[t.columnDef.sortingFn];
    }, t.toggleSorting = (a, r) => {
      const u = t.getNextSortingOrder(), c = typeof a < "u" && a !== null;
      i.setSorting((d) => {
        const m = d == null ? void 0 : d.find((y) => y.id === t.id), g = d == null ? void 0 : d.findIndex((y) => y.id === t.id);
        let p = [], v, w = c ? a : u === "desc";
        if (d != null && d.length && t.getCanMultiSort() && r ? m ? v = "toggle" : v = "add" : d != null && d.length && g !== d.length - 1 ? v = "replace" : m ? v = "toggle" : v = "replace", v === "toggle" && (c || u || (v = "remove")), v === "add") {
          var S;
          p = [...d, {
            id: t.id,
            desc: w
          }], p.splice(0, p.length - ((S = i.options.maxMultiSortColCount) != null ? S : Number.MAX_SAFE_INTEGER));
        } else v === "toggle" ? p = d.map((y) => y.id === t.id ? {
          ...y,
          desc: w
        } : y) : v === "remove" ? p = d.filter((y) => y.id !== t.id) : p = [{
          id: t.id,
          desc: w
        }];
        return p;
      });
    }, t.getFirstSortDir = () => {
      var a, r;
      return ((a = (r = t.columnDef.sortDescFirst) != null ? r : i.options.sortDescFirst) != null ? a : t.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, t.getNextSortingOrder = (a) => {
      var r, u;
      const c = t.getFirstSortDir(), d = t.getIsSorted();
      return d ? d !== c && ((r = i.options.enableSortingRemoval) == null || r) && // If enableSortRemove, enable in general
      (!(a && (u = i.options.enableMultiRemove) != null) || u) ? !1 : d === "desc" ? "asc" : "desc" : c;
    }, t.getCanSort = () => {
      var a, r;
      return ((a = t.columnDef.enableSorting) != null ? a : !0) && ((r = i.options.enableSorting) != null ? r : !0) && !!t.accessorFn;
    }, t.getCanMultiSort = () => {
      var a, r;
      return (a = (r = t.columnDef.enableMultiSort) != null ? r : i.options.enableMultiSort) != null ? a : !!t.accessorFn;
    }, t.getIsSorted = () => {
      var a;
      const r = (a = i.getState().sorting) == null ? void 0 : a.find((u) => u.id === t.id);
      return r ? r.desc ? "desc" : "asc" : !1;
    }, t.getSortIndex = () => {
      var a, r;
      return (a = (r = i.getState().sorting) == null ? void 0 : r.findIndex((u) => u.id === t.id)) != null ? a : -1;
    }, t.clearSorting = () => {
      i.setSorting((a) => a != null && a.length ? a.filter((r) => r.id !== t.id) : []);
    }, t.getToggleSortingHandler = () => {
      const a = t.getCanSort();
      return (r) => {
        a && (r.persist == null || r.persist(), t.toggleSorting == null || t.toggleSorting(void 0, t.getCanMultiSort() ? i.options.isMultiSortEvent == null ? void 0 : i.options.isMultiSortEvent(r) : !1));
      };
    };
  },
  createTable: (t) => {
    t.setSorting = (i) => t.options.onSortingChange == null ? void 0 : t.options.onSortingChange(i), t.resetSorting = (i) => {
      var a, r;
      t.setSorting(i ? [] : (a = (r = t.initialState) == null ? void 0 : r.sorting) != null ? a : []);
    }, t.getPreSortedRowModel = () => t.getGroupedRowModel(), t.getSortedRowModel = () => (!t._getSortedRowModel && t.options.getSortedRowModel && (t._getSortedRowModel = t.options.getSortedRowModel(t)), t.options.manualSorting || !t._getSortedRowModel ? t.getPreSortedRowModel() : t._getSortedRowModel());
  }
}, uT = [
  OR,
  ZR,
  qR,
  GR,
  AR,
  DR,
  QR,
  //depends on ColumnFaceting
  KR,
  //depends on ColumnFiltering
  oT,
  UR,
  //depends on RowSorting
  PR,
  WR,
  JR,
  eT,
  IR
];
function sT(t) {
  var i, a;
  const r = [...uT, ...(i = t._features) != null ? i : []];
  let u = {
    _features: r
  };
  const c = u._features.reduce((S, y) => Object.assign(S, y.getDefaultOptions == null ? void 0 : y.getDefaultOptions(u)), {}), d = (S) => u.options.mergeOptions ? u.options.mergeOptions(c, S) : {
    ...c,
    ...S
  };
  let g = {
    ...{},
    ...(a = t.initialState) != null ? a : {}
  };
  u._features.forEach((S) => {
    var y;
    g = (y = S.getInitialState == null ? void 0 : S.getInitialState(g)) != null ? y : g;
  });
  const p = [];
  let v = !1;
  const w = {
    _features: r,
    options: {
      ...c,
      ...t
    },
    initialState: g,
    _queue: (S) => {
      p.push(S), v || (v = !0, Promise.resolve().then(() => {
        for (; p.length; )
          p.shift()();
        v = !1;
      }).catch((y) => setTimeout(() => {
        throw y;
      })));
    },
    reset: () => {
      u.setState(u.initialState);
    },
    setOptions: (S) => {
      const y = jl(S, u.options);
      u.options = d(y);
    },
    getState: () => u.options.state,
    setState: (S) => {
      u.options.onStateChange == null || u.options.onStateChange(S);
    },
    _getRowId: (S, y, b) => {
      var R;
      return (R = u.options.getRowId == null ? void 0 : u.options.getRowId(S, y, b)) != null ? R : `${b ? [b.id, y].join(".") : y}`;
    },
    getCoreRowModel: () => (u._getCoreRowModel || (u._getCoreRowModel = u.options.getCoreRowModel(u)), u._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => u.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (S, y) => {
      let b = (y ? u.getPrePaginationRowModel() : u.getRowModel()).rowsById[S];
      if (!b && (b = u.getCoreRowModel().rowsById[S], !b))
        throw new Error();
      return b;
    },
    _getDefaultColumnDef: be(() => [u.options.defaultColumn], (S) => {
      var y;
      return S = (y = S) != null ? y : {}, {
        header: (b) => {
          const R = b.header.column.columnDef;
          return R.accessorKey ? R.accessorKey : R.accessorFn ? R.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (b) => {
          var R, M;
          return (R = (M = b.renderValue()) == null || M.toString == null ? void 0 : M.toString()) != null ? R : null;
        },
        ...u._features.reduce((b, R) => Object.assign(b, R.getDefaultColumnDef == null ? void 0 : R.getDefaultColumnDef()), {}),
        ...S
      };
    }, Se(t, "debugColumns")),
    _getColumnDefs: () => u.options.columns,
    getAllColumns: be(() => [u._getColumnDefs()], (S) => {
      const y = function(b, R, M) {
        return M === void 0 && (M = 0), b.map((N) => {
          const j = MR(u, N, M, R), $ = N;
          return j.columns = $.columns ? y($.columns, j, M + 1) : [], j;
        });
      };
      return y(S);
    }, Se(t, "debugColumns")),
    getAllFlatColumns: be(() => [u.getAllColumns()], (S) => S.flatMap((y) => y.getFlatColumns()), Se(t, "debugColumns")),
    _getAllFlatColumnsById: be(() => [u.getAllFlatColumns()], (S) => S.reduce((y, b) => (y[b.id] = b, y), {}), Se(t, "debugColumns")),
    getAllLeafColumns: be(() => [u.getAllColumns(), u._getOrderColumnsFn()], (S, y) => {
      let b = S.flatMap((R) => R.getLeafColumns());
      return y(b);
    }, Se(t, "debugColumns")),
    getColumn: (S) => u._getAllFlatColumnsById()[S]
  };
  Object.assign(u, w);
  for (let S = 0; S < u._features.length; S++) {
    const y = u._features[S];
    y == null || y.createTable == null || y.createTable(u);
  }
  return u;
}
function cT() {
  return (t) => be(() => [t.options.data], (i) => {
    const a = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(u, c, d) {
      c === void 0 && (c = 0);
      const m = [];
      for (let p = 0; p < u.length; p++) {
        const v = _R(t, t._getRowId(u[p], p, d), u[p], p, c, void 0, d == null ? void 0 : d.id);
        if (a.flatRows.push(v), a.rowsById[v.id] = v, m.push(v), t.options.getSubRows) {
          var g;
          v.originalSubRows = t.options.getSubRows(u[p], p), (g = v.originalSubRows) != null && g.length && (v.subRows = r(v.originalSubRows, c + 1, v));
        }
      }
      return m;
    };
    return a.rows = r(i), a;
  }, Se(t.options, "debugTable", "getRowModel", () => t._autoResetPageIndex()));
}
function fT() {
  return (t) => be(() => [t.getState().sorting, t.getPreSortedRowModel()], (i, a) => {
    if (!a.rows.length || !(i != null && i.length))
      return a;
    const r = t.getState().sorting, u = [], c = r.filter((g) => {
      var p;
      return (p = t.getColumn(g.id)) == null ? void 0 : p.getCanSort();
    }), d = {};
    c.forEach((g) => {
      const p = t.getColumn(g.id);
      p && (d[g.id] = {
        sortUndefined: p.columnDef.sortUndefined,
        invertSorting: p.columnDef.invertSorting,
        sortingFn: p.getSortingFn()
      });
    });
    const m = (g) => {
      const p = g.map((v) => ({
        ...v
      }));
      return p.sort((v, w) => {
        for (let y = 0; y < c.length; y += 1) {
          var S;
          const b = c[y], R = d[b.id], M = R.sortUndefined, N = (S = b == null ? void 0 : b.desc) != null ? S : !1;
          let j = 0;
          if (M) {
            const $ = v.getValue(b.id), B = w.getValue(b.id), Y = $ === void 0, Q = B === void 0;
            if (Y || Q) {
              if (M === "first") return Y ? -1 : 1;
              if (M === "last") return Y ? 1 : -1;
              j = Y && Q ? 0 : Y ? M : -M;
            }
          }
          if (j === 0 && (j = R.sortingFn(v, w, b.id)), j !== 0)
            return N && (j *= -1), R.invertSorting && (j *= -1), j;
        }
        return v.index - w.index;
      }), p.forEach((v) => {
        var w;
        u.push(v), (w = v.subRows) != null && w.length && (v.subRows = m(v.subRows));
      }), p;
    };
    return {
      rows: m(a.rows),
      flatRows: u,
      rowsById: a.rowsById
    };
  }, Se(t.options, "debugTable", "getSortedRowModel", () => t._autoResetPageIndex()));
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function dT(t, i) {
  return t ? mT(t) ? /* @__PURE__ */ H.createElement(t, i) : t : null;
}
function mT(t) {
  return gT(t) || typeof t == "function" || pT(t);
}
function gT(t) {
  return typeof t == "function" && (() => {
    const i = Object.getPrototypeOf(t);
    return i.prototype && i.prototype.isReactComponent;
  })();
}
function pT(t) {
  return typeof t == "object" && typeof t.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(t.$$typeof.description);
}
function hT(t) {
  const i = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...t
  }, [a] = H.useState(() => ({
    current: sT(i)
  })), [r, u] = H.useState(() => a.current.initialState);
  return a.current.setOptions((c) => ({
    ...c,
    ...t,
    state: {
      ...r,
      ...t.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (d) => {
      u(d), t.onStateChange == null || t.onStateChange(d);
    }
  })), a.current;
}
const vT = 500, kh = 10;
function yT(t, { disabled: i = !1 } = {}) {
  const a = pe(null), r = pe(0), u = pe(0), c = pe(!1), d = ze(
    (p) => {
      if (i) return;
      const v = p.touches[0];
      r.current = v.clientX, u.current = v.clientY, c.current = !1, a.current = setTimeout(() => {
        c.current || t();
      }, vT);
    },
    [t, i]
  ), m = ze(() => {
    a.current && (clearTimeout(a.current), a.current = null);
  }, []), g = ze(
    (p) => {
      const v = p.touches[0], w = Math.abs(v.clientX - r.current), S = Math.abs(v.clientY - u.current);
      (w > kh || S > kh) && (c.current = !0, m());
    },
    [m]
  );
  return {
    onTouchStart: d,
    onTouchMove: g,
    onTouchEnd: m,
    onTouchCancel: m,
    onMouseLeave: m
  };
}
function bT({
  columnDefinition: t,
  value: i,
  onUpdated: a,
  allData: r,
  clearRowsSelection: u,
  errorsText: c
}) {
  var N;
  const { t: d } = st(), [m, g] = Ee(!1), p = pe(null);
  Ve(() => {
    m && (u(), p.current && p.current.focus());
  }, [m]);
  const v = t.type === "enum" ? ((N = t.typeArguments.values.find((j) => j.value === i)) == null ? void 0 : N.label) ?? i : i, w = v == null || typeof v == "string" && v.trim() === "", S = w ? " " : v, y = D0(t), b = yT(
    () => {
      y || g(!0);
    },
    { disabled: y }
  ), R = c ? "bg-hello-csv-danger-extra-light" : y ? "bg-hello-csv-muted" : "";
  if (!m)
    return /* @__PURE__ */ E.jsx(
      M2,
      {
        variant: c ? "error" : "info",
        tooltipText: c || (y ? d("sheet.readOnly") : ""),
        children: /* @__PURE__ */ E.jsx(
          "div",
          {
            ...b,
            onClick: (j) => !y && j.detail > 1 && g(!0),
            className: `h-full w-full py-4 pr-3 pl-4 ${R} touch-manipulation truncate overflow-hidden whitespace-nowrap`,
            title: w ? void 0 : `${S}`,
            children: S
          }
        )
      }
    );
  function M(j) {
    g(!1), t.type === "number" && j !== "" && !isNaN(Number(j)) ? a(Number(j)) : a(j ?? "");
  }
  if (t.type === "reference") {
    const $ = _0(
      t,
      r
    ).map((B) => ({
      label: B,
      value: B
    }));
    return /* @__PURE__ */ E.jsx(
      _r,
      {
        options: $,
        value: i,
        onChange: (B) => M(B ?? "")
      }
    );
  }
  if (t.type === "enum") {
    const $ = t.typeArguments.values;
    return /* @__PURE__ */ E.jsx(
      _r,
      {
        options: $,
        value: i,
        onChange: (B) => M(B ?? "")
      }
    );
  }
  return /* @__PURE__ */ E.jsx(
    C0,
    {
      type: t.type === "number" ? "number" : "text",
      classes: "block w-full",
      value: i,
      onBlur: M,
      ref: p
    }
  );
}
function ST({
  table: t,
  sheetDefinition: i,
  visibleData: a,
  allData: r,
  sheetValidationErrors: u,
  onCellValueChanged: c,
  selectedRows: d,
  setSelectedRows: m
}) {
  const { t: g } = st();
  function p(R, M) {
    return u.filter(
      (N) => N.columnId === R && N.rowIndex === M
    );
  }
  const v = d.length === a.length && a.length > 0;
  function w() {
    m(v ? [] : a);
  }
  function S(R) {
    d.includes(R) ? m(d.filter((M) => M !== R)) : m([...d, R]);
  }
  const y = "bg-hello-csv-muted py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap border-y border-gray-300", b = "text-sm font-medium whitespace-nowrap text-gray-900 border-b border-gray-300 max-w-[350px]";
  return /* @__PURE__ */ E.jsxs("table", { className: "min-w-full border-separate border-spacing-0", children: [
    /* @__PURE__ */ E.jsx("thead", { className: "bg-hello-csv-muted sticky top-0 z-10", children: t.getHeaderGroups().map((R) => /* @__PURE__ */ E.jsxs("tr", { children: [
      /* @__PURE__ */ E.jsx("th", { className: `${y} sticky left-0 z-20`, children: /* @__PURE__ */ E.jsx(
        Pp,
        {
          id: `Select all checkbox for ${i.id}`,
          checked: v,
          setChecked: w
        }
      ) }),
      R.headers.map((M) => /* @__PURE__ */ E.jsx("th", { className: `z-10 ${y}`, children: /* @__PURE__ */ E.jsxs(
        "div",
        {
          className: `flex ${M.column.getCanSort() ? "cursor-pointer select-none" : ""}`,
          onClick: M.column.getToggleSortingHandler(),
          children: [
            M.isPlaceholder ? null : dT(
              M.column.columnDef.header,
              M.getContext()
            ),
            /* @__PURE__ */ E.jsx("span", { className: "ml-2 flex-none rounded-sm bg-gray-500 text-gray-200", children: {
              asc: /* @__PURE__ */ E.jsx(w2, { "aria-hidden": "true", className: "size-5" }),
              desc: /* @__PURE__ */ E.jsx(
                y2,
                {
                  "aria-hidden": "true",
                  className: "size-5"
                }
              )
            }[M.column.getIsSorted()] ?? null })
          ]
        }
      ) }, M.id))
    ] }, R.id)) }),
    /* @__PURE__ */ E.jsx("tbody", { className: "divide-y divide-gray-200", children: t.getRowModel().rows.map((R) => /* @__PURE__ */ E.jsxs("tr", { children: [
      /* @__PURE__ */ E.jsx(
        "td",
        {
          className: `bg-hello-csv-muted ${b} sticky left-0 z-6 py-3.5 pr-3 pl-4`,
          children: /* @__PURE__ */ E.jsx(
            Pp,
            {
              id: `Selection checkbox for ${i.id} ${R.id}`,
              checked: d.includes(R.original),
              setChecked: () => S(R.original),
              label: `${Number(R.id) + 1}`
            }
          )
        }
      ),
      R.getVisibleCells().map((M, N) => {
        const j = i.columns[N].id, $ = A0(
          r,
          i.id,
          R.original
        ), B = p(j, $).map((Y) => g(Y.message)).join(", ");
        return /* @__PURE__ */ E.jsx("td", { className: b, children: /* @__PURE__ */ E.jsx(
          bT,
          {
            columnDefinition: i.columns.find((Y) => Y.id === j),
            allData: r,
            value: M.getValue(),
            onUpdated: (Y) => c($, j, Y),
            clearRowsSelection: () => m([]),
            errorsText: B
          }
        ) }, M.id);
      })
    ] }, R.id)) })
  ] });
}
function xT({ column: t }) {
  const { t: i } = st(), a = D0(t);
  return /* @__PURE__ */ E.jsxs(
    "div",
    {
      className: "flex items-center",
      title: a ? i("sheet.readOnly") : void 0,
      children: [
        a && /* @__PURE__ */ E.jsxs("div", { className: "relative mr-3 h-5 w-5", children: [
          /* @__PURE__ */ E.jsx(S0, { className: "absolute top-0 left-0 h-5 w-5 text-gray-400" }),
          /* @__PURE__ */ E.jsx(TC, { className: "absolute top-0 left-0 h-5 w-5 text-gray-500" })
        ] }),
        t.label,
        " ",
        Fr(t) && "*"
      ]
    }
  );
}
function wT({
  sheetDefinition: t,
  rowData: i,
  selectedRows: a,
  setSelectedRows: r,
  viewMode: u,
  setViewMode: c,
  searchPhrase: d,
  setSearchPhrase: m,
  errorColumnFilter: g,
  setErrorColumnFilter: p,
  removeRows: v,
  addEmptyRow: w,
  sheetValidationErrors: S,
  rowValidationSummary: y,
  resetState: b
}) {
  const { t: R } = st(), [M, N] = Ee(!1), [j, $] = Ee(!1), B = "pointer-events-none cursor-not-allowed opacity-50";
  function Y(C) {
    const _ = t.columns.find(
      (U) => U.id === C
    ), k = Hh(
      S.filter((U) => U.columnId === C).map((U) => U.rowIndex)
    ).length;
    return {
      label: `${(_ == null ? void 0 : _.label) || C} (${k})`,
      value: C
    };
  }
  const Q = Hh(
    S.map((C) => C.columnId)
  ).map((C) => Y(C));
  g != null && Q.find((C) => C.value === g) == null && Q.push(Y(g));
  const ee = [
    {
      value: "all",
      label: R("sheet.all") + ` (${y.all})`,
      onClick: () => {
        r([]), c("all");
      },
      variant: "default"
    },
    {
      value: "valid",
      label: R("sheet.valid") + ` (${y.valid})`,
      onClick: () => {
        r([]), c("valid");
      },
      variant: "default"
    },
    {
      value: "errors",
      label: R("sheet.invalid") + ` (${y.errors})`,
      onClick: () => {
        r([]), c("errors");
      },
      variant: "danger"
    }
  ];
  function O() {
    v({ rows: a, sheetId: t.id }), r([]);
  }
  return /* @__PURE__ */ E.jsxs("div", { className: "my-5 flex items-center", children: [
    /* @__PURE__ */ E.jsxs("div", { className: "flex grow flex-wrap items-center gap-5", children: [
      /* @__PURE__ */ E.jsx("div", { children: /* @__PURE__ */ E.jsx(_2, { activeButton: u, buttons: ee }) }),
      /* @__PURE__ */ E.jsx(
        C0,
        {
          clearable: !0,
          value: d,
          onChange: (C) => m(C),
          placeholder: R("sheet.search"),
          iconBuilder: ({ className: C }) => /* @__PURE__ */ E.jsx(CC, { "aria-hidden": !0, className: C })
        }
      ),
      /* @__PURE__ */ E.jsx(
        ii,
        {
          tooltipText: R(
            a.length <= 0 ? "sheet.removeRowsTooltipNoRowsSelected" : "sheet.removeRowsTooltip"
          ),
          children: /* @__PURE__ */ E.jsx(
            AC,
            {
              className: `h-6 w-6 ${a.length > 0 ? "cursor-pointer" : B}`,
              onClick: () => N(!0)
            }
          )
        }
      ),
      /* @__PURE__ */ E.jsx(ii, { tooltipText: R("sheet.addRowsTooltip"), children: /* @__PURE__ */ E.jsx(OC, { className: "h-6 w-6 cursor-pointer", onClick: w }) }),
      /* @__PURE__ */ E.jsx(ii, { tooltipText: R("sheet.downloadSheetTooltip"), children: /* @__PURE__ */ E.jsx(
        cC,
        {
          className: `h-6 w-6 ${i.length > 0 ? "cursor-pointer" : B}`,
          onClick: () => eR(t, i)
        }
      ) }),
      /* @__PURE__ */ E.jsx(
        _r,
        {
          clearable: !0,
          displayPlaceholderWhenSelected: !0,
          placeholder: R("sheet.filterByError"),
          classes: "min-w-48",
          options: Q,
          value: g,
          onChange: (C) => p(C)
        }
      ),
      /* @__PURE__ */ E.jsx(
        Af,
        {
          open: M,
          setOpen: N,
          onConfirm: O,
          title: R("sheet.removeConfirmationModalTitle"),
          confirmationText: R("sheet.removeConfirmationModalConfirmationText"),
          subTitle: R("sheet.removeConfirmationModalSubTitle", {
            rowsCount: a.length
          }),
          variant: "danger"
        }
      )
    ] }),
    /* @__PURE__ */ E.jsx(ii, { className: "ml-5", tooltipText: R("sheet.resetTooltip"), children: /* @__PURE__ */ E.jsx(
      S0,
      {
        className: "h-6 w-6 cursor-pointer",
        onClick: () => $(!0)
      }
    ) }),
    /* @__PURE__ */ E.jsx(
      Af,
      {
        open: j,
        setOpen: $,
        onConfirm: b,
        title: R("sheet.resetConfirmationModalTitle"),
        confirmationText: R("sheet.resetConfirmationModalConfirmationText"),
        subTitle: R("sheet.resetConfirmationModalSubTitle"),
        variant: "danger"
      }
    )
  ] });
}
function ET({
  sheetDefinition: t,
  data: i,
  allData: a,
  sheetValidationErrors: r,
  setRowData: u,
  removeRows: c,
  addEmptyRow: d,
  resetState: m
}) {
  const [g, p] = Ee([]), [v, w] = Ee("all"), [S, y] = Ee(""), [b, R] = Ee(
    null
  );
  Ve(() => {
    p([]), w("all");
  }, [t]);
  const M = tR(
    i,
    a,
    v,
    r,
    b,
    t,
    S
  ), N = Me(() => {
    const Y = i.rows, Q = Y.filter(
      (O, C) => !r.some((_) => _.rowIndex === C)
    ), ee = Y.filter(
      (O, C) => r.some((_) => _.rowIndex === C)
    );
    return {
      all: Y.length,
      valid: Q.length,
      errors: ee.length
    };
  }, [i, r]), j = Me(
    () => t.columns.map((Y) => ({
      id: Y.id,
      accessorFn: (Q) => Q[Y.id],
      header: () => /* @__PURE__ */ E.jsx(xT, { column: Y }),
      sortUndefined: "last",
      sortingFn: "auto"
    })),
    [t]
  ), $ = hT({
    data: M,
    columns: j,
    getCoreRowModel: cT(),
    getSortedRowModel: fT()
  });
  function B(Y, Q, ee) {
    const O = { ...i.rows[Y] };
    O[Q] = ee, u({
      sheetId: t.id,
      value: O,
      rowIndex: Y
    });
  }
  return /* @__PURE__ */ E.jsxs("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ E.jsx("div", { className: "flex-none", children: /* @__PURE__ */ E.jsx(
      wT,
      {
        sheetDefinition: t,
        rowData: M,
        selectedRows: g,
        setSelectedRows: p,
        viewMode: v,
        setViewMode: w,
        searchPhrase: S,
        setSearchPhrase: y,
        errorColumnFilter: b,
        setErrorColumnFilter: R,
        removeRows: c,
        addEmptyRow: d,
        sheetValidationErrors: r,
        rowValidationSummary: N,
        resetState: m
      }
    ) }),
    /* @__PURE__ */ E.jsx("div", { className: "min-h-0 flex-1 overflow-auto", children: /* @__PURE__ */ E.jsx(
      ST,
      {
        table: $,
        sheetDefinition: t,
        visibleData: M,
        allData: a,
        sheetValidationErrors: r,
        onCellValueChanged: B,
        selectedRows: g,
        setSelectedRows: p
      }
    ) })
  ] });
}
function B0(t) {
  return t.reduce((i, a) => i + a.rows.length, 0);
}
function q0(t) {
  const i = Object.keys(t[0]), a = [
    i.join(","),
    ...t.map(
      (u) => i.map((c) => {
        let d = String(u[c] ?? "");
        return d = d.replace(/"/g, '""'), /[",\n\r]/.test(d) && (d = `"${d}"`), d;
      }).join(",")
    )
  ].join(`
`);
  return new Blob([a], { type: "text/csv;charset=utf-8;" });
}
function CT(t, i) {
  const a = q0(i), r = document.createElement("a");
  r.href = URL.createObjectURL(a), r.download = `${t}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`, r.click();
}
function RT(t) {
  t.forEach((i) => {
    CT(i.sheetId, i.rows);
  });
}
const TT = (t) => q0(t).size, Uh = (t) => t.length ? t.reduce((i, a) => i + TT(a.rows), 0) : 0;
function MT(t) {
  const i = {
    required: [],
    optional: []
  };
  return t.forEach((a) => {
    a.columns.filter((r) => Du(r)).forEach((r) => {
      const u = {
        sheetId: a.id,
        columnId: r.id,
        columnLabel: r.label
      };
      Fr(r) ? i.required.push(u) : i.optional.push(u);
    });
  }), i;
}
const iu = (t) => {
  const i = ["B", "KB", "MB", "GB"];
  let a = t, r = 0;
  for (; a >= 1024 && r < i.length - 1; )
    a /= 1024, r++;
  return `${Math.round(a)} ${i[r]}`;
};
function OT({
  sheetData: t,
  statistics: i,
  rowFile: a,
  completedWithErrors: r,
  mode: u
}) {
  const { t: c } = st(), d = B0(t);
  return /* @__PURE__ */ E.jsx("div", { className: "flex flex-row px-4 pt-3 pb-2", children: /* @__PURE__ */ E.jsxs("div", { className: "flex-1 space-y-4", children: [
    /* @__PURE__ */ E.jsx("div", { children: /* @__PURE__ */ E.jsxs("div", { className: "flex flex-row", children: [
      /* @__PURE__ */ E.jsx("div", { className: "my-2 mr-5 text-center", children: /* @__PURE__ */ E.jsx(yC, { className: "text-hello-csv-primary h-8 w-8" }) }),
      /* @__PURE__ */ E.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ E.jsx("div", { className: "my-2 text-sm font-light uppercase", children: c("importStatus.fileInformation") }),
        /* @__PURE__ */ E.jsx("div", { className: "text-md my-2 font-medium", children: (a == null ? void 0 : a.name) || "Data entered manually" }),
        /* @__PURE__ */ E.jsx("div", { className: "my-2 text-sm text-gray-500", children: a ? `${c("importStatus.original")}: ${iu((a == null ? void 0 : a.size) || 0)} · ${c("importStatus.processed")}: ${iu(Uh(t))}` : `${c("importStatus.processed")}: ${iu(Uh(t))}` }),
        /* @__PURE__ */ E.jsx("div", { className: "mt-5", children: /* @__PURE__ */ E.jsx(
          pn,
          {
            variant: "tertiary",
            outline: !0,
            onClick: () => RT(t),
            children: c("importStatus.downloadProcessedData")
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ E.jsx("div", { className: "border-b border-gray-200 pb-2" }),
    /* @__PURE__ */ E.jsx("div", { children: /* @__PURE__ */ E.jsxs("div", { className: "flex flex-row", children: [
      /* @__PURE__ */ E.jsx("div", { className: "my-2 mr-5 text-center", children: u === "failed" ? /* @__PURE__ */ E.jsx(Nf, { className: "text-hello-csv-danger-light h-8 w-8" }) : r ? /* @__PURE__ */ E.jsx(z2, { className: "text-hello-csv-warning-light h-8 w-8" }) : /* @__PURE__ */ E.jsx(R0, { className: "text-hello-csv-success-light h-8 w-8" }) }),
      /* @__PURE__ */ E.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ E.jsx("div", { className: "my-2 text-sm font-light uppercase", children: c("importStatus.importResults") }),
        /* @__PURE__ */ E.jsx("div", { className: "text-md my-2 font-medium", children: c("importStatus.totalRows", { totalRows: d }) }),
        i && /* @__PURE__ */ E.jsxs("div", { className: "my-2 text-sm text-gray-500", children: [
          i.skipped >= 0 && /* @__PURE__ */ E.jsxs("span", { children: [
            c("importStatus.statisticsSkipped", {
              skipped: i.skipped
            }),
            " · "
          ] }),
          i.failed >= 0 && /* @__PURE__ */ E.jsxs("span", { children: [
            c("importStatus.statisticsFailed", {
              failed: i.failed
            }),
            " · "
          ] }),
          i.imported >= 0 && /* @__PURE__ */ E.jsx("span", { children: c("importStatus.statisticsImported", {
            imported: i.imported
          }) })
        ] }),
        u === "failed" && /* @__PURE__ */ E.jsxs("div", { className: "my-2 text-sm text-gray-500", children: [
          c("importStatus.status"),
          ":",
          " ",
          /* @__PURE__ */ E.jsx(ad, { variant: "error", children: c("importStatus.failed") })
        ] })
      ] })
    ] }) })
  ] }) });
}
function G0({
  mode: t,
  sheetData: i,
  statistics: a,
  rowFile: r,
  completedWithErrors: u
}) {
  const { t: c } = st();
  return /* @__PURE__ */ E.jsx(Ih, { withPadding: !1, className: "h-full", children: /* @__PURE__ */ E.jsxs("div", { className: "flex flex-col py-5", children: [
    /* @__PURE__ */ E.jsx("div", { className: "px-4 pb-2 text-xl", children: c("importStatus.importDetails") }),
    /* @__PURE__ */ E.jsx("div", { className: "px-4 pb-2 text-sm text-gray-500", children: c("importStatus.importDetailsDescription") }),
    /* @__PURE__ */ E.jsx("div", { className: "border-b border-gray-200 pb-2" }),
    /* @__PURE__ */ E.jsx(
      OT,
      {
        mode: t,
        sheetData: i,
        statistics: a,
        rowFile: r,
        completedWithErrors: u
      }
    )
  ] }) });
}
function _T({
  sheetData: t,
  statistics: i,
  mode: a,
  rowFile: r,
  resetState: u,
  onSummaryFinished: c
}) {
  const { t: d } = st(), m = B0(t), g = (i == null ? void 0 : i.imported) ?? 0, p = !!(i != null && i.failed) || !!(i != null && i.skipped);
  return /* @__PURE__ */ E.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ E.jsx("div", { className: "text-2xl", children: d("importStatus.dataImport") }),
    /* @__PURE__ */ E.jsx("div", { className: "mt-4", children: /* @__PURE__ */ E.jsx(
      id,
      {
        variant: p ? "warning" : "success",
        header: d(
          `importStatus.${p ? "importSuccessfulWithErrors" : "importSuccessful"}`
        ),
        description: d(
          `importStatus.successDescription${i ? "WithStats" : ""}`,
          {
            totalRecords: m,
            recordsImported: g
          }
        )
      }
    ) }),
    /* @__PURE__ */ E.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ E.jsx(
        G0,
        {
          mode: a,
          sheetData: t,
          statistics: i,
          rowFile: r,
          completedWithErrors: p
        }
      ),
      /* @__PURE__ */ E.jsx("div", { className: "mt-auto flex-none", children: /* @__PURE__ */ E.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ E.jsx(pn, { variant: "primary", onClick: c || u, children: d("importStatus.continue") }) }) })
    ] })
  ] });
}
function AT({
  onRetry: t,
  onBackToPreview: i,
  rowFile: a,
  sheetData: r,
  mode: u
}) {
  const { t: c } = st();
  return /* @__PURE__ */ E.jsx("div", { className: "flex h-full flex-col", children: /* @__PURE__ */ E.jsxs("div", { className: "flex h-full w-full flex-col", children: [
    /* @__PURE__ */ E.jsx("div", { className: "text-2xl", children: c("importStatus.dataImport") }),
    /* @__PURE__ */ E.jsx("div", { className: "mt-4", children: /* @__PURE__ */ E.jsx(
      id,
      {
        variant: "error",
        header: c("importStatus.importFailed"),
        description: c("importStatus.failedDescription")
      }
    ) }),
    /* @__PURE__ */ E.jsx("div", { className: "mt-6", children: /* @__PURE__ */ E.jsx(
      G0,
      {
        mode: u,
        sheetData: r,
        rowFile: a,
        completedWithErrors: !1
      }
    ) }),
    /* @__PURE__ */ E.jsxs("div", { className: "mt-6 flex justify-between", children: [
      /* @__PURE__ */ E.jsx(pn, { onClick: i, variant: "secondary", outline: !0, children: c("importer.loader.backToPreview") }),
      /* @__PURE__ */ E.jsx(pn, { onClick: t, variant: "primary", children: c("importer.loader.retry") })
    ] })
  ] }) });
}
function DT({ progress: t, pending: i }) {
  const r = 2 * Math.PI * 40, u = r - t / 100 * r, [c, d] = Ee(!1);
  return Ve(() => {
    if (t === 0) {
      const m = setTimeout(() => {
        d(!0);
      }, 3e3);
      return () => clearTimeout(m);
    }
  }, [t]), c ? /* @__PURE__ */ E.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ E.jsx(
    "div",
    {
      className: `border-hello-csv-success-light h-22 w-22 rounded-full border-10 ${i && "animate-spin border-t-transparent"}`
    }
  ) }) : /* @__PURE__ */ E.jsxs("svg", { className: "mx-auto h-24 w-24 rotate-[-90deg]", width: "100", height: "100", children: [
    /* @__PURE__ */ E.jsx(
      "circle",
      {
        cx: "50",
        cy: "50",
        r: 40,
        fill: "transparent",
        className: "text-gray-200",
        strokeWidth: "10",
        stroke: "currentColor"
      }
    ),
    /* @__PURE__ */ E.jsx(
      "circle",
      {
        cx: "50",
        cy: "50",
        r: 40,
        fill: "transparent",
        strokeWidth: "10",
        strokeDasharray: r,
        strokeDashoffset: u,
        className: "stroke-hello-csv-success-light transition-[stroke-dashoffset] duration-500"
      }
    )
  ] });
}
function NT() {
  return /* @__PURE__ */ E.jsx(gC, { className: "text-hello-csv-success absolute inset-0 m-auto h-12 w-12 stroke-4" });
}
function jT({ progress: t, mode: i, resetState: a }) {
  const r = i === "submit", { t: u } = st();
  return /* @__PURE__ */ E.jsx("div", { className: "flex h-full p-10", children: /* @__PURE__ */ E.jsx("div", { className: "flex h-full w-full flex-col", children: /* @__PURE__ */ E.jsxs("div", { className: "my-16 text-center", children: [
    /* @__PURE__ */ E.jsxs("div", { className: "relative mx-auto h-24 w-24", children: [
      /* @__PURE__ */ E.jsx(DT, { progress: t, pending: r }),
      r && /* @__PURE__ */ E.jsxs("div", { children: [
        /* @__PURE__ */ E.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ E.jsxs("b", { className: "text-lg", children: [
          t,
          "%"
        ] }) }),
        /* @__PURE__ */ E.jsx("h2", { className: "text-2xl", children: u("importer.loader.uploading") })
      ] }),
      !r && /* @__PURE__ */ E.jsx(NT, {})
    ] }),
    !r && /* @__PURE__ */ E.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ E.jsx("h2", { className: "text-2xl", children: u("importer.loader.success") }),
      /* @__PURE__ */ E.jsx("div", { className: "h-5" }),
      /* @__PURE__ */ E.jsx(pn, { variant: "secondary", onClick: a, children: u("sheet.reset") })
    ] })
  ] }) }) });
}
function zT({
  progress: t,
  mode: i,
  sheetData: a,
  onRetry: r,
  onBackToPreview: u,
  resetState: c,
  statistics: d,
  rowFile: m,
  onSummaryFinished: g
}) {
  return /* @__PURE__ */ E.jsxs("div", { className: "h-full", children: [
    i === "submit" && /* @__PURE__ */ E.jsx(jT, { progress: t, mode: i, resetState: c }),
    i === "failed" && /* @__PURE__ */ E.jsx(
      AT,
      {
        mode: i,
        onRetry: r,
        onBackToPreview: u,
        rowFile: m,
        sheetData: a
      }
    ),
    i === "completed" && /* @__PURE__ */ E.jsx(
      _T,
      {
        mode: i,
        sheetData: a,
        statistics: d,
        rowFile: m,
        resetState: c,
        onSummaryFinished: g
      }
    )
  ] });
}
async function Bh(t) {
  await new Promise((i) => {
    setTimeout(i, t);
  });
}
class Vr {
  constructor(i) {
    It(this, "definition");
    this.definition = i;
  }
  transform(i) {
    const a = this.parse(i);
    return a || i;
  }
  parse(i) {
    throw new Error("Not Implemented");
  }
}
class $T extends Vr {
  constructor(a) {
    super(a);
    It(this, "key");
    It(this, "parse");
    const { key: r, transformFn: u } = a;
    this.key = r, this.parse = u;
  }
}
class LT extends Vr {
  parse(i) {
    if (typeof i == "string")
      return i.replace(/[^0-9]/g, "");
  }
}
class HT extends Vr {
  parse(i) {
    if (typeof i == "string" && T0(i, "-"))
      return i.split("-")[0];
  }
}
const qh = [
  ["Arizona", "AZ"],
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"]
];
class FT extends Vr {
  parse(i) {
    const a = qh.map((r) => r[0].toLowerCase());
    if (typeof i == "string" && T0(a, i.toLowerCase())) {
      const r = a.indexOf(i.toLowerCase());
      return qh[r][1];
    }
  }
}
class VT extends Vr {
  parse(i) {
    if (typeof i == "string")
      return i.trim();
  }
}
function kT(t) {
  const i = {
    phone_number: LT,
    postal_code: HT,
    state_code: FT,
    strip: VT,
    custom: $T
  };
  if (!(t.transformer in i))
    throw new Error(
      `Missing transformer for ${t.transformer}. Valid transformer options are ${Object.keys(i).join(", ")}`
    );
  const a = i[t.transformer];
  return new a(t);
}
function UT(t, i) {
  const a = M0(
    t.columns,
    (r, u) => {
      u[r.id] = new BT(), r.transformers && r.transformers.forEach((c) => {
        u[r.id].push(
          kT(c)
        );
      });
    }
  );
  return t.columns.forEach((r) => {
    const u = r.id, c = a[u];
    i.rows.forEach((d) => {
      O0(d) && u in d && (d[u] = c.transform(d[u]));
    });
  }), i.rows;
}
function Ff(t, i) {
  const a = [];
  return t.forEach((r) => {
    const u = i.find(
      (c) => c.sheetId === r.id
    );
    if (u) {
      const c = UT(r, u);
      a.push({ sheetId: r.id, rows: c });
    }
  }), a;
}
class BT {
  // Series of transformations
  constructor(i = []) {
    It(this, "steps");
    this.steps = i;
  }
  push(i) {
    this.steps.push(i);
  }
  transform(i) {
    let a = i;
    return this.steps.forEach((r) => {
      a = r.transform(a);
    }), a;
  }
}
const Y0 = "HelloCSV", I0 = 1, tl = "state";
async function qT(t, i) {
  return new Promise((a, r) => {
    const u = Z0(t, i), c = indexedDB.open(Y0, I0);
    c.onerror = () => r(c.error), c.onsuccess = () => {
      const p = c.result.transaction(tl, "readonly").objectStore(tl).get(u);
      p.onerror = () => a(null), p.onsuccess = () => {
        try {
          const v = p.result;
          v.sheetDefinitions = t, a(v);
        } catch {
          a(null);
        }
      };
    }, c.onupgradeneeded = (d) => {
      const m = d.target.result;
      m.objectStoreNames.contains(tl) && m.deleteObjectStore(tl), m.createObjectStore(tl);
    };
  });
}
async function X0(t, i) {
  return new Promise((a, r) => {
    const u = Z0(t.sheetDefinitions, i), c = { ...t };
    delete c.sheetDefinitions;
    const d = indexedDB.open(Y0, I0);
    d.onerror = () => r(d.error), d.onsuccess = () => {
      const v = d.result.transaction(tl, "readwrite").objectStore(tl).put(c, u);
      v.onerror = () => r(v.error), v.onsuccess = () => a();
    }, d.onupgradeneeded = (m) => {
      const g = m.target.result;
      g.objectStoreNames.contains(tl) || g.createObjectStore(tl);
    };
  });
}
function Z0(t, i) {
  const a = i ? `importer-state-${i}` : "importer-state", r = JSON.stringify(t);
  return `${a}-${GT(r)}`;
}
function GT(t) {
  let i = 0;
  for (let a = 0; a < t.length; a++) {
    const r = t.charCodeAt(a);
    i = (i << 5) - i + r, i = i & i;
  }
  return i;
}
function YT(t, i, a) {
  const r = a.sheetDefinitions.find(
    (u) => u.id === i.sheetId
  );
  return r != null && r.columns.filter(
    (c) => c.type === "calculated"
  ).forEach((c) => {
    t[c.id] = c.typeArguments.getValue(t);
  }), t;
}
function ju(t) {
  return {
    sheetDefinitions: t,
    currentSheetId: t[0].id,
    mode: "upload",
    validationErrors: [],
    sheetData: t.map((i) => ({
      sheetId: i.id,
      rows: []
    })),
    importProgress: 0
  };
}
async function IT(t, i) {
  const a = ju(t);
  try {
    return i.enabled ? await XT(t, i) : a;
  } catch {
    return a;
  }
}
async function XT(t, i) {
  const a = await qT(
    t,
    i.customKey
  );
  if (a != null)
    return a;
  const r = ju(t);
  return X0(r, i.customKey), r;
}
const ZT = (t, i) => {
  switch (i.type) {
    case "ENTER_DATA_MANUALLY": {
      const a = t.sheetDefinitions.map((r) => ({
        sheetId: r.id,
        rows: Array.from(
          { length: i.payload.amountOfEmptyRowsToAdd },
          () => ({})
        )
      }));
      return { ...t, mode: "preview", sheetData: a };
    }
    case "FILE_PARSED":
      return {
        ...t,
        parsedFile: i.payload.parsed,
        rowFile: i.payload.rowFile,
        mode: "mapping"
      };
    case "UPLOAD":
      return { ...t, mode: "upload" };
    case "COLUMN_MAPPING_CHANGED":
      return {
        ...t,
        columnMappings: i.payload.mappings
      };
    case "DATA_MAPPED":
      return {
        ...t,
        sheetData: Ff(
          t.sheetDefinitions,
          i.payload.mappedData
        ),
        mode: "preview",
        validationErrors: af(
          t.sheetDefinitions,
          i.payload.mappedData
        )
      };
    case "CELL_CHANGED": {
      const r = t.sheetData.map((u) => {
        if (u.sheetId === i.payload.sheetId) {
          const c = [...u.rows];
          return c[i.payload.rowIndex] = YT(
            i.payload.value,
            i.payload,
            t
          ), { ...u, rows: c };
        } else
          return u;
      });
      return {
        ...t,
        sheetData: Ff(t.sheetDefinitions, r),
        validationErrors: af(t.sheetDefinitions, r)
      };
    }
    case "REMOVE_ROWS": {
      const a = t.sheetData.map((r) => r.sheetId === i.payload.sheetId ? {
        ...r,
        rows: r.rows.filter(
          (u) => !i.payload.rows.includes(u)
        )
      } : r);
      return {
        ...t,
        sheetData: a,
        validationErrors: af(t.sheetDefinitions, a)
      };
    }
    case "ADD_EMPTY_ROW": {
      const a = t.sheetData.map((r) => r.sheetId !== t.currentSheetId ? r : {
        ...r,
        rows: [...r.rows, {}]
      });
      return { ...t, sheetData: a };
    }
    case "SHEET_CHANGED":
      return { ...t, currentSheetId: i.payload.sheetId };
    case "SUBMIT":
      return { ...t, mode: "submit" };
    case "PROGRESS":
      return { ...t, importProgress: i.payload.progress };
    case "COMPLETED":
      return {
        ...t,
        mode: "completed",
        importStatistics: i.payload.importStatistics
      };
    case "FAILED":
      return { ...t, mode: "failed" };
    case "PREVIEW":
      return { ...t, mode: "preview" };
    case "MAPPING":
      return { ...t, mode: "mapping" };
    case "RESET":
      return ju(t.sheetDefinitions);
    case "SET_STATE":
      return i.payload.state;
    default:
      return t;
  }
}, QT = (t, i) => {
  const [a, r] = kf(ZT, ju(t));
  return Ve(() => {
    (async () => {
      const c = await IT(t, i);
      r({ type: "SET_STATE", payload: { state: c } });
    })();
  }, []), Ve(() => {
    i.enabled && X0(a, i.customKey);
  }, [a, i]), [a, r];
}, KT = ({
  theme: t,
  children: i
}) => (Ve(() => {
  t && document.documentElement.setAttribute("hello-csv-data-theme", t);
}, [t]), /* @__PURE__ */ E.jsx(E.Fragment, { children: i }));
var ru = { exports: {} };
/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/
var PT = ru.exports, Gh;
function WT() {
  return Gh || (Gh = 1, function(t, i) {
    ((a, r) => {
      t.exports = r();
    })(PT, function a() {
      var r = typeof self < "u" ? self : typeof window < "u" ? window : r !== void 0 ? r : {}, u, c = !r.document && !!r.postMessage, d = r.IS_PAPA_WORKER || !1, m = {}, g = 0, p = {};
      function v(O) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, (function(C) {
          var _ = Y(C);
          _.chunkSize = parseInt(_.chunkSize), C.step || C.chunk || (_.chunkSize = null), this._handle = new R(_), (this._handle.streamer = this)._config = _;
        }).call(this, O), this.parseChunk = function(C, _) {
          var k = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < k) {
            let te = this._config.newline;
            te || (U = this._config.quoteChar || '"', te = this._handle.guessLineEndings(C, U)), C = [...C.split(te).slice(k)].join(te);
          }
          this.isFirstChunk && ee(this._config.beforeFirstChunk) && (U = this._config.beforeFirstChunk(C)) !== void 0 && (C = U), this.isFirstChunk = !1, this._halted = !1;
          var k = this._partialLine + C, U = (this._partialLine = "", this._handle.parse(k, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            if (C = U.meta.cursor, k = (this._finished || (this._partialLine = k.substring(C - this._baseIndex), this._baseIndex = C), U && U.data && (this._rowCount += U.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview), d) r.postMessage({ results: U, workerId: p.WORKER_ID, finished: k });
            else if (ee(this._config.chunk) && !_) {
              if (this._config.chunk(U, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
              this._completeResults = U = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(U.data), this._completeResults.errors = this._completeResults.errors.concat(U.errors), this._completeResults.meta = U.meta), this._completed || !k || !ee(this._config.complete) || U && U.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), k || U && U.meta.paused || this._nextChunk(), U;
          }
          this._halted = !0;
        }, this._sendError = function(C) {
          ee(this._config.error) ? this._config.error(C) : d && this._config.error && r.postMessage({ workerId: p.WORKER_ID, error: C, finished: !1 });
        };
      }
      function w(O) {
        var C;
        (O = O || {}).chunkSize || (O.chunkSize = p.RemoteChunkSize), v.call(this, O), this._nextChunk = c ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(_) {
          this._input = _, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished) this._chunkLoaded();
          else {
            if (C = new XMLHttpRequest(), this._config.withCredentials && (C.withCredentials = this._config.withCredentials), c || (C.onload = Q(this._chunkLoaded, this), C.onerror = Q(this._chunkError, this)), C.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !c), this._config.downloadRequestHeaders) {
              var _, k = this._config.downloadRequestHeaders;
              for (_ in k) C.setRequestHeader(_, k[_]);
            }
            var U;
            this._config.chunkSize && (U = this._start + this._config.chunkSize - 1, C.setRequestHeader("Range", "bytes=" + this._start + "-" + U));
            try {
              C.send(this._config.downloadRequestBody);
            } catch (te) {
              this._chunkError(te.message);
            }
            c && C.status === 0 && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          C.readyState === 4 && (C.status < 200 || 400 <= C.status ? this._chunkError() : (this._start += this._config.chunkSize || C.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((_) => (_ = _.getResponseHeader("Content-Range")) !== null ? parseInt(_.substring(_.lastIndexOf("/") + 1)) : -1)(C), this.parseChunk(C.responseText)));
        }, this._chunkError = function(_) {
          _ = C.statusText || _, this._sendError(new Error(_));
        };
      }
      function S(O) {
        (O = O || {}).chunkSize || (O.chunkSize = p.LocalChunkSize), v.call(this, O);
        var C, _, k = typeof FileReader < "u";
        this.stream = function(U) {
          this._input = U, _ = U.slice || U.webkitSlice || U.mozSlice, k ? ((C = new FileReader()).onload = Q(this._chunkLoaded, this), C.onerror = Q(this._chunkError, this)) : C = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var U = this._input, te = (this._config.chunkSize && (te = Math.min(this._start + this._config.chunkSize, this._input.size), U = _.call(U, this._start, te)), C.readAsText(U, this._config.encoding));
          k || this._chunkLoaded({ target: { result: te } });
        }, this._chunkLoaded = function(U) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(U.target.result);
        }, this._chunkError = function() {
          this._sendError(C.error);
        };
      }
      function y(O) {
        var C;
        v.call(this, O = O || {}), this.stream = function(_) {
          return C = _, this._nextChunk();
        }, this._nextChunk = function() {
          var _, k;
          if (!this._finished) return _ = this._config.chunkSize, C = _ ? (k = C.substring(0, _), C.substring(_)) : (k = C, ""), this._finished = !C, this.parseChunk(k);
        };
      }
      function b(O) {
        v.call(this, O = O || {});
        var C = [], _ = !0, k = !1;
        this.pause = function() {
          v.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          v.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(U) {
          this._input = U, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          k && C.length === 1 && (this._finished = !0);
        }, this._nextChunk = function() {
          this._checkIsFinished(), C.length ? this.parseChunk(C.shift()) : _ = !0;
        }, this._streamData = Q(function(U) {
          try {
            C.push(typeof U == "string" ? U : U.toString(this._config.encoding)), _ && (_ = !1, this._checkIsFinished(), this.parseChunk(C.shift()));
          } catch (te) {
            this._streamError(te);
          }
        }, this), this._streamError = Q(function(U) {
          this._streamCleanUp(), this._sendError(U);
        }, this), this._streamEnd = Q(function() {
          this._streamCleanUp(), k = !0, this._streamData("");
        }, this), this._streamCleanUp = Q(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function R(O) {
        var C, _, k, U, te = Math.pow(2, 53), se = -te, ue = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, X = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, W = this, Z = 0, K = 0, ae = !1, re = !1, me = [], V = { data: [], errors: [], meta: {} };
        function I(ne) {
          return O.skipEmptyLines === "greedy" ? ne.join("").trim() === "" : ne.length === 1 && ne[0].length === 0;
        }
        function de() {
          if (V && k && (_e("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + p.DefaultDelimiter + "'"), k = !1), O.skipEmptyLines && (V.data = V.data.filter(function(he) {
            return !I(he);
          })), xe()) {
            let he = function(Be, qe) {
              ee(O.transformHeader) && (Be = O.transformHeader(Be, qe)), me.push(Be);
            };
            if (V) if (Array.isArray(V.data[0])) {
              for (var ne = 0; xe() && ne < V.data.length; ne++) V.data[ne].forEach(he);
              V.data.splice(0, 1);
            } else V.data.forEach(he);
          }
          function le(he, Be) {
            for (var qe = O.header ? {} : [], $e = 0; $e < he.length; $e++) {
              var Fe = $e, Re = he[$e], Re = ((_t, we) => ((Ie) => (O.dynamicTypingFunction && O.dynamicTyping[Ie] === void 0 && (O.dynamicTyping[Ie] = O.dynamicTypingFunction(Ie)), (O.dynamicTyping[Ie] || O.dynamicTyping) === !0))(_t) ? we === "true" || we === "TRUE" || we !== "false" && we !== "FALSE" && (((Ie) => {
                if (ue.test(Ie) && (Ie = parseFloat(Ie), se < Ie && Ie < te))
                  return 1;
              })(we) ? parseFloat(we) : X.test(we) ? new Date(we) : we === "" ? null : we) : we)(Fe = O.header ? $e >= me.length ? "__parsed_extra" : me[$e] : Fe, Re = O.transform ? O.transform(Re, Fe) : Re);
              Fe === "__parsed_extra" ? (qe[Fe] = qe[Fe] || [], qe[Fe].push(Re)) : qe[Fe] = Re;
            }
            return O.header && ($e > me.length ? _e("FieldMismatch", "TooManyFields", "Too many fields: expected " + me.length + " fields but parsed " + $e, K + Be) : $e < me.length && _e("FieldMismatch", "TooFewFields", "Too few fields: expected " + me.length + " fields but parsed " + $e, K + Be)), qe;
          }
          var oe;
          V && (O.header || O.dynamicTyping || O.transform) && (oe = 1, !V.data.length || Array.isArray(V.data[0]) ? (V.data = V.data.map(le), oe = V.data.length) : V.data = le(V.data, 0), O.header && V.meta && (V.meta.fields = me), K += oe);
        }
        function xe() {
          return O.header && me.length === 0;
        }
        function _e(ne, le, oe, he) {
          ne = { type: ne, code: le, message: oe }, he !== void 0 && (ne.row = he), V.errors.push(ne);
        }
        ee(O.step) && (U = O.step, O.step = function(ne) {
          V = ne, xe() ? de() : (de(), V.data.length !== 0 && (Z += ne.data.length, O.preview && Z > O.preview ? _.abort() : (V.data = V.data[0], U(V, W))));
        }), this.parse = function(ne, le, oe) {
          var he = O.quoteChar || '"', he = (O.newline || (O.newline = this.guessLineEndings(ne, he)), k = !1, O.delimiter ? ee(O.delimiter) && (O.delimiter = O.delimiter(ne), V.meta.delimiter = O.delimiter) : ((he = ((Be, qe, $e, Fe, Re) => {
            var _t, we, Ie, Pt;
            Re = Re || [",", "	", "|", ";", p.RECORD_SEP, p.UNIT_SEP];
            for (var Tn = 0; Tn < Re.length; Tn++) {
              for (var Wt, Ul = Re[Tn], Xe = 0, Jt = 0, nt = 0, bt = (Ie = void 0, new N({ comments: Fe, delimiter: Ul, newline: qe, preview: 10 }).parse(Be)), Lt = 0; Lt < bt.data.length; Lt++) $e && I(bt.data[Lt]) ? nt++ : (Wt = bt.data[Lt].length, Jt += Wt, Ie === void 0 ? Ie = Wt : 0 < Wt && (Xe += Math.abs(Wt - Ie), Ie = Wt));
              0 < bt.data.length && (Jt /= bt.data.length - nt), (we === void 0 || Xe <= we) && (Pt === void 0 || Pt < Jt) && 1.99 < Jt && (we = Xe, _t = Ul, Pt = Jt);
            }
            return { successful: !!(O.delimiter = _t), bestDelimiter: _t };
          })(ne, O.newline, O.skipEmptyLines, O.comments, O.delimitersToGuess)).successful ? O.delimiter = he.bestDelimiter : (k = !0, O.delimiter = p.DefaultDelimiter), V.meta.delimiter = O.delimiter), Y(O));
          return O.preview && O.header && he.preview++, C = ne, _ = new N(he), V = _.parse(C, le, oe), de(), ae ? { meta: { paused: !0 } } : V || { meta: { paused: !1 } };
        }, this.paused = function() {
          return ae;
        }, this.pause = function() {
          ae = !0, _.abort(), C = ee(O.chunk) ? "" : C.substring(_.getCharIndex());
        }, this.resume = function() {
          W.streamer._halted ? (ae = !1, W.streamer.parseChunk(C, !0)) : setTimeout(W.resume, 3);
        }, this.aborted = function() {
          return re;
        }, this.abort = function() {
          re = !0, _.abort(), V.meta.aborted = !0, ee(O.complete) && O.complete(V), C = "";
        }, this.guessLineEndings = function(Be, he) {
          Be = Be.substring(0, 1048576);
          var he = new RegExp(M(he) + "([^]*?)" + M(he), "gm"), oe = (Be = Be.replace(he, "")).split("\r"), he = Be.split(`
`), Be = 1 < he.length && he[0].length < oe[0].length;
          if (oe.length === 1 || Be) return `
`;
          for (var qe = 0, $e = 0; $e < oe.length; $e++) oe[$e][0] === `
` && qe++;
          return qe >= oe.length / 2 ? `\r
` : "\r";
        };
      }
      function M(O) {
        return O.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function N(O) {
        var C = (O = O || {}).delimiter, _ = O.newline, k = O.comments, U = O.step, te = O.preview, se = O.fastMode, ue = null, X = !1, W = O.quoteChar == null ? '"' : O.quoteChar, Z = W;
        if (O.escapeChar !== void 0 && (Z = O.escapeChar), (typeof C != "string" || -1 < p.BAD_DELIMITERS.indexOf(C)) && (C = ","), k === C) throw new Error("Comment character same as delimiter");
        k === !0 ? k = "#" : (typeof k != "string" || -1 < p.BAD_DELIMITERS.indexOf(k)) && (k = !1), _ !== `
` && _ !== "\r" && _ !== `\r
` && (_ = `
`);
        var K = 0, ae = !1;
        this.parse = function(re, me, V) {
          if (typeof re != "string") throw new Error("Input must be a string");
          var I = re.length, de = C.length, xe = _.length, _e = k.length, ne = ee(U), le = [], oe = [], he = [], Be = K = 0;
          if (!re) return Xe();
          if (se || se !== !1 && re.indexOf(W) === -1) {
            for (var qe = re.split(_), $e = 0; $e < qe.length; $e++) {
              if (he = qe[$e], K += he.length, $e !== qe.length - 1) K += _.length;
              else if (V) return Xe();
              if (!k || he.substring(0, _e) !== k) {
                if (ne) {
                  if (le = [], Pt(he.split(C)), Jt(), ae) return Xe();
                } else Pt(he.split(C));
                if (te && te <= $e) return le = le.slice(0, te), Xe(!0);
              }
            }
            return Xe();
          }
          for (var Fe = re.indexOf(C, K), Re = re.indexOf(_, K), _t = new RegExp(M(Z) + M(W), "g"), we = re.indexOf(W, K); ; ) if (re[K] === W) for (we = K, K++; ; ) {
            if ((we = re.indexOf(W, we + 1)) === -1) return V || oe.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: le.length, index: K }), Wt();
            if (we === I - 1) return Wt(re.substring(K, we).replace(_t, W));
            if (W === Z && re[we + 1] === Z) we++;
            else if (W === Z || we === 0 || re[we - 1] !== Z) {
              Fe !== -1 && Fe < we + 1 && (Fe = re.indexOf(C, we + 1));
              var Ie = Tn((Re = Re !== -1 && Re < we + 1 ? re.indexOf(_, we + 1) : Re) === -1 ? Fe : Math.min(Fe, Re));
              if (re.substr(we + 1 + Ie, de) === C) {
                he.push(re.substring(K, we).replace(_t, W)), re[K = we + 1 + Ie + de] !== W && (we = re.indexOf(W, K)), Fe = re.indexOf(C, K), Re = re.indexOf(_, K);
                break;
              }
              if (Ie = Tn(Re), re.substring(we + 1 + Ie, we + 1 + Ie + xe) === _) {
                if (he.push(re.substring(K, we).replace(_t, W)), Ul(we + 1 + Ie + xe), Fe = re.indexOf(C, K), we = re.indexOf(W, K), ne && (Jt(), ae)) return Xe();
                if (te && le.length >= te) return Xe(!0);
                break;
              }
              oe.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: le.length, index: K }), we++;
            }
          }
          else if (k && he.length === 0 && re.substring(K, K + _e) === k) {
            if (Re === -1) return Xe();
            K = Re + xe, Re = re.indexOf(_, K), Fe = re.indexOf(C, K);
          } else if (Fe !== -1 && (Fe < Re || Re === -1)) he.push(re.substring(K, Fe)), K = Fe + de, Fe = re.indexOf(C, K);
          else {
            if (Re === -1) break;
            if (he.push(re.substring(K, Re)), Ul(Re + xe), ne && (Jt(), ae)) return Xe();
            if (te && le.length >= te) return Xe(!0);
          }
          return Wt();
          function Pt(nt) {
            le.push(nt), Be = K;
          }
          function Tn(nt) {
            var bt = 0;
            return bt = nt !== -1 && (nt = re.substring(we + 1, nt)) && nt.trim() === "" ? nt.length : bt;
          }
          function Wt(nt) {
            return V || (nt === void 0 && (nt = re.substring(K)), he.push(nt), K = I, Pt(he), ne && Jt()), Xe();
          }
          function Ul(nt) {
            K = nt, Pt(he), he = [], Re = re.indexOf(_, K);
          }
          function Xe(nt) {
            if (O.header && !me && le.length && !X) {
              var bt = le[0], Lt = /* @__PURE__ */ Object.create(null), pi = new Set(bt);
              let hi = !1;
              for (let il = 0; il < bt.length; il++) {
                let en = bt[il];
                if (Lt[en = ee(O.transformHeader) ? O.transformHeader(en, il) : en]) {
                  let vn, Et = Lt[en];
                  for (; vn = en + "_" + Et, Et++, pi.has(vn); ) ;
                  pi.add(vn), bt[il] = vn, Lt[en]++, hi = !0, (ue = ue === null ? {} : ue)[vn] = en;
                } else Lt[en] = 1, bt[il] = en;
                pi.add(en);
              }
              hi && console.warn("Duplicate headers found and renamed."), X = !0;
            }
            return { data: le, errors: oe, meta: { delimiter: C, linebreak: _, aborted: ae, truncated: !!nt, cursor: Be + (me || 0), renamedHeaders: ue } };
          }
          function Jt() {
            U(Xe()), le = [], oe = [];
          }
        }, this.abort = function() {
          ae = !0;
        }, this.getCharIndex = function() {
          return K;
        };
      }
      function j(O) {
        var C = O.data, _ = m[C.workerId], k = !1;
        if (C.error) _.userError(C.error, C.file);
        else if (C.results && C.results.data) {
          var U = { abort: function() {
            k = !0, $(C.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: B, resume: B };
          if (ee(_.userStep)) {
            for (var te = 0; te < C.results.data.length && (_.userStep({ data: C.results.data[te], errors: C.results.errors, meta: C.results.meta }, U), !k); te++) ;
            delete C.results;
          } else ee(_.userChunk) && (_.userChunk(C.results, U, C.file), delete C.results);
        }
        C.finished && !k && $(C.workerId, C.results);
      }
      function $(O, C) {
        var _ = m[O];
        ee(_.userComplete) && _.userComplete(C), _.terminate(), delete m[O];
      }
      function B() {
        throw new Error("Not implemented.");
      }
      function Y(O) {
        if (typeof O != "object" || O === null) return O;
        var C, _ = Array.isArray(O) ? [] : {};
        for (C in O) _[C] = Y(O[C]);
        return _;
      }
      function Q(O, C) {
        return function() {
          O.apply(C, arguments);
        };
      }
      function ee(O) {
        return typeof O == "function";
      }
      return p.parse = function(O, C) {
        var _ = (C = C || {}).dynamicTyping || !1;
        if (ee(_) && (C.dynamicTypingFunction = _, _ = {}), C.dynamicTyping = _, C.transform = !!ee(C.transform) && C.transform, !C.worker || !p.WORKERS_SUPPORTED) return _ = null, p.NODE_STREAM_INPUT, typeof O == "string" ? (O = ((k) => k.charCodeAt(0) !== 65279 ? k : k.slice(1))(O), _ = new (C.download ? w : y)(C)) : O.readable === !0 && ee(O.read) && ee(O.on) ? _ = new b(C) : (r.File && O instanceof File || O instanceof Object) && (_ = new S(C)), _.stream(O);
        (_ = (() => {
          var k;
          return !!p.WORKERS_SUPPORTED && (k = (() => {
            var U = r.URL || r.webkitURL || null, te = a.toString();
            return p.BLOB_URL || (p.BLOB_URL = U.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", te, ")();"], { type: "text/javascript" })));
          })(), (k = new r.Worker(k)).onmessage = j, k.id = g++, m[k.id] = k);
        })()).userStep = C.step, _.userChunk = C.chunk, _.userComplete = C.complete, _.userError = C.error, C.step = ee(C.step), C.chunk = ee(C.chunk), C.complete = ee(C.complete), C.error = ee(C.error), delete C.worker, _.postMessage({ input: O, config: C, workerId: _.id });
      }, p.unparse = function(O, C) {
        var _ = !1, k = !0, U = ",", te = `\r
`, se = '"', ue = se + se, X = !1, W = null, Z = !1, K = ((() => {
          if (typeof C == "object") {
            if (typeof C.delimiter != "string" || p.BAD_DELIMITERS.filter(function(me) {
              return C.delimiter.indexOf(me) !== -1;
            }).length || (U = C.delimiter), typeof C.quotes != "boolean" && typeof C.quotes != "function" && !Array.isArray(C.quotes) || (_ = C.quotes), typeof C.skipEmptyLines != "boolean" && typeof C.skipEmptyLines != "string" || (X = C.skipEmptyLines), typeof C.newline == "string" && (te = C.newline), typeof C.quoteChar == "string" && (se = C.quoteChar), typeof C.header == "boolean" && (k = C.header), Array.isArray(C.columns)) {
              if (C.columns.length === 0) throw new Error("Option columns is empty");
              W = C.columns;
            }
            C.escapeChar !== void 0 && (ue = C.escapeChar + se), C.escapeFormulae instanceof RegExp ? Z = C.escapeFormulae : typeof C.escapeFormulae == "boolean" && C.escapeFormulae && (Z = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(M(se), "g"));
        if (typeof O == "string" && (O = JSON.parse(O)), Array.isArray(O)) {
          if (!O.length || Array.isArray(O[0])) return ae(null, O, X);
          if (typeof O[0] == "object") return ae(W || Object.keys(O[0]), O, X);
        } else if (typeof O == "object") return typeof O.data == "string" && (O.data = JSON.parse(O.data)), Array.isArray(O.data) && (O.fields || (O.fields = O.meta && O.meta.fields || W), O.fields || (O.fields = Array.isArray(O.data[0]) ? O.fields : typeof O.data[0] == "object" ? Object.keys(O.data[0]) : []), Array.isArray(O.data[0]) || typeof O.data[0] == "object" || (O.data = [O.data])), ae(O.fields || [], O.data || [], X);
        throw new Error("Unable to serialize unrecognized input");
        function ae(me, V, I) {
          var de = "", xe = (typeof me == "string" && (me = JSON.parse(me)), typeof V == "string" && (V = JSON.parse(V)), Array.isArray(me) && 0 < me.length), _e = !Array.isArray(V[0]);
          if (xe && k) {
            for (var ne = 0; ne < me.length; ne++) 0 < ne && (de += U), de += re(me[ne], ne);
            0 < V.length && (de += te);
          }
          for (var le = 0; le < V.length; le++) {
            var oe = (xe ? me : V[le]).length, he = !1, Be = xe ? Object.keys(V[le]).length === 0 : V[le].length === 0;
            if (I && !xe && (he = I === "greedy" ? V[le].join("").trim() === "" : V[le].length === 1 && V[le][0].length === 0), I === "greedy" && xe) {
              for (var qe = [], $e = 0; $e < oe; $e++) {
                var Fe = _e ? me[$e] : $e;
                qe.push(V[le][Fe]);
              }
              he = qe.join("").trim() === "";
            }
            if (!he) {
              for (var Re = 0; Re < oe; Re++) {
                0 < Re && !Be && (de += U);
                var _t = xe && _e ? me[Re] : Re;
                de += re(V[le][_t], Re);
              }
              le < V.length - 1 && (!I || 0 < oe && !Be) && (de += te);
            }
          }
          return de;
        }
        function re(me, V) {
          var I, de;
          return me == null ? "" : me.constructor === Date ? JSON.stringify(me).slice(1, 25) : (de = !1, Z && typeof me == "string" && Z.test(me) && (me = "'" + me, de = !0), I = me.toString().replace(K, ue), (de = de || _ === !0 || typeof _ == "function" && _(me, V) || Array.isArray(_) && _[V] || ((xe, _e) => {
            for (var ne = 0; ne < _e.length; ne++) if (-1 < xe.indexOf(_e[ne])) return !0;
            return !1;
          })(I, p.BAD_DELIMITERS) || -1 < I.indexOf(U) || I.charAt(0) === " " || I.charAt(I.length - 1) === " ") ? se + I + se : I);
        }
      }, p.RECORD_SEP = "", p.UNIT_SEP = "", p.BYTE_ORDER_MARK = "\uFEFF", p.BAD_DELIMITERS = ["\r", `
`, '"', p.BYTE_ORDER_MARK], p.WORKERS_SUPPORTED = !c && !!r.Worker, p.NODE_STREAM_INPUT = 1, p.LocalChunkSize = 10485760, p.RemoteChunkSize = 5242880, p.DefaultDelimiter = ",", p.Parser = N, p.ParserHandle = R, p.NetworkStreamer = w, p.FileStreamer = S, p.StringStreamer = y, p.ReadableStreamStreamer = b, r.jQuery && ((u = r.jQuery).fn.parse = function(O) {
        var C = O.config || {}, _ = [];
        return this.each(function(te) {
          if (!(u(this).prop("tagName").toUpperCase() === "INPUT" && u(this).attr("type").toLowerCase() === "file" && r.FileReader) || !this.files || this.files.length === 0) return !0;
          for (var se = 0; se < this.files.length; se++) _.push({ file: this.files[se], inputElem: this, instanceConfig: u.extend({}, C) });
        }), k(), this;
        function k() {
          if (_.length === 0) ee(O.complete) && O.complete();
          else {
            var te, se, ue, X, W = _[0];
            if (ee(O.before)) {
              var Z = O.before(W.file, W.inputElem);
              if (typeof Z == "object") {
                if (Z.action === "abort") return te = "AbortError", se = W.file, ue = W.inputElem, X = Z.reason, void (ee(O.error) && O.error({ name: te }, se, ue, X));
                if (Z.action === "skip") return void U();
                typeof Z.config == "object" && (W.instanceConfig = u.extend(W.instanceConfig, Z.config));
              } else if (Z === "skip") return void U();
            }
            var K = W.instanceConfig.complete;
            W.instanceConfig.complete = function(ae) {
              ee(K) && K(ae, W.file, W.inputElem), U();
            }, p.parse(W.file, W.instanceConfig);
          }
        }
        function U() {
          _.splice(0, 1), k();
        }
      }), d && (r.onmessage = function(O) {
        O = O.data, p.WORKER_ID === void 0 && O && (p.WORKER_ID = O.workerId), typeof O.input == "string" ? r.postMessage({ workerId: p.WORKER_ID, results: p.parse(O.input, O.config), finished: !0 }) : (r.File && O.input instanceof File || O.input instanceof Object) && (O = p.parse(O.input, O.config)) && r.postMessage({ workerId: p.WORKER_ID, results: O, finished: !0 });
      }), (w.prototype = Object.create(v.prototype)).constructor = w, (S.prototype = Object.create(v.prototype)).constructor = S, (y.prototype = Object.create(y.prototype)).constructor = y, (b.prototype = Object.create(v.prototype)).constructor = b, p;
    });
  }(ru)), ru.exports;
}
var JT = WT();
const e5 = /* @__PURE__ */ S1(JT);
function t5({
  file: t,
  onCompleted: i
}) {
  e5.parse(t, {
    skipEmptyLines: !0,
    header: !0,
    complete: i
  });
}
function n5({
  title: t,
  titleId: i,
  ...a
}, r) {
  return /* @__PURE__ */ H.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": i
  }, a), t ? /* @__PURE__ */ H.createElement("title", {
    id: i
  }, t) : null, /* @__PURE__ */ H.createElement("path", {
    fillRule: "evenodd",
    d: "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    clipRule: "evenodd"
  }));
}
const l5 = /* @__PURE__ */ H.forwardRef(n5);
function a5({
  sheetDefinitions: t,
  activeSheetId: i,
  onSheetChange: a,
  validationErrors: r
}) {
  return /* @__PURE__ */ E.jsx(
    C2,
    {
      tabs: t.map((u) => ({
        label: u.label,
        value: u.id,
        icon: r.some((c) => c.sheetId === u.id) ? /* @__PURE__ */ E.jsx(l5, { className: "mr-3 h-4 w-4" }) : void 0
      })),
      activeTab: i,
      onTabChange: a
    }
  );
}
function i5({ onBackToMapping: t }) {
  const { t: i } = st(), [a, r] = Ee(!1);
  return /* @__PURE__ */ E.jsxs(E.Fragment, { children: [
    /* @__PURE__ */ E.jsx(
      pn,
      {
        onClick: () => r(!0),
        variant: "secondary",
        children: i("importer.back")
      }
    ),
    /* @__PURE__ */ E.jsx(
      Af,
      {
        variant: "danger",
        onConfirm: t,
        open: a,
        setOpen: r,
        title: i("importer.backToMappingConfirmation.title"),
        subTitle: i("importer.backToMappingConfirmation.subTitle"),
        confirmationText: i(
          "importer.backToMappingConfirmation.confirmationText"
        ),
        cancelText: i("importer.backToMappingConfirmation.cancelText")
      }
    )
  ] });
}
function r5({ importerRequirements: t }) {
  const { t: i } = st(), [a, r] = Ee(!1);
  return /* @__PURE__ */ E.jsx("div", { className: "h-full w-full space-y-5 overflow-y-auto", children: Object.entries(t).filter(([, u]) => u.length > 0).map(([u, c]) => {
    const d = u === "optional", m = d && !a ? c.slice(0, 8) : c;
    return /* @__PURE__ */ E.jsxs("div", { className: "me-3", children: [
      /* @__PURE__ */ E.jsx("div", { className: "my-3 border-b border-gray-200 pb-4 text-sm font-light uppercase", children: i(`uploader.${u}Columns`) }),
      /* @__PURE__ */ E.jsxs("div", { className: "mt-4", children: [
        m.map((g) => /* @__PURE__ */ E.jsxs(
          "div",
          {
            className: "my-3 flex justify-between",
            children: [
              /* @__PURE__ */ E.jsx("div", { className: "text-xs", children: g.columnLabel }),
              /* @__PURE__ */ E.jsx("div", { className: "text-xs font-light", children: /* @__PURE__ */ E.jsx(
                ii,
                {
                  tooltipText: i(`uploader.${u}ColumnsTooltip`),
                  children: /* @__PURE__ */ E.jsx(wC, { className: "size-5 text-gray-500" })
                }
              ) })
            ]
          },
          `${g.sheetId}-${g.columnId}`
        )),
        d && c.length > 8 && /* @__PURE__ */ E.jsx(
          "button",
          {
            className: "mt-2 text-xs text-blue-600 hover:underline focus:outline-none",
            onClick: () => r((g) => !g),
            children: a ? i("uploader.collapseOptional") || "Show less" : i("uploader.expandOptional") || "Show all"
          }
        )
      ] })
    ] }, u);
  }) });
}
function o5({ importerRequirements: t }) {
  const { t: i } = st();
  return /* @__PURE__ */ E.jsxs("div", { className: "flex h-full flex-col space-y-5", children: [
    /* @__PURE__ */ E.jsx("div", { className: "me-3", children: /* @__PURE__ */ E.jsx(id, { variant: "info", description: i("uploader.importerInformation") }) }),
    /* @__PURE__ */ E.jsx("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ E.jsx(r5, { importerRequirements: t }) })
  ] });
}
function u5({
  setFile: t,
  allowManualDataEntry: i = !0,
  onEnterDataManually: a,
  maxFileSizeInBytes: r
}) {
  const { t: u, tHtml: c } = st(), d = pe(null), [m, g] = Ee(!1), p = (S, y) => {
    $h.includes(S.type) && S.size <= y && t(S);
  }, v = (S) => {
    var b;
    const y = S.target;
    (b = y.files) != null && b.length && p(y.files[0], r);
  }, w = (S) => {
    var y;
    S.preventDefault(), g(!1), (y = S.dataTransfer) != null && y.files.length && p(S.dataTransfer.files[0], r);
  };
  return /* @__PURE__ */ E.jsx(Ih, { variant: "muted", withPadding: !1, className: "h-full", children: /* @__PURE__ */ E.jsxs(
    "div",
    {
      className: `flex h-full flex-col p-5 transition-colors ${m ? "bg-hello-csv-muted-light" : "bg-hello-csv-muted"}`,
      onClick: () => {
        var S;
        return (S = d.current) == null ? void 0 : S.click();
      },
      onDragOver: (S) => {
        S.preventDefault(), g(!0);
      },
      onDragEnter: () => g(!0),
      onDragLeave: () => g(!1),
      onDrop: (S) => w(S),
      children: [
        /* @__PURE__ */ E.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center", children: [
          /* @__PURE__ */ E.jsx(hC, { className: "text-hello-csv-primary h-12 w-12" }),
          /* @__PURE__ */ E.jsx("p", { className: "mt-3 text-center", children: u("uploader.dragAndDrop") }),
          /* @__PURE__ */ E.jsxs("div", { className: "mt-3 text-sm text-gray-500", children: [
            c("uploader.maxFileSizeInBytes", {
              size: /* @__PURE__ */ E.jsx("b", { children: iu(r) })
            }),
            " ",
            "• CSV, TSV"
          ] }),
          /* @__PURE__ */ E.jsx("div", { className: "mt-3", children: /* @__PURE__ */ E.jsx(pn, { children: u("uploader.browseFiles") }) }),
          i && /* @__PURE__ */ E.jsx("div", { className: "mt-3 text-sm", children: /* @__PURE__ */ E.jsx(
            "p",
            {
              onClick: a,
              className: "text-hello-csv-primary hover:text-hello-csv-primary cursor-pointer decoration-2 opacity-90 hover:underline focus:underline focus:outline-none",
              children: u("uploader.enterManually")
            },
            "manual-entry"
          ) })
        ] }),
        /* @__PURE__ */ E.jsx(
          "input",
          {
            ref: d,
            type: "file",
            accept: $h.join(","),
            style: { display: "none" },
            onChange: (S) => v(S)
          }
        )
      ]
    }
  ) });
}
function s5({
  sheets: t,
  onFileUploaded: i,
  onEnterDataManually: a,
  allowManualDataEntry: r,
  maxFileSizeInBytes: u
}) {
  const c = MT(t), { t: d } = st();
  return /* @__PURE__ */ E.jsxs("div", { className: "flex h-full flex-col space-y-4", children: [
    /* @__PURE__ */ E.jsx("div", { className: "flex-none text-2xl", children: d("uploader.uploadAFile") }),
    /* @__PURE__ */ E.jsx("div", { className: "flex-auto md:min-h-0", children: /* @__PURE__ */ E.jsxs("div", { className: "flex h-full flex-col-reverse gap-5 md:flex-row", children: [
      /* @__PURE__ */ E.jsx("div", { className: "h-full flex-1 lg:flex-1", children: /* @__PURE__ */ E.jsx(o5, { importerRequirements: c }) }),
      /* @__PURE__ */ E.jsx("div", { className: "flex-1 lg:flex-2", children: /* @__PURE__ */ E.jsx(
        u5,
        {
          setFile: i,
          allowManualDataEntry: r,
          onEnterDataManually: a,
          maxFileSizeInBytes: u
        }
      ) })
    ] }) })
  ] });
}
function c5({
  theme: t,
  onComplete: i,
  allowManualDataEntry: a,
  sheets: r = m2,
  onDataColumnsMapped: u,
  preventUploadOnValidationErrors: c,
  maxFileSizeInBytes: d = 20 * 1024 * 1024,
  // 20MB,
  customSuggestedMapper: m,
  onSummaryFinished: g,
  persistenceConfig: p = { enabled: !1 }
}) {
  const { t: v } = st(), w = pe(!0), S = pe(null), [y, b] = QT(r, p), {
    mode: R,
    currentSheetId: M,
    sheetData: N,
    columnMappings: j,
    parsedFile: $,
    validationErrors: B,
    importProgress: Y,
    importStatistics: Q
  } = y;
  Ve(() => {
    var V;
    if (w.current) {
      w.current = !1;
      return;
    }
    (V = S.current) == null || V.scrollIntoView({ behavior: "smooth" });
  }, [R]);
  const ee = N.find(
    (V) => V.sheetId === M
  ), O = r.find(
    (V) => V.id === M
  ), _ = (typeof c == "function" ? (c == null ? void 0 : c(B)) ?? !1 : c ?? !1) && B.length > 0;
  function k(V) {
    t5({
      file: V,
      onCompleted: async (I) => {
        const de = I.meta.fields, xe = m != null ? await m(r, de) : fR(r, de);
        b({
          type: "FILE_PARSED",
          payload: { parsed: I, rowFile: V }
        }), b({
          type: "COLUMN_MAPPING_CHANGED",
          payload: {
            mappings: xe
          }
        });
      }
    });
  }
  function U() {
    b({
      type: "ENTER_DATA_MANUALLY",
      payload: {
        amountOfEmptyRowsToAdd: s2
      }
    });
  }
  function te(V) {
    b({
      type: "COLUMN_MAPPING_CHANGED",
      payload: { mappings: V }
    });
  }
  async function se() {
    const V = uR(r, j ?? [], $), I = u != null ? await u(V) : V;
    b({ type: "DATA_MAPPED", payload: { mappedData: I } });
  }
  function ue(V) {
    b({ type: "CELL_CHANGED", payload: V });
  }
  function X(V) {
    b({ type: "REMOVE_ROWS", payload: V });
  }
  function W() {
    b({ type: "ADD_EMPTY_ROW" });
  }
  function Z() {
    b({ type: "RESET" });
  }
  async function K() {
    b({ type: "PROGRESS", payload: { progress: 0 } }), b({ type: "SUBMIT" });
    try {
      const V = Ff(
        r,
        N.map((de) => ({ ...de, rows: W2(de) }))
      ), I = await i(
        { ...y, sheetData: V },
        (de) => {
          b({ type: "PROGRESS", payload: { progress: de } });
        }
      );
      await Bh(400), b({ type: "PROGRESS", payload: { progress: 100 } }), await Bh(200), b({
        type: "COMPLETED",
        payload: { importStatistics: I ?? void 0 }
      });
    } catch {
      b({ type: "FAILED" });
    }
  }
  function ae() {
    b({ type: "PREVIEW" });
  }
  function re() {
    b({ type: "UPLOAD" });
  }
  function me() {
    b({ type: "MAPPING" });
  }
  return /* @__PURE__ */ E.jsx(KT, { theme: t, children: /* @__PURE__ */ E.jsxs(
    g2,
    {
      ref: S,
      className: `${R === "submit" || R === "failed" || R === "completed" ? "h-full" : ""}`,
      children: [
        R === "upload" && /* @__PURE__ */ E.jsx(
          s5,
          {
            sheets: r,
            onFileUploaded: k,
            onEnterDataManually: U,
            allowManualDataEntry: a,
            maxFileSizeInBytes: d
          }
        ),
        R === "mapping" && /* @__PURE__ */ E.jsx(
          wR,
          {
            parsed: $,
            sheetDefinitions: r,
            currentMapping: j ?? [],
            onMappingsChanged: te,
            onMappingsSet: se,
            onBack: re
          }
        ),
        R === "preview" && // TODO: Move these to separate component in future PR
        /* @__PURE__ */ E.jsxs("div", { className: "flex h-full flex-col", children: [
          /* @__PURE__ */ E.jsx("div", { className: "flex-none", children: /* @__PURE__ */ E.jsx(
            a5,
            {
              activeSheetId: M,
              sheetDefinitions: r,
              onSheetChange: (V) => b({ type: "SHEET_CHANGED", payload: { sheetId: V } }),
              validationErrors: B
            }
          ) }),
          /* @__PURE__ */ E.jsx("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ E.jsx(
            ET,
            {
              data: ee,
              allData: N,
              sheetDefinition: O,
              sheetValidationErrors: B.filter(
                (V) => V.sheetId === (O == null ? void 0 : O.id)
              ),
              setRowData: ue,
              removeRows: X,
              addEmptyRow: W,
              resetState: Z
            }
          ) }),
          /* @__PURE__ */ E.jsx("div", { className: "flex-none", children: ee.rows.length > 0 && /* @__PURE__ */ E.jsxs("div", { className: "mt-5 flex justify-between", children: [
            /* @__PURE__ */ E.jsx("div", { children: j != null && /* @__PURE__ */ E.jsx(i5, { onBackToMapping: me }) }),
            /* @__PURE__ */ E.jsx(
              ii,
              {
                tooltipText: v("importer.uploadBlocked"),
                hidden: !_,
                children: /* @__PURE__ */ E.jsx(pn, { onClick: K, disabled: _, children: v("importer.upload") })
              }
            )
          ] }) })
        ] }),
        (R === "submit" || R === "failed" || R === "completed") && /* @__PURE__ */ E.jsx(
          zT,
          {
            mode: R,
            progress: Y,
            onRetry: K,
            onBackToPreview: ae,
            resetState: Z,
            sheetData: N,
            statistics: Q,
            rowFile: y.rowFile,
            onSummaryFinished: g
          }
        )
      ]
    }
  ) });
}
function f5(t) {
  return /* @__PURE__ */ E.jsx(u2, { selectedLocale: t.locale, children: /* @__PURE__ */ E.jsx(c5, { ...t }) });
}
function y5(t, i) {
  R1.createRoot(t).render(ie.createElement(f5, i));
}
export {
  f5 as default,
  y5 as renderImporter
};
