const db = require("../models");
const Pendaftaran = db.pendaftaran;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const pendaftaran = {
      nama: req.body.nama,
      jenis_kelamin: req.body.jenis_kelamin,
      ttl: req.body.ttl,
      agama: req.body.agama,
      jumlah_saudara: req.body.jumlah_saudara,
      alamat: req.body.alamat,
      no_telpon: req.body.no_telpon,
      email: req.body.email,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Tutorial in the database
    Pendaftaran.create(pendaftaran)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Pendaftaran."
        });
      });
  };
  exports.findAll = (req, res) => {
    const nama = req.query.nama;
    var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
  
    Pendaftaran.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pendaftaran."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Pendaftaran.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Pendaftaran with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Pendaftaran.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pendaftaran was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Pendaftaran with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Pendaftaran with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Pendaftaran.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pendaftaran was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Pendaftaran with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Pendaftaran with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Pendaftaran.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Pendaftaran were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all pendaftaran."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    Pendaftaran.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pendaftaran."
        });
      });
  };