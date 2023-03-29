import { u as useRouter, a as useUserStore, o as openBlock, c as createElementBlock, b as createBaseVNode, w as withDirectives, d as unref, e as withModifiers, v as vModelText } from "./index-faf2f8d7.js";
const EditView_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "form-container" };
const _hoisted_2 = ["onSubmit"];
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("label", { for: "firstName" }, "First Name:", -1);
const _hoisted_4 = ["placeholder"];
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("label", { for: "lastName" }, "Last Name:", -1);
const _hoisted_6 = ["placeholder"];
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("label", { for: "streetAddress" }, "Street Address:", -1);
const _hoisted_8 = ["placeholder"];
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("label", { for: "city" }, "City:", -1);
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("label", { for: "state" }, "State:", -1);
const _hoisted_12 = ["placeholder"];
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("label", { for: "zipCode" }, "Zip Code:", -1);
const _hoisted_14 = ["placeholder"];
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("input", {
  type: "submit",
  value: "submit"
}, null, -1);
const _sfc_main = {
  __name: "EditView",
  setup(__props) {
    const router = useRouter();
    const store = useUserStore();
    function submitEdits() {
      store.userInfo = userInfo;
      router.replace(`/`);
    }
    const userInfo = {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: ""
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("form", {
          onSubmit: withModifiers(submitEdits, ["prevent"])
        }, [
          _hoisted_3,
          withDirectives(createBaseVNode("input", {
            type: "text",
            name: "firstName",
            class: "form-input",
            placeholder: unref(store).userInfo.firstName,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => userInfo.firstName = $event)
          }, null, 8, _hoisted_4), [
            [vModelText, userInfo.firstName]
          ]),
          _hoisted_5,
          withDirectives(createBaseVNode("input", {
            type: "text",
            name: "lastName",
            class: "form-input",
            placeholder: unref(store).userInfo.lastName,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => userInfo.lastName = $event)
          }, null, 8, _hoisted_6), [
            [vModelText, userInfo.lastName]
          ]),
          _hoisted_7,
          withDirectives(createBaseVNode("input", {
            type: "text",
            name: "streetAddress",
            class: "form-input",
            placeholder: unref(store).userInfo.streetAddress,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => userInfo.streetAddress = $event)
          }, null, 8, _hoisted_8), [
            [vModelText, userInfo.streetAddress]
          ]),
          _hoisted_9,
          withDirectives(createBaseVNode("input", {
            type: "text",
            name: "city",
            class: "form-input",
            placeholder: unref(store).userInfo.city,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => userInfo.city = $event)
          }, null, 8, _hoisted_10), [
            [vModelText, userInfo.city]
          ]),
          _hoisted_11,
          withDirectives(createBaseVNode("input", {
            type: "text",
            name: "state",
            class: "form-input",
            placeholder: unref(store).userInfo.state,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => userInfo.state = $event)
          }, null, 8, _hoisted_12), [
            [vModelText, userInfo.state]
          ]),
          _hoisted_13,
          withDirectives(createBaseVNode("input", {
            type: "text",
            name: "zipCode",
            class: "form-input",
            placeholder: unref(store).userInfo.zipCode,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => userInfo.zipCode = $event)
          }, null, 8, _hoisted_14), [
            [vModelText, userInfo.zipCode]
          ]),
          _hoisted_15
        ], 40, _hoisted_2)
      ]);
    };
  }
};
export {
  _sfc_main as default
};
