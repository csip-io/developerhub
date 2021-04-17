---
title: Naming your entities
slug: /naming-your-entities
---

The following rules apply to entity names:

1. Names are case insensitive, i.e. "WindTurbine.Rotation" will be equal to "windturbine.rotation"
2. Whitespace is not allowed
3. Only alphanumeric characters, period “.”, dash “-”, and underscore “_” are allowed
4. Must start with a letter
5. Names can be maximum 64 characters long though you should try to keep the values fairly short

> ### ❗️ Exception
> Method names cannot contain period “.”

For example the following property names are considered valid:

* Ambient.Temp
* Ambient_Temp
* Ambient.Temp01

The following property names are not valid:

* Ambient Temp Sensor
* 0_Ambient.Temp
* _Ambient.Temp
* Ambient:Temp:Sensor

For example the following method names are considered valid:

* convertTempTo_F
* setDeviceState

The following method names are not valid:

* convert.Temp.F
* _setDeviceState