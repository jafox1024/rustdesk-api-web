<template>
  <div class="space-y-5">
    <el-card class="list-query shadow-sm rounded-lg border border-border-color">
      <el-form inline label-width="80px" class="flex flex-wrap items-center gap-4">
        <el-form-item :label="T('Username')">
          <el-input v-model="listQuery.username" class="w-40 rounded-md"></el-input>
        </el-form-item>
        <el-form-item class="flex gap-3">
          <el-button type="primary" @click="handlerQuery" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('Filter') }}</el-button>
          <el-button type="danger" @click="toAdd" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('Add') }}</el-button>
          <el-button type="success" @click="toExport" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('Export') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="list-body shadow-sm rounded-lg border border-border-color overflow-hidden">
      <el-table :data="listRes.list" v-loading="listRes.loading" border class="rounded-lg overflow-hidden">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" :label="T('Username')" align="center"/>
        <el-table-column prop="email" :label="T('Email')" align="center"/>
        <el-table-column prop="nickname" :label="T('Nickname')" align="center"/>
        <el-table-column :label="T('Group')" align="center">
          <template #default="{row}">
            <span v-if="row.group_id"> <el-tag class="rounded-md">{{ listRes.groups?.find(g => g.id === row.group_id)?.name }} </el-tag> </span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column :label="T('Status')" align="center">
          <template #default="{row}">
            <el-switch v-model="row.status"
                       :active-value="ENABLE_STATUS"
                       :inactive-value="DISABLE_STATUS"
                       @change="changeStatus(row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="T('Remark')" align="center"/>
        <el-table-column prop="created_at" :label="T('CreatedAt')" align="center"/>
        <el-table-column prop="updated_at" :label="T('UpdatedAt')" align="center"/>
        <el-table-column :label="T('Actions')" align="center" width="650">
          <template #default="{row}">
            <div class="table-actions flex flex-wrap gap-2">
              <el-button @click="toTag(row)" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('UserTags') }}</el-button>
              <el-button @click="toAddressBook(row)" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('UserAddressBook') }}</el-button>
              <el-button @click="toEdit(row)" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('Edit') }}</el-button>
              <el-button type="warning" @click="changePass(row)" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('ResetPassword') }}</el-button>
              <el-button type="danger" @click="remove(row)" class="rounded-md transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">{{ T('Delete') }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="list-page shadow-sm rounded-lg border border-border-color p-5">
      <el-pagination background
                     layout="prev, pager, next, sizes, jumper"
                     :page-sizes="[10,20,50,100]"
                     v-model:page-size="listQuery.page_size"
                     v-model:current-page="listQuery.page"
                     :total="listRes.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
  import { useRepositories, useDel, useToEditOrAdd, useChangePwd } from '@/views/user/composables'
  import { T } from '@/utils/i18n'
  import { DISABLE_STATUS, ENABLE_STATUS } from '@/utils/common_options'
  import { update } from '@/api/user'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { onMounted, watch } from 'vue'
  //列表
  const {
    listRes,
    listQuery,
    handlerQuery,
    getList,
    getGroups,
    toExport,
  } = useRepositories()

  onMounted(getGroups)

  onMounted(getList)

  watch(() => listQuery.page, getList)
  watch(() => listQuery.page_size, handlerQuery)

  const { toEdit, toAdd, toAddressBook, toTag } = useToEditOrAdd()

  const { changePass } = useChangePwd()

  //删除
  const { del } = useDel()
  const remove = async (row) => {
    const res = await del(row.id)
    if (res) {
      getList(listQuery)
    }
  }

  const changeStatus = async (row) => {
    /*const confirm = await ElMessageBox.confirm(T('Confirm?', { param: T('Update') }), {
      confirmButtonText: T('Confirm'),
      cancelButtonText: T('Cancel'),
    }).catch(_ => false)
    if (!confirm) {
      return false
    }*/
    const res = await update(row).catch(_ => false)
    if (res) {
      ElMessage.success(T('OperationSuccess'))
      getList(listQuery)
    }
  }

</script>

<style scoped>
</style>
