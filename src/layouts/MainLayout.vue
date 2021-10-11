<template>
  <q-header class="bg-white text-primary shadow-sm h-60px">
    <q-toolbar class="w-screen-xl m-auto h-60px">
      <span class="cursor-pointer text-xl text-gray-700" @click="router.push({ path: '/' })">
        Quasar App
      </span>

      <q-tabs v-model="tab" inline-label class="text-primary h-60px text-xl">
        <q-route-tab :ripple="false" to="/" name="homepage" label="Index" />
        <q-route-tab :ripple="false" to="/examples/icon" name="authority" label="Icon">
        </q-route-tab>
        <q-route-tab :ripple="false" to="/examples/badge" name="syslog" label="Badge">
        </q-route-tab>
        <q-tab :ripple="false" name="cat" label="Category">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Open...</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>New</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Preferences</q-item-section>
                <q-item-section side>
                  <q-icon name="arrow" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item v-for="n in 3" :key="n" clickable>
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="arrow" />
                      </q-item-section>
                      <q-menu auto-close anchor="top end" self="top start">
                        <q-list>
                          <q-item v-for="n in 3" :key="n" clickable>
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Quit</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-tab>
      </q-tabs>
    </q-toolbar>
  </q-header>

  <q-page-container class="no-padding w-screen-xl p-0 mx-auto bg-white mt-20">
    <router-view />
  </q-page-container>

  <q-footer class="static page-footer">
    <q-toolbar>
      <q-toolbar-title class="text-center text-body2 flex flex-center">
        Copyright
        <span class="copyright q-px-xs"
          ><svg
            viewBox="64 64 896 896"
            focusable="false"
            class="icon"
            data-icon="copyright"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"
            ></path></svg
        ></span>
        <span>powered by vue 3 based on vite</span>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter()
    const tab = ref('homepage')
    return {
      tab,
      router
    }
  }
})
</script>
<style lang="scss" scoped>
.page-container {
  flex: 1;
}
.page-footer {
  background: #f0f2f5;
  color: rgba(0, 0, 0, 0.45);
  .copyright {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
