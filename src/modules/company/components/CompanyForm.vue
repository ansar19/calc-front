<template>
  <div class="col-12">
    <div class='col-6'>

      <!-- <field
        id="fieldset-company_name"
        label="Company Name"
        message=""
      > -->

      <d-input trim id="company_name-input" :required="true" placeholder="Company Name" v-model="model.company_name">
      </d-input>
      <!-- </field> -->
    </div>

    <div class='col-6'>

      <!-- <field
        id="fieldset-bin_inn"
        label="Bin Inn"
        message=""
      > -->

      <d-input type="number" step="1" id="bin_inn-input" :required="true" placeholder="Bin Inn" v-model="model.bin_inn">
      </d-input>
      <!-- </field> -->
    </div>

    <div class='col-6'>

      <!-- <field
        id="fieldset-entity_type"
        label="Entity Type"
        message=""
      > -->

      <d-input trim id="company_entity-type" placeholder="Add a Entity Type" v-model="model.entity_type"></d-input>
      <!-- </field> -->
    </div>

    <div class='col-6'>

      <!-- <field
        id="fieldset-company_description"
        label="Company Description"
        message=""
      > -->

      <d-input trim id="company_description-input" :required="false" placeholder="Company Description" type="textarea"
        v-model="model.company_description"></d-input>
      <!-- </field> -->
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>

export default {
  name: 'CompanyForm',
  props: {
    model: {
      required: true,
    },
  },
  computed: {
  },
};
</script>
