---
title: CannotDeleteProfileInUse
slug: /cannotdeleteprofileinuse
---

Profiles with existing instances (i.e. devices or apps) cannot be deleted. You must delete all instances including full hierarchy path, before you completely delete a profile.

> ## Beware of "IS A" Relationship

> Remember that inheritance creates a "IS A" relationship among the profiles. For example if you create a device profile hierarchy of "vehicle > car > sport car" , all devices inherited from "sport car" profile are also considered "car" and "vehicle". So, even if there are no direct instances of "vehicle" profile, all instances of "car" or "sport car" prevent "vehicle" profile from being deleted resulting with this error message.