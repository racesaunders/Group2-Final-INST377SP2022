/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';
// eslint-disable-next-line import/no-unresolved
import fetch from 'node-fetch';
// eslint-disable-next-line import/no-unresolved
import db from '../database/initializeDB.js';

const router = express.Router();

const dbQuery = 'SELECT * FROM park_name.park_admission;';

/* router.route('/park_admission').get(async (req, res) => {
  let result;
  try {
    result = await db.sequelizeDB.query(dbQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

router.get('/park_admission/:id', async (req, res) => {
  let result;
  try {
    result = await db.sequelizeDB.query(dbQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    console.log(result);
    const filt = result.filter((obj) => obj.park.id === req.params.id);
    res.send(filt);
  } catch (err) {
    console.log(err);
  }
});

router.post('/park_admission', async (req, res) => {
  try {
    const newParks = await db.park_admission.create({
      park_id: req.body.park_id,
      park_name: req.body.park_name,
      price_per_person: req.body.price_per_person
    });
    res.send('Park Added');
  } catch (err) {
    console.error(err);
  }
});
router.put('/park_admission', async (req, res) => {
  try {
    await db.park_admission.update(
      {
        park_name: req.body.park_name,
        price_per_person: req.body.price_per_person
      },
      {
        where: {
          park_id: req.body.park_id
        }
      }
    );
    res.send('Rating Successfully Updated');
  } catch (err) {
    console.error(err);
    res.send('Rating not found');
  }
});

router.delete('/park_admission/:park_id', async (req, res) => {
  try {
    console.log(req.params.park_id);
    await db.park_admission.destroy({
      where: {
        park_id: req.params.park_id
      }
    });
    res.send('Sucessfully Deleted');
  } catch (err) {
    console.error(err);
    res.send('Server Error');
  }
}); */

router.route('/anne/')
  .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(async (req, res) => {
    try {
      console.log('touched annes endpoint');
      const parks = await db.park_admission.findAll();
      const reply = parks.length > 0 ? { data: parks } : { message: 'no results found' };
      res.json(reply);
    } catch (err) {
      console.log('err');
      res.json({message: 'Server error'});
    }
  })
  .post(async (req, res) => {
    const parks = await db.park_admission.findAll();
    try {
      const newParks = await db.park_admission.create({
        park_id: req.body.park_id,
        park_name: req.body.park_name,
        price_per_person: req.body.price_per_person
      });
      res.json(newPark);
    } catch (err) {
      console.error(err);
      res.error('Server error');
    }
  });
router.put('/anne/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    await db.park_admission.update(
      {
        park_name: req.body.park_name,
        price_per_person: req.body.price_per_person
      },
      {
        where: {
          park_id: req.params.id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.delete('/anne/:id', async (req, res) => {
  try {
    await db.park_admission.destroy({
      where: {
        park_id: req.params.park_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

export default router;
