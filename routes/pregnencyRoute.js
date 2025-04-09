const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Pregnancy = require('../models/pregnency');
 
router.post('/', auth, async (req, res) => {
  try {
    const { week, age, systolicBP, diastolicBP, bloodSugar, bodyTemp, heartRate, insights, riskFactor } = req.body;

    const newPregnancy = new Pregnancy({
      user: req.user.id,
      week,
      age,
      systolicBP,
      diastolicBP,
      bloodSugar,
      bodyTemp,
      insights,
      heartRate,
      riskFactor
    });

    const pregnancy = await newPregnancy.save();
    res.json(pregnancy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const pregnancies = await Pregnancy.find({ user: req.user.id }).sort({ date: -1 });
    res.json(pregnancies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findById(req.params.id);
    
    if (!pregnancy) {
      return res.status(404).json({ msg: 'Pregnancy record not found' });
    }

    // Check user
    if (pregnancy.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(pregnancy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pregnancy record not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findById(req.params.id);
    
    if (!pregnancy) {
      return res.status(404).json({ msg: 'Pregnancy record not found' });
    }

    // Check user
    if (pregnancy.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await pregnancy.remove();
    res.json({ msg: 'Pregnancy record removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pregnancy record not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { week, age, systolicBP, diastolicBP, bloodSugar, bodyTemp, heartRate, riskFactor, insights } = req.body;

    let pregnancy = await Pregnancy.findById(req.params.id);
    
    if (!pregnancy) {
      return res.status(404).json({ msg: 'Pregnancy record not found' });
    }

    // Check user
    if (pregnancy.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    pregnancy = await Pregnancy.findByIdAndUpdate(
      req.params.id,
      { 
        week,
        age,
        systolicBP,
        diastolicBP,
        bloodSugar,
        bodyTemp,
        heartRate,
        insights,
        riskFactor,
        date: Date.now()
      },
      { new: true }
    );

    res.json(pregnancy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pregnancy record not found' });
    }
    res.status(500).send('Server Error');
  }
});


// Get latest pregnancy record with all vital data
router.get('/latest', auth, async (req, res) => {
  try {
   
    const latestPregnancy = await Pregnancy.findOne({ 
      user: req.user.id 
    }).sort({ date: -1 });
    
    if (!latestPregnancy) {
      return res.status(404).json({ msg: 'No pregnancy records found' });
    }

    // Get all records with the same week as the latest record
    const sameWeekRecords = await Pregnancy.find({
      user: req.user.id,
      week: latestPregnancy.week
    }).sort({ date: -1 });

    // Extract all vital data from the records
    const vitalData = {
      week: latestPregnancy.week,
      heartRates: sameWeekRecords.map(record => ({
        value: record.heartRate,
        date: record.date
      })),
      bloodSugarLevels: sameWeekRecords.map(record => ({
        value: record.bloodSugar,
        date: record.date
      })),
      bloodPressures: sameWeekRecords.map(record => ({
        systolic: record.systolicBP,
        diastolic: record.diastolicBP,
        date: record.date
      }))
    };

    res.json(vitalData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
