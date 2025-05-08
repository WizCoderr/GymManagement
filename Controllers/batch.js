import Batch from '../Modals/batchs.js';
import Member from '../Modals/member.js';

export async function createBatch(req, res) {
    try {
        const { name, startTime, endTime, trainer, capacity, price } = req.body;
        
        const newBatch = new Batch({
            name,
            startTime,
            endTime,
            trainer,
            capacity,
            price,
            gym: req.gym._id
        });

        await newBatch.save();
        res.status(201).json({
            message: "Batch created successfully",
            batch: newBatch
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
}

export async function getAllBatches(req, res) {
    try {
        const batches = await Batch.find({gym: req.gym._id});

        console.log(batches);
        res.status(200).json({
            message: batches.length ? "Fetched batches successfully" : "No batches found",
            batches: batches
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
}

export async function addMembersToBatch(req, res) {
    try {
        const { batchId, members } = req.body;

        const batch = await Batch.findOne({ _id: batchId, gym: req.gym._id });
        if (!batch) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        // Create new member with batch reference
        const newMember = new Member({
            name: members[0].name,
            mobileNo: members[0].mobileNo,
            address: members[0].address,
            joiningDate: members[0].joiningDate,
            profilePic: members[0].profilePic,
            gym: req.gym._id,
            batch: batchId  // Add batch reference here
        });

        // Save the new member
        const savedMember = await newMember.save();

        // Add member to batch
        if (!Array.isArray(batch.members)) {
            batch.members = [];
        }

        batch.members.push(savedMember._id);
        batch.capacity -= 1; // Decrease capacity by 1
        batch.currentMembers += 1; // Increase current members by 1
        await batch.save();

        res.status(200).json({
            message: "Member added successfully",
            member: savedMember,
            batch: batch
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
}

export async function searchBatches(req, res) {
    try {
        const { searchTerm } = req.params;
        const regex = new RegExp(searchTerm, 'i');

        const batches = await Batch.find({
            gym: req.gym._id,
            name: { $regex: regex }
        });

        res.status(200).json({
            message: batches.length ? "Batches found" : "No batches found",
            batches
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}
export async function getBatchMembers(req, res) {
    try {
      const { batchId } = req.params;
  
      const batch = await Batch.findOne({
        _id: batchId,
        gym: req.gym._id,
      }).populate("members");
  
      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }
  
      const members = batch.members || [];
  
      console.log(`Members in batch ${batchId}:`, members);
  
      res.status(200).json({
        message: members.length ? "Members found" : "No members found",
        members: members
      });
  
    } catch (err) {
      console.log(`error fetching members for batch ${req.params.batchId}:`, err);
      res.status(500).json({ error: 'Server error' });
    }
}