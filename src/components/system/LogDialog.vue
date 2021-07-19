<template>
  <q-dialog v-model="fixed">
    <q-card>
      <q-card-section>
        <div class="text-h6">查看</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <vue-json-pretty :data="jsonData"> </vue-json-pretty>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="关闭" color="primary" @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  components: {
    VueJsonPretty
  },
  setup(props, context) {
    const fixed = ref(true)
    const jsonData = ref(null)
    jsonData.value = JSON.parse(
      '{"id":1,"createdTime":"2021-06-09 16:49:59","updatedTime":"2021-06-09 16:49:59","createdBy":{"id":1,"createdTime":null,"updatedTime":null,"createdBy":null,"updatedBy":null,"uid":"L7ceIEE0zVof","nickname":"superadmin","username":"superadmin","rawPassword":null,"smsCode":null,"phone":null,"email":null,"gender":null,"avatar":"http://static.tymetro.ltd/tymetro/Ty7y763h5x671fVijNccNMMuOEkM3o.png","newUsername":null,"enabled":true,"locked":false,"lastLoginIp":null,"roles":[],"captcha":null,"lastLoginTime":null,"passwordExpired":true,"department":null,"userBinds":[],"superAdmin":true,"admin":true},"updatedBy":null,"name":"a1","count":2,"discoveryTime":"2021-06-09 16:30:00","telephone":"18605711001","place":"h","status":"DRAFT","retrieve":false,"publishedTime":null,"revokedTime":null}'
    )

    const close = () => {
      context.emit('close')
    }
    return {
      fixed,
      jsonData,
      close
    }
  }
}
</script>

<style lang="scss" scoped></style>
