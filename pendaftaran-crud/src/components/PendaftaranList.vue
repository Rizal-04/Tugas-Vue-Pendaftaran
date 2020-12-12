<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by nama"
          v-model="nama"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchNama"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Pendaftaran List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(pendaftaran, index) in pendaftaran"
          :key="index"
          @click="setActivePendaftaran(pendaftaran, index)"
        >
          {{ pendaftaran.nama }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPendaftaran">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPendaftaran">
        <h4>Pendaftaran</h4>
        <div>
          <label><strong>Nama:</strong></label> {{ currentPendaftaran.nama }}
        </div>
        <div>
          <label><strong>Jenis kelamin:</strong></label> {{ currentPendaftaran.jenis_kelamin }}
        </div>
        <div>
          <label><strong>Tempat,Tanggal lahir:</strong></label> {{ currentPendaftaran.ttl }}
        </div>
        <div>
          <label><strong>Agama:</strong></label> {{ currentPendaftaran.agama }}
        </div>
        <div>
          <label><strong>Jumlah Saudara:</strong></label> {{ currentPendaftaran.jumlah_saudara }}
        </div>
        <div>
          <label><strong>Alamat:</strong></label> {{ currentPendaftaran.alamat }}
        </div>
        <div>
          <label><strong>No Telpon:</strong></label> {{ currentPendaftaran.no_telpon }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentPendaftaran.email }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentPendaftaran.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/pendaftaran/' + currentPendaftaran.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Pendaftaran...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PendaftaranDataService from "../services/PendaftaranDataService";

export default {
  name: "pendaftaran-list",
  data() {
    return {
      pendaftaran: [],
      currentPendaftaran: null,
      currentIndex: -1,
      nama: ""
    };
  },
  methods: {
    retrievePendaftaran() {
      PendaftaranDataService.getAll()
        .then(response => {
          this.pendaftaran = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePendaftaran();
      this.currentPendaftaran = null;
      this.currentIndex = -1;
    },

    setActivePendaftaran(pendaftaran, index) {
      this.currentPendaftaran= pendaftaran;
      this.currentIndex = index;
    },

    removeAllPendaftaran() {
      PendaftaranDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchNama() {
      PendaftaranDataService.findByNama(this.nama)
        .then(response => {
          this.pendaftaran = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePendaftaran();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
