---
title: Alert System Essentials
slug: /understanding-alert-systems
---

This tutorial explains how Csip.io's Alert System works
---

## Basics

### Alert Definition 
It is a predefined structure defining the rules surrounding the alert requirement.

### Alert Trigger

It specifies when the alert definition will be evaluated. Currently, only `property` sub entities can be used as alert triggers. When set, every time the given property is written, the alert attached to this property will be evaluated.

## Alert Incident

An incident represents a raised alert. Every time a device property attached to an alert is written, the system checks the alert condition with the given value. If the condition is met then an alert incident is created with the severity defined by this condition (except notification severity). If there are more than one condition met, the higher severity one is chosen automatically.

Only one incident per alert per device is allowed. Once an incident has been created it will notify users only when the lifetime severity of the incident (either `norm`, `warn` or `crit`) is increased (i.e. `norm->warn->crit`).

An alert incident can be cleared either (1) by a user manually (i.e. acknowledgement) or (2) when alert incident severity goes back to normal (i.e. `norm`) which means that the condition causing the incident does no longer exist.

When and incident is cleared all pending actions triggered by alert handlers will be canceled.

Note that condition types `warning` and `critical` are directly mapped to incident severity levels of warn and crit whereas condition type info is not considered an incident and should be executed every time the condition is met.

Each alert incident, acknowledgement or clear actions are recorded in the device log as `Alert` type and alert name.

Note that an alert incident can be in the following states: `active`, `ack` or `silenced` (reserved for future). The default state of an alert incident is `active`.

### Alert Check

Alert check represents a severity, condition (i.e. metric expression), and a list of handlers specifying the notification chain. When an alert condition evaluates positive (condition expression returns true) an alert is raised (alert incident created) with the corresponding severity, except notification(see above).

### Alert Severity

As the name suggest this is a classification of the alert's severity. It could have three values, `notification`, `warning` and `critical`.

Maximum one severity of each kind can co-exist. In other words, there can be maximum three checks in an alert definition.

> ### ❗️ IMPORTANT
> `notification` severity is considered a special case and acts differently than `warning` and `critical`. Unlike others, `notification` severity handlers are executed every time the given condition is met even when there is an active alert incident running.

This feature is useful for the cases when you want to send a `notification` to external parties every time the given condition is met.

Like other severity handlers, `notification` severity might have multiple handlers. But unlike others, when its condition is met, handlers are executed concurrently; not sequentially. `timeout` is ignored, only `next` is taken into account.

Unlike `warning` and `critical`, `notification` doesn't cause an alert incident creation.

> ### 📘 HINT
> You can use `notification` severity to pass incoming property data to external systems. We call this **pass-thru** feature.

## Alert Handler

Alert handler defines a notification chain to perform when an alert is raised. The chaining continues until the chain ends or the alert is acknowledged. At least one handler must be specified per alert check.

Following rules apply to notification chaining:

* If no `next` is provided the alert action chain finishes here and no other action will be taken.
* If no `timeout` is provided the next alert handler will be executed right away after this alert handler finishes to execute.
* In order to refer from one alert handler to another using `next` attribute, every alert handler should contain a key attribute which should be unique per check object.

### Notification

A notification defines an action to perform. Notifications are independent of each other and executed concurrently or sequentially as defined by Alert Handler.

### Action

Following actions are supported:

* ***email:*** send email to the given address list with a subject and message body.
* ***sms:*** send a text message to the given numbers with a predefined message body.
* ***webhook:*** make a post, put or get HTTP call to the given URL with given payload.
* ***log:*** log given message at device log.
* ***method:*** make a method call.

### Variables

Predefined variables can be used in message bodies to provide information about the condition raised the alert. This mechanism is not intelligent, performs simple text replacement. Variables are predefined keys whose name begins with $, and be surrounded by braces (ex: ${var})

Following variables can be used in notification messages or webhook URLs.

```
${alert.id} - alert id
${alert.name} - alert name
${account.id} - account id
${property.id} - property name
${property.name} - property name
${value} - the most recent value of the property
${last_value} - previous value of the property
${timestamp}- date and time of this event in ISO8601 format
${device.id} - device id
${device.name} - device name
```