db.Messages.aggregate([
    {
      $match: { text: { $regex: "паровоз", $options: "i" } }
    },
    {
      $count: "totalCount"
    }
  ])