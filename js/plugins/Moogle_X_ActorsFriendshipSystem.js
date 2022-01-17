//=============================================================================
// Actors Friendship System by Moogle_X
// Modified by Solar Flare Games
// Moogle_X_ActorsFriendshipSystem.js
// Created on: November 12nd 2015
//
// Copyright 2015-2020 Moogle_X & Solar Flare Games
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// <http://www.apache.org/licenses/LICENSE-2.0>
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_AFS = true;

var Moogle_X = Moogle_X || {};
Moogle_X.AFS = Moogle_X.AFS || {};

//=============================================================================
/*:
@plugindesc v3.0.1 Adds friendship mechanic between actors.
@author Moogle_X & Solar Flare Games

@param defAllLeaders
@text Default All Leaders
@desc Make all actors become leaders by default.
@type boolean
@default true

@param defAllFriends
@text Default All Friends
@desc Make all actors become potential friends by default.
@type boolean
@default true

@param defMaxLevel
@text Default Max Level
@desc This is the default value for max Friendship Level for all actors.
@type number
@default 10

@param defExp
@text Default Exp for Level Up
@desc This is the default value for Friendship Points needed to level up.
@type number
@min 1
@default 20

@param battleFp
@text Battle Friendship Gain
@desc Friendship Points gained for each active party members to other leaders in battle party.
@type number
@default 1

@param battleLossMult
@text Battle Loss Multiplier
@desc Fraction of the normal FP gain that members receive if they lose or run from a battle. Can be negative.
@type number
@min -99
@max 99
@decimals 2
@default 0

@param canLevelDown
@text Allows Level Down
@desc Decide whether Friendship Level can decrease or not.
@type boolean
@default false

@param allowNegLevel
@text Allow Negative Level
@desc Whether to allow friendship level to become negative.
@type boolean
@default false

@param onMapItemFpGain
@text Map Item FP Gain
@desc Determines if you can gain Friendship Points when using an item on the map.
@type boolean
@default false

@param singleLeaderIdOnMap
@parent onMapItemFpGain
@text Leader ID for Map Items
@desc Determines which leader gains Friendship Points for using an item on the map.
@type actor
@default 0

@param Scene

@param singleLeaderScene
@text Use Single Leader Scene
@parent Scene
@desc Only the first leader's friend list will be shown.
@type boolean
@default false

@param showFpMenu
@text Show in Main Menu
@parent Scene
@desc Put "Show Friendship" scene command in main menu.
@type boolean
@default true

@param fpMenuSwitch
@text Show Menu Switch ID
@parent Scene
@desc Turning on the in-game switch with this ID will put scene command in main menu. Put 0 to ignore this feature.
@type switch
@default 0

@param fpEnableSwitch
@text Enable Menu Switch ID
@parent Scene
@desc Turning on the in-game switch with this ID will enable the scene command in main menu. Put 0 to ignore this feature.
@type switch
@default 0

@param fpTitle
@text Menu Vocab
@parent Scene
@desc Change the "Show Friendship" command name in main menu.
@default Friendship

@param helpText
@text Help Text
@parent Scene
@desc This is the text at the top of "Show Friendship" scene.
@type note
@default "View Friendship Data"

@param Window Leader List

@param leaderNameColor
@text Leader Name Color
@parent Window Leader List
@desc This is the color for actor's name in Window Leader List.
@type number
@default 0

@param showBackButton
@text Back Button
@parent Window Leader List
@desc Whether a "Back" button should be showin in the Window Leader List
@type boolean
@default true

@param backText
@text Back Text
@parent showBackButton
@desc Change the text for "Back" at the bottom of Window Leader List.
@default Back

@param backTextColor
@text Back Text Color
@parent showBackButton
@desc This is the color for "Back" at the bottom of Window Leader List.
@type number
@default 0

@param backIcon
@text Back Icon
@parent showBackButton
@desc Change the icon for "Back" at the bottom of Window Leader List. Put 0 for no icon.
@type text
@default 16

@param Window Friend List

@param maxRows
@text Maximum Number of Rows
@parent Window Friend List
@desc This is the maximum number of friends shown in the window. Adjust to suit your screen resolution.
@type number
@default 4

@param maxCols
@text Number of Columns
@parent Window Friend List
@desc This is the number of columns shown in the friends list. Adjust to suit your screen resolution and window settings.
@type number
@default 1

@param onSelect
@text Action on Select
@parent Window Friend List
@desc JavaScript code to be executed when you select an actor in the friends list. Reference the chosen actor ID as actor.
@type note
@default ""

@param showFace
@text Friend's Face
@parent Window Friend List
@desc Decide whether to draw actor's face in Window Friend List.
@type boolean
@default true

@param faceOffsetX
@text Offset X
@parent showFace
@desc Change the offset X value of actor's face in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param faceOffsetY
@text Offset Y
@parent showFace
@desc Change the offset Y value of actor's face in Window Friend List. (Positive: down; Negative: up)
@type number
@min -4000
@max 4000
@default 0

@param showName
@text Friend's Name
@parent Window Friend List
@desc Decide whether to draw actor's name in Window Friend List.
@type boolean
@default true

@param friendNameColor
@text Color
@parent showName
@desc This is the color for actor's name in Window Friend List.
@type number
@default 0

@param friendNameWidth
@text Width
@parent showName
@desc This is the rectangle width for actor's name in Window Friend List.
@type number
@default 168

@param friendNameAlignment
@text Alignment
@parent showName
@desc This is the text alignment for actor's name in Window Friend List.
@type select
@option left
@option center
@option right
@default left

@param friendNameOffsetX
@text Offset X
@parent showName
@desc Change the offset X value of actor's name in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param friendNameOffsetY
@text Offset Y
@parent showName
@desc Change the offset Y value of actor's name in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param Friendship Level
@parent Window Friend List

@param showLevelText
@text Label
@parent Friendship Level
@desc Decide whether to draw "Friendship Level" text in Window Friend List.
@type boolean
@default true

@param fpLvlText
@text Text
@parent showLevelText
@desc Change "Friendship Level" text in Window Friend List.
@default Friendship Level

@param fpLvlTextColor
@text Color
@parent showLevelText
@desc This is the color for "Friendship Level" text in Window Friend List.
@type number
@default 16

@param fpLvlTextWidth
@text Width
@parent showLevelText
@desc This is the rectangle width for "Friendship Level" text in Window Friend List.
@type nymber
@default 200

@param fpLvlTextAlignment
@text Alignment
@parent showLevelText
@desc This is the text alignment for "Friendship Level" text in Window Friend List.
@type select
@option left
@option center
@option right
@default left

@param fpLvlTextOffsetX
@text Offset X
@parent showLevelText
@desc Change the offset X value of "Friendship Level" text in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param fpLvlTextOffsetY
@text Offset Y
@parent showLevelText
@desc Change the offset Y value of "Friendship Level" text in Window Friend List. (Positive: down; Negative: up)
@min -9999
@max 9999
@default 0

@param showLevelNumber
@text Number
@parent Friendship Level
@desc Decide whether to draw "Friendship Level" number in Window Friend List.
@type boolean
@default true

@param fpLvlNumberColor
@text Color
@parent showLevelNumber
@desc This is the color for "Friendship Level" number in Window Friend List.
@type number
@default 0

@param fpLvlNumberWidth
@text Width
@parent showLevelNumber
@desc This is the rectangle width for "Friendship Level" number in Window Friend List.
@type number
@default 200

@param fpLvlNumberAlignment
@text Alignment
@parent showLevelNumber
@desc This is the text alignment for "Friendship Level" number in Window Friend List.
@type select
@option left
@option center
@option right
@default right

@param fpLvlNumberOffsetX
@text Offset X
@parent showLevelNumber
@desc Change the offset X value of "Friendship Level" number in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param fpLvlNumberOffsetY
@text Offset Y
@parent showLevelNumber
@desc Change the offset Y value of "Friendship Level" number in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param showGauge
@text Friendship Gauge
@parent Window Friend List
@desc Decide whether to draw Friendship Gauge in Window Friend List.
@type boolean
@default true

@param fpGaugeHeight
@text Height
@parent showGauge
@desc This is the height of Friendship Gauge in Window Friend List.
@type number
@default 18

@param fpGaugeWidth
@text Width
@parent showGauge
@desc This is the width of Friendship Gauge in Window Friend List.
@type number
@default 382

@param fpGaugeColor1
@text Color 1
@parent showGauge
@desc This is the gradient color 1 of Friendship Gauge.
@type number
@default 24

@param fpGaugeColor2
@text Color 2
@parent showGauge
@desc This is the gradient color 2 of Friendship Gauge.
@type number
@default 29

@param fpNegGaugeColor1
@text Negative Color 1
@parent showGauge
@desc This is the gradient color 1 of Friendship Gauge for negative levels.
@type number
@default 2

@param fpNegGaugeColor2
@text Negative Color 2
@parent showGauge
@desc This is the gradient color 2 of Friendship Gauge for negative levels.
@type number
@default 10

@param fpGaugeOffsetX
@text Offset X
@parent showGauge
@desc Change the offset X value of Friendship Gauge in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param fpGaugeOffsetY
@text Offset Y
@parent showGauge
@desc Change the offset Y value of Friendship Gauge in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param usePrettyGauges
@text Use Pretty Gauges Patch
@parent showGauge
@desc Activate compatibility patch for Rocketmancer's PrettyGauges plugin?
@type boolean
@default false

@param Current FP
@parent Window Friend List

@param showCurrentFpText
@text Label
@parent Current FP
@desc Decide whether to draw "Current FP" text in Window Friend List.
@type boolean
@default true

@param currentFpText
@text Text
@parent showCurrentFpText
@desc Change "Current FP" text in Window Friend List.
@default Current FP

@param currentFpTextColor
@text Color
@parent showCurrentFpText
@desc This is the color for "Current FP" text in Window Friend List.
@type number
@default 16

@param currentFpTextWidth
@text Width
@parent showCurrentFpText
@desc This is the rectangle width for "Current FP" text in Window Friend List.
@type number
@default 200

@param currentFpTextAlignment
@text Alignment
@parent showCurrentFpText
@desc This is the text alignment for "Current FP" text in Window Friend List.
@type select
@option left
@option center
@option right
@default left

@param currentFpTextOffsetX
@text Offset X
@parent showCurrentFpText
@desc Change the offset X value of "Current FP" text in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param currentFpTextOffsetY
@text Offset Y
@parent showCurrentFpText
@desc Change the offset Y value of "Current FP" text in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param showCurrentFpNumber
@text Number
@parent Current FP
@desc Decide whether to draw "Current FP" number in Window Friend List.
@type boolean
@default true

@param currentFpNumberColor
@text Color
@parent showCurrentFpNumber
@desc This is the color for "Current FP" number in Window Friend List.
@type number
@default 0

@param currentFpNumberWidth
@text Width
@parent showCurrentFpNumber
@desc This is the rectangle width for "Current FP" number in Window Friend List.
@type number
@default 200

@param currentFpNumberAlignment
@text Alignment
@parent showCurrentFpNumber
@desc This is the text alignment for "Current FP" number in Window Friend List.
@type select
@option left
@option center
@option right
@default right

@param currentFpNumberOffsetX
@text Offset X
@parent showCurrentFpNumber
@desc Change the offset X value of "Current FP" number in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param currentFpNumberOffsetY
@text Offset Y
@parent showCurrentFpNumber
@desc Change the offset Y value of "Current FP" Number in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param To Next Level
@parent Window Friend List

@param showNextLevelText
@parent To Next Level
@text Label
@desc Decide whether to draw "To Next Level" text in Window Friend List.
@type boolean
@default true

@param nextLevelText
@text Text
@parent showNextLevelText
@desc Change "To Next Level" text in Window Friend List.
@default To Next Level

@param nextLevelTextColor
@text Color
@parent showNextLevelText
@desc This is the color for "To Next Level" text in Window Friend List.
@type number
@default 16

@param nextLevelTextWidth
@text Width
@parent showNextLevelText
@desc This is the rectangle width for "To Next Level" text in Window Friend List.
@type number
@default 200

@param nextLevelTextAlignment
@text Alignment
@parent showNextLevelText
@desc This is the text alignment for "To Next Level" text in Window Friend List.
@type select
@option left
@option center
@option right
@default left

@param nextLevelTextAlignmenX
@text Offset X
@parent showNextLevelText
@desc Change the offset X value of "To Next Level" text in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param nextLevelTextAlignmenY
@text Offset Y
@parent showNextLevelText
@desc Change the offset Y value of "To Next Level" text in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param showNextLevelNumber
@text Number
@parent To Next Level
@desc Decide whether to draw "To Next Level" number in Window Friend List.
@type boolean
@default true

@param nextLevelNumberColor
@text Color
@parent showNextLevelNumber
@desc This is the color for "To Next Level" number in Window Friend List.
@option number
@default 0

@param nextLevelNumberWidth
@text Width
@parent showNextLevelNumber
@desc This is the rectangle width for "To Next Level" number in Window Friend List.
@option number
@default 200

@param nextLevelNumberAlignment
@text Alignment
@parent showNextLevelNumber
@desc This is the text alignment for "To Next Level" number in Window Friend List.
@type select
@option left
@option center
@option right
@default right

@param nextLevelNumberOffsetX
@text Offset X
@parent showNextLevelNumber
@desc Change the offset X value of "To Next Level" number in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param nextLevelNumberOffsetY
@text Offset Y
@parent showNextLevelNumber
@desc Change the offset Y value of "To Next Level" Number in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param Friendship Icons

@param fpIconsOffsetX
@text Offset X
@parent Friendship Icons
@desc Change the offset X value of "Friendship Icons" in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param fpIconsOffsetY
@text Offset Y
@parent Friendship Icons
@desc Change the offset Y value of "Friendship Icons" in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param defLockIcon
@text FP Lock Icon
@desc This is the default icon shown when actor is under FP Lock effect. Put 0 for no icon.
@type text
@default 4

@param fpLockOffsetX
@text Offset X
@parent defLockIcon
@desc Change the offset X value of "FP Lock Icon" in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param fpLockOffsetY
@text Offset Y
@parent defLockIcon
@desc Change the offset Y value of "FP Lock Icon" in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@param Custom Friend Icon

@param customFpIconOffsetX
@text Offset X
@parent Custom Friend Icon
@desc Change the offset X value of "Custom Friend Icon" in Window Friend List. (Positive: right; Negative: left)
@type number
@min -9999
@max 9999
@default 0

@param customFpIconOffsetX
@text Offset Y
@parent Custom Friend Icon
@desc Change the offset Y value of "Custom Friend Icon" in Window Friend List. (Positive: down; Negative: up)
@type number
@min -9999
@max 9999
@default 0

@help
============================================================================
Introduction
============================================================================
This plugin adds friendship mechanic between actors of your choice.
Each actor has their own Friendship Points that can be increased or decreased
multiple ways.

As their Friendship Points grows, that actor's Friendship Level may level up.
You can set some skills to be automatically learned at certain Friendship
Level.

There is also the option to store certain actor's Friendship Points or
Friendship Level into in-game variable. You can then use that variable's
value as a conditional trigger for new event, etc.

============================================================================
Single Leader vs Multiple Leaders
============================================================================
You are given a choice to go with Single Leader approach or Multiple Leaders
approach.

Single Leader means there is one actor who is the central of relationships.
This actor is usually the main protagonist of your game.
You can view other actors' Friendship Points towards this Leader, but you
cannot view their Friendship Points towards other actors.

Multiple Leaders approach take away this limitation. You can view all actors'
Friendship Points towards any actors that you tag as "Leader". You can make
all actors become Leader, or just a few of them. You can make all actors
become Friends, or just a few of them.

You can switch between the two modes during the game with the following
plugin commands:

AFS Set Mode Single Leader     // Switch to single leader mode
AFS Set Mode Multiple Leaders  // Switch to multiple leader mode

To make an actor become Leader, insert this notetag into his/her notebox:

<AFS Leader>

If you set all actors as leaders, this notetag are not required.

To make an actor bedome a Friend, insert this notetag into his/her notebox:

<AFS Friend>

If you set all actors as friends, this notetag is not required.

Actor's friendship value can be viewed in custom scene. You can access it
from the main menu or simply by using this plugin command:

AFS Open                       // Open Friendship Scene.

IMPORTANT!
There are 2 versions of Friendship Scene, Single Leader version and Multiple
Leaders version. Single Leader one only contains Window Friend List while
Multiple Leaders version contains both of Window Leader List and Window
Friend List.

To enable Single Leader version, simply turn on "Use Single Leader Scene"
option in the plugin configuration, or use the plugin command above.

If you use Yanfly's Main Menu Manager, you can add the friendship command to
the menu with the following settings:

Menu Name: Moogle_X.AFS.fpTitle
Menu Symbol: friendship
Menu Show: Moogle_X.AFS.shouldShowFpMenu()
Menu Enabled: Moogle_X.AFS.shouldEnableFpMenu();
Menu Main Bind: SceneManager.push.bind(Scene_ActorsFriendship)
The other fields can be left empty.

By default, no actor's friendship data will be shown. In order for it to
show up in the scene, you must first manually "unlock" that actor by using
these plugin commands:

AFS Show Leader x              // Show actor x in the leader list.
AFS Show Friend x Leader y     // Show actor x as friend in leader y's
*                               // friend list.

If you want to hide the "unlocked" leader or friend for some reason during
mid-game, simply use these plugin commands:

AFS Hide Leader x              // Hide actor x from the leader list.
AFS Hide Friend x Leader y     // Hide actor x from leader y's friend list.

============================================================================
Setting Up Friendship Level and Exp Requirements
============================================================================
Each actor has their own Max Friendship Level and Exp Requirements needed
for each level up.

You can go with the default value by editting the plugin configuration.
Or you can make each actor has their own Max Level and Exp Requirements by
inserting these notetags into the Actors' notebox:

<AFS Max Level: x>             // Maximum Friendship Level is x.
<AFS Exp: n1, n2, n3, n4, n5>  // First level up will require n1 FP, second
*                               // level up will require n2 FP, etc.

============================================================================
How to Increase Friendship Points
============================================================================
There are 3 methods to increase or decrease Friendship Points. The easiest
method is using plugin command. With plugin command, you can increase or
decrease actor's Friendship Points by certain amount.

AFS Gain x Friend y Leader z   // Increase actor y's FP towards Leader z
*                               // by x amount.
AFS Lose x Friend y Leader z   // Decrease actor y's FP towards Leader z
*                               // by x amount.

The second method is using skills and items. By default, all skills and
items increase actor's Friendship Points by 0 amount. You can change this by
inserting new notetags into the skill/item's notebox. The value can be
either positive or negative. You can make the same skill/item to have
different effects on different actors.

For example, the skill "Heal" with these notetags:

<AFS Gain 2: 5>
<AFS Gain 3: -10>
<AFS Gain Default: 1>

If the caster of this skill is a Leader, depending on who receive this
healing...

This "Heal" will increase Actor 2's FP (Friendship Points) towards this Leader
by 2, decrease Actor 3's FP towards this Leader by 10, and increase other
actors' FP towards this Leader by 1.
Items also share similar notetags.

The third and the last method to increase actor's FP is by having the actor
as one of the active battle members. All actors in active battle party will
gain certain amount of FP at the end of each battle (win only).
The FP amount can be changed in "Friendship Gain Each Battle" option in the
plugin configurations.

============================================================================
Friendship Skills
============================================================================
Actors are able to learn new skills when their Friendship Level is increased.
You need to set up what skills they learn by inserting notetags into their
respective noteboxes.

<AFS Skill x Leader y: n>

The above notetag means this actor will learn skill n when their Friendship
Level towards Leader y reach level x. If you want the actor learn more than
one skills at the same time, use this notetag instead:

<AFS Skill x Leader y: n1, n2, n3, n4, n5>

This actor will learn skills n1, n2, n3, n4, and n5 when their Friendship
Level towards Leader y reach level x.

If negative leadership levels are enabled, skills can be added for negative
levels. Such skills are added when the friend levels down, rather than up.

============================================================================
EXTRA feature! "Best Friend Skill(s)"
============================================================================
Actor can learn a new type of skill, called "Best Friend Skill".
Best Friend Skill will be automatically learn when these conditions are met:

1. The actor must have the necessary notetag in their notebox.

<AFS Max Skill Leader x: n>                   // Use it for one skill.
<AFS Max Skill Leader x: n1, n2, n3, n4, n5>  // Use this for multiple skills.

2. This actor Friendship Level towards Leader x must reach maximum level.
3. Leader x's Friendship Level towards this actor must ALSO reach maximum
   Level.

When the above conditions are met, this actor will learn skill n (or n1, n2,
n3, n4, n5). Keep in mind that only this actor will learn the skills.
If Leader x doesn't have any "Best Friend Skill" notetag, that Leader won't
learn anything.

If you want Leader x to learn "Best Friend Skill" as well, you must give
him/her the necessary notetag as well.

One thing to remember. If their Friendship Level is decreased (therefore
they are no longer "Max Level"), both actors will forget their Best Friend
Skills.

============================================================================
Global Level Cap
============================================================================
At any point in the game, you can put a Friendship Level restriction to all
actors in certain Leader's friend list. This "Global Level Cap" effect
can be applied by using a plugin command:

AFS Cap Leader x Level y             // Put Global Level Cap at level y to
*                                     // all actors in Leader x's friend list.

For example, if you use "AFS Cap Leader 2 Level 5" plugin command.
All actors in Leader 2's friend list cannot increase their Friendship Level
towards Leader 2 past level 5.

No matter how much FP they get, their Friendship Level towards this Leader
cannot reach level 6 or above.

IMPORTANT!!!
This Global Level Cap effect only works on any friends that currently has
Friendship Level 5 or lower. If there is one (or more) friend that already
reach level 6 or higher, this particular friend can still increase his/her
Friendship Level normally. In other word, this friend is unaffected by
Global Level Cap effect.

This situation can be used to your advantage depending on your game project.

Global Level Cap effect can be removed by using plugin command:

AFS Uncap Leader x               // Remove Global Level Cap effect from
*                                 // Leader x.

============================================================================
FP Lock Effect
============================================================================
You can give a FP Lock effect to certain friend in certain Leader's friend
list. Any friend that's affected by FP Lock effect cannot increase or
decrease his/her FP or Friendship Level towards a certain Leader.

This effect can be applied by using plugin command:

AFS Lock Friend x Leader y      // Friend x in Leader y's friend list will
*                                // receive FP Lock effect.

FP Lock has a special icon indicator beside the friend's name.
You can decide the default icon by editting the "Default Lock Icon" option
in the plugin configuration.

If you prefer some actors to use different icon, insert this notetag into
the actor's notebox:

<AFS Lock Icon: x>             // This actor's FP Lock Icon will be icon
*                               // with ID x.

If you dislike the default icon position, you can adjust the new position
by editting "FP Lock Icon Offset X" and "FP Lock Icon Offset Y" options in
the plugin configuration.

FP Lock effect can be removed anytime by using this plugin command:

AFS Unlock Friend x Leader y   // Remove FP Lock effect from friend x in
*                               // Leader y's friend list.

============================================================================
Extra Icons
============================================================================
This plugin allows you to add 3 new icon types to the Window Friend List.
All of these icons are merely visual. They do not have any gameplay impact.
You can use these icons as special indicator for some gameplay mechanics
unique to your game project.

1. Friendship Icons

This icon will show up in the window at certain Friendship Level. Each
actor can have different Friendship Icons with other actors or other Leader.
By default, these icons are located just above Friendship Gauge. Again, if
you dislike the default location, simply adjust "Friendship Icons Offset X"
and "Friendship Icons Offset Y" options in the plugin configuration.

You can adjust actor's Friendship Icons by inserting these notetags into
actor's notebox:

<AFS Icon Level x Leader y: n>   // Show icon n when this actor's Friendship
*                                 // Level towards Leader y is currently at
*                                 // level x.

If you want to show more than one icons, use this notetag instead:

<AFS Icon Level x Leader y: n1, n2, n3, n4, n5>    // Same as above, but more
*                                                   // icons at the same time.

2. Custom Friend Icon

This icon is by default located near the right most part of Friendship
Gauge. Icon position can changed by editting "Custom Friend Icon Offset X"
and "Custom Friend Icon Offset Y" in the plugin configuration.

Custom Friend Icon is only 1 icon. You cannot show more than one icons for
this icon type. To show Custom Friend Icon, simply use this plugin command:

AFS CFI x Friend y Leader z      // Friend y in Leader z's friend list will
*                                 // get icon with ID x.

It's up to you what kind of icon that you want to show up. This icon can
be used for special indicator or anything. If you want to remove the icon,
simply use this plugin command:

AFS CFI Remove Friend x Leader y   // Remove the Custom Friend Icon from
*                                   // friend x in Leader y's friend list.

3. Custom Leader Icon

This icon, unlike 2 icons above, is located in Window Leader List instead
of Window Friend List. It's located just to the right of Leader's name.
This icon is also merely visual. It doesn't have any gameplay impact.

To add this icon, simply use this plugin command:

AFS CLI x Leader y                 // Add icon x beside Leader y's name.

You can remove Custom Leader Icon anytime by using this plugin command:

AFS CLI Remove Leader x            // Remove Custom Leader Icon beside Leader
*                                   // x's name.

============================================================================
Friendship Common Event
============================================================================
You can also set up a certain common event to be run at specific Friendship
Level. This common event will be triggered automatically during Friendship
Level Up process. It does NOT triggered during "level down".

To set up Friendship Common Event, put this notetag inside Actor's notebox:

<AFS Event Level x Leader y: n>

When this actor's Friendship Level towards Leader y level up to level x,
common event n will be run.

Example:
<AFS Event Level 5 Leader 3: 10>

When this actor's Friendship Level towards Leader 3 is increased (level up)
to level 5. Commmon event with ID number 10 will be executed automatically.

If the target level is negative, and negative friendship levels are enabled,
then the event triggers during "level down" but does not trigger during
"level up".

============================================================================
Auto Passive States
============================================================================
You can set up certain states to be automatically applied to leaders or friends
when a certain friendship level is reached. If the friendship level drops again,
the state will be removed.

To add a state to a leader when an actor's friendship level towards them
reaches a certain level, put this notetag inside the leader Actor's notebox:

<AFS State Level x Friend y: n>

When Friend y's friendship level towards this Leader reaches x or above,
this Leader will automatically be permanently under the effect of state n.
This state cannot be removed by skills,

Example:
<AFS State Level 5 Friend 3: 10>

When Friend 3's friendship level towards this Leader reaches level 5 or higher,
this Leader will be affected by state 10.

To add a state to a friend when their friendship level towards a specific
leader reaches a certain level, put this notetag inside the Actor's notebox:

<AFS State Level x Leader y: n>

When this actor's friendship level towards Leader y reaches x or above,
this actor will automatically be permanently under the effect of state n.
This state cannot be removed by skills.

Example:
<AFS State Level 5 Leader 3: 10>

When this actor's friendship level towards Leader y reaches x or above,
this actor will be affected by state 10.

If the target level is negative, then the state is applied when the level
falls below the indicated level. Thus you can have "hatred" states if you
enable negative friendship levels.

States that the actor resists will not be applied. However, if they later
lose the resist to the state, then it will be applied. Thus you could have
a debuff that temporarily removes their passive state by adding a state
that makes them resist that state.

============================================================================
Notetags List
============================================================================
Actors Notetags:
<AFS Leader>
<AFS Friend>
<AFS Exp: n1, n2, n3, n4, n5>
<AFS Max Level: x>
<AFS Skill x Leader y: n>
<AFS Skill x Leader y: n1, n2, n3, n4, n5>
<AFS Max Skill Leader x: n>
<AFS Max Skill Leader x: n1, n2, n3, n4, n5>
<AFS Icon Level x Leader y: n>
<AFS Icon Level x Leader y: n1, n2, n3, n4, n5>
<AFS Lock Icon: x>
<AFS Event Level x Leader y: n>
<AFS State Level x Friend y: n>
<AFS State Level x Leader y: n>

Skills and Items Notetags:
<AFS Gain x: n>
<AFS Gain Default: n>

============================================================================
Plugin Commands List
============================================================================
AFS Open
AFS Show Leader x
AFS Hide Leader x
AFS Show Friend x Leader y
AFS Hide Friend x Leader y
AFS Gain x Friend y Leader z
AFS Lose x Friend y Leader z
AFS Level Up Friend x Leader y
AFS Level Down Friend x Leader y
AFS Level Set n Friend x Leader y
AFS Lock Friend x Leader y
AFS Unlock Friend x Leader y
AFS Cap Leader x Level y
AFS Uncap Leader x
AFS CLI x Leader y
AFS CLI Remove Leader x
AFS CFI x Friend y Leader z
AFS CFI Remove Friend x Leader y
AFS Set Mode Single Leader
AFS Set Mode Multiple Leaders

SPECIAL Plugin Commands!

AFS Var x FP Friend y Leader z
"Change variable x value to be equal to the total FP that actor y have
towards Leader z."
Or as a Control Variables Script Call:
$gameActors.actor(y).afsExp(z)

AFS Var x Level Friend y Leader z
"Change variable x value to be equal to the actor y's Friendship Level
towards Leader z."
Or as a Control Variables Script Call:
$gameActors.actor(y).afsLevel(z)

AFS Var x Best FP Leader y
"The engine will look at all the actors in Leader y's friend list. Then, it
will search the highest FP total among all these actors. The highest FP value
will be put inside variable x."
Or as a Control Variables Script Call:
$gameActors.actor(y).afsGetBestFp()

AFS Var x Best Level Leader y
"The engine will look at all the actors in Leader y's friend list. Then, it
will search the highest Friendship Level among all these actors. The highest
level will be put inside variable x."
Or as a Control Variables Script Call:
$gameActors.actor(y).afsGetBestLevel()

AFS Var x Best FP Friend Leader y
"The engine will look at all the actors in Leader y's friend list. Then, it
will search the highest FP total among all these actors. Then, it will check
which actor has the highest FP total. This actor ID will be put inside
variable x."
Or as a Control Variables Script Call:
$gameActors.actor(y).afsGetBestFpFriend()

AFS Var x Best Level Friend Leader y
"The engine will look at all the actors in Leader y's friend list. Then, it
will search the highest Friendship Level among all these actors. Then, it
will check which actor has the highest Friendship Level. This actor ID will
be put inside variable x."
Or as a Control Variables Script Call:
$gameActors.actor(y).afsGetBestLevelFriend()

============================================================================
Terms of Use
============================================================================
Free to use in both commercial and non-commercial project as long as credit
is given.

============================================================================
Change Log
============================================================================
Version 3.0 (SFG):
- Dropped compatibility with versions of RMMV before 1.6.1.
- Use new 1.5.x Plugin Manager features for the plugin parameters.
- Rewrote note tag parsing to use the "meta" property, reducing sensitivity to
  whitespace.
- Plugin commands are also case-insensitive now.
- Add an option to enable FP game when using items on the map, based on a patch
  by Moogle_X.
- Add a feature that grants automatic passive states to either the leader or
  the friend (or both) once they reach a certain friendship level.
- Auto passive states can be removed by adding a resist to the state.
- Negative friendship levels can be enabled. Common events, learned skills, and
  passive states should all work with negative friendship levels. There is no
  negative equivalent to the "Best Friend Skill", however.
- Support disabling the Back button in the leader list.
- The bug where images sometimes don't load should be fixed (applies to both
  leader icons and friend face images).
- Add a plugin command to switch between single and multiple leader mode partway
  through the game.
- Add a switch to disable (rather than hide) the friendship option in the menu.
- The help now lists the necessary settings to add the friendship option in
  Yanfly's Main Menu Manager.
- Add an option to show multiple columns in the friend list.
- Support multiple leaders with the single leadership view.
- Add an option to gain or lose FP when you lose or run from a battle.
- Made some changes that should greatly reduce the file size of saves made with
  AFS enabled.
- Add a bit more padding beside the actor heads in the leadership list
- Allow performing an arbitrary action when an actor is selected in the friend
  list.
- Add a plugin command to directly set an actor's friendship level.

Version 2.08:
- Added Shaz's fix for memory leak issue.

Version 2.07:
- Fixed multiple friendship common events bug (common events not stacking).

Version 2.06:
- FP Gain after battle now only occur during victory.
- Added option to "activate" Pretty Gauges compatibility patch inside plugin
  configuration.

Version 2.05:
- Added friendship common event feature.

Version 2.01:
- Fixed a game breaking bug when using Skill or Item with FP gain effect.

Version 2.0:
- A complete rewritten of the plugin. Introduced multiple leaders feature.
  Ton of new features added.

Version 1.0:
- Completed plugin.

*/
//=============================================================================

(function() { // IIFE

	//=============================================================================
	// Parameter Variables
	//=============================================================================

	Moogle_X.AFS.parameters = PluginManager.parameters('Moogle_X_ActorsFriendshipSystem');
	Moogle_X.AFS.defAllLeaders = JSON.parse(Moogle_X.AFS.parameters.defAllLeaders);
	Moogle_X.AFS.defAllFriends = JSON.parse(Moogle_X.AFS.parameters.defAllFriends);
	Moogle_X.AFS.defMaxLevel = Number(Moogle_X.AFS.parameters.defMaxLevel || 10);
	Moogle_X.AFS.defExp = Number(Moogle_X.AFS.parameters.defExp || 20);
	Moogle_X.AFS.defExp = Moogle_X.AFS.defExp > 0 ? Moogle_X.AFS.defExp : 1;
	Moogle_X.AFS.canLevelDown = JSON.parse(Moogle_X.AFS.parameters.canLevelDown);
	Moogle_X.AFS.battleFp = Number(Moogle_X.AFS.parameters.battleFp || 0);
	Moogle_X.AFS.battleLossMult = Number(Moogle_X.AFS.parameters.battleLossMult || 0);
	Moogle_X.AFS.singleLeaderScene = JSON.parse(Moogle_X.AFS.parameters.singleLeaderScene);
	Moogle_X.AFS.helpText = JSON.parse(Moogle_X.AFS.parameters.helpText || '""');
	Moogle_X.AFS.showFpMenu = JSON.parse(Moogle_X.AFS.parameters.showFpMenu);
	Moogle_X.AFS.fpTitle = String(Moogle_X.AFS.parameters.fpTitle || 'Friendship');
	Moogle_X.AFS.fpMenuSwitch = Number(Moogle_X.AFS.parameters.fpMenuSwitch || 0);
	Moogle_X.AFS.fpEnableSwitch = Number(Moogle_X.AFS.parameters.fpEnableSwitch || 0);
	Moogle_X.AFS.showBackButton = JSON.parse(Moogle_X.AFS.parameters.showBackButton);
	Moogle_X.AFS.backText = String(Moogle_X.AFS.parameters.backText || '');
	Moogle_X.AFS.backIcon = Number(Moogle_X.AFS.parameters.backIcon || 0);
	Moogle_X.AFS.maxRows = Number(Moogle_X.AFS.parameters.maxRows || 4);
	Moogle_X.AFS.maxCols = Number(Moogle_X.AFS.parameters.maxCols || 1);
	Moogle_X.AFS.onSelect = JSON.parse(Moogle_X.AFS.parameters.onSelect);
	Moogle_X.AFS.leaderNameColor = Number(Moogle_X.AFS.parameters.leaderNameColor || 0);
	Moogle_X.AFS.backTextColor = Number(Moogle_X.AFS.parameters.backTextColor || 0);
	Moogle_X.AFS.showFace = JSON.parse(Moogle_X.AFS.parameters.showFace);
	Moogle_X.AFS.faceOffsetX = Number(Moogle_X.AFS.parameters.faceOffsetX || 0);
	Moogle_X.AFS.faceOffsetY = Number(Moogle_X.AFS.parameters.faceOffsetY || 0);
	Moogle_X.AFS.showName = JSON.parse(Moogle_X.AFS.parameters.showName);
	Moogle_X.AFS.friendNameColor = Number(Moogle_X.AFS.parameters.friendNameColor || 0);
	Moogle_X.AFS.friendNameWidth = Number(Moogle_X.AFS.parameters.friendNameWidth || 168);
	Moogle_X.AFS.friendNameAlignment = String(Moogle_X.AFS.parameters.friendNameAlignment || 'left');
	Moogle_X.AFS.friendNameOffsetX = Number(Moogle_X.AFS.parameters.friendNameOffsetX || 0);
	Moogle_X.AFS.friendNameOffsetY = Number(Moogle_X.AFS.parameters.friendNameOffsetY || 0);
	Moogle_X.AFS.fpLvlText = String(Moogle_X.AFS.parameters.fpLvlText || '');
	Moogle_X.AFS.showLevelText = JSON.parse(Moogle_X.AFS.parameters.showLevelText);
	Moogle_X.AFS.fpLvlTextColor = Number(Moogle_X.AFS.parameters.fpLvlTextColor || 0);
	Moogle_X.AFS.fpLvlTextWidth = Number(Moogle_X.AFS.parameters.fpLvlTextWidth || 200);
	Moogle_X.AFS.fpLvlTextAlignment = String(Moogle_X.AFS.parameters.fpLvlTextAlignment || 'left');
	Moogle_X.AFS.fpLvlTextOffsetX = Number(Moogle_X.AFS.parameters.fpLvlTextOffsetX || 0);
	Moogle_X.AFS.fpLvlTextOffsetY = Number(Moogle_X.AFS.parameters.fpLvlTextOffsetY || 0);
	Moogle_X.AFS.showLevelNumber = JSON.parse(Moogle_X.AFS.parameters.showLevelNumber);
	Moogle_X.AFS.fpLvlNumberColor = Number(Moogle_X.AFS.parameters.fpLvlNumberColor || 0);
	Moogle_X.AFS.fpLvlNumberWidth = Number(Moogle_X.AFS.parameters.fpLvlNumberWidth || 40);
	Moogle_X.AFS.fpLvlNumberAlignment = String(Moogle_X.AFS.parameters.fpLvlNumberAlignment || 'right');
	Moogle_X.AFS.fpLvlNumberOffsetX = Number(Moogle_X.AFS.parameters.fpLvlNumberOffsetX || 0);
	Moogle_X.AFS.fpLvlNumberOffsetY = Number(Moogle_X.AFS.parameters.fpLvlNumberOffsetY || 0);
	Moogle_X.AFS.showGauge = JSON.parse(Moogle_X.AFS.parameters.showGauge);
	Moogle_X.AFS.fpGaugeColor1 = Number(Moogle_X.AFS.parameters.fpGaugeColor1 || 24);
	Moogle_X.AFS.fpGaugeColor2 = Number(Moogle_X.AFS.parameters.fpGaugeColor2 || 29);
	Moogle_X.AFS.fpNegGaugeColor1 = Number(Moogle_X.AFS.parameters.fpNegGaugeColor1 || 2);
	Moogle_X.AFS.fpNegGaugeColor2 = Number(Moogle_X.AFS.parameters.fpNegGaugeColor2 || 10);
	Moogle_X.AFS.fpGaugeWidth = Number(Moogle_X.AFS.parameters.fpGaugeWidth || 382);
	Moogle_X.AFS.fpGaugeHeight = Number(Moogle_X.AFS.parameters.fpGaugeHeight || 6);
	Moogle_X.AFS.fpGaugeOffsetX = Number(Moogle_X.AFS.parameters.fpGaugeOffsetX || 0);
	Moogle_X.AFS.fpGaugeOffsetY = Number(Moogle_X.AFS.parameters.fpGaugeOffsetY || 0);
	Moogle_X.AFS.currentFpText = String(Moogle_X.AFS.parameters.currentFpText || '');
	Moogle_X.AFS.showCurrentFpText = JSON.parse(Moogle_X.AFS.parameters.showCurrentFpText);
	Moogle_X.AFS.currentFpTextColor = Number(Moogle_X.AFS.parameters.currentFpTextColor || 0);
	Moogle_X.AFS.currentFpTextWidth = Number(Moogle_X.AFS.parameters.currentFpTextWidth || 200);
	Moogle_X.AFS.currentFpTextAlignment = String(Moogle_X.AFS.parameters.currentFpTextAlignment || 'left');
	Moogle_X.AFS.currentFpTextOffsetX = Number(Moogle_X.AFS.parameters.currentFpTextOffsetX || 0);
	Moogle_X.AFS.currentFpTextOffsetY = Number(Moogle_X.AFS.parameters.currentFpTextOffsetY || 0);
	Moogle_X.AFS.showCurrentFpNumber = JSON.parse(Moogle_X.AFS.parameters.showCurrentFpNumber);
	Moogle_X.AFS.currentFpNumberColor = Number(Moogle_X.AFS.parameters.currentFpNumberColor || 0);
	Moogle_X.AFS.currentFpNumberWidth = Number(Moogle_X.AFS.parameters.currentFpNumberWidth || 200);
	Moogle_X.AFS.currentFpNumberAlignment = String(Moogle_X.AFS.parameters.currentFpNumberAlignment || 'right');
	Moogle_X.AFS.currentFpNumberOffsetX = Number(Moogle_X.AFS.parameters.currentFpNumberOffsetX || 0);
	Moogle_X.AFS.currentFpNumberOffsetY = Number(Moogle_X.AFS.parameters.currentFpNumberOffsetY || 0);
	Moogle_X.AFS.nextLevelText = String(Moogle_X.AFS.parameters.nextLevelText || '');
	Moogle_X.AFS.showNextLevelText = JSON.parse(Moogle_X.AFS.parameters.showNextLevelText);
	Moogle_X.AFS.nextLevelTextColor = Number(Moogle_X.AFS.parameters.nextLevelTextColor || 0);
	Moogle_X.AFS.nextLevelTextWidth = Number(Moogle_X.AFS.parameters.nextLevelTextWidth || 200);
	Moogle_X.AFS.nextLevelTextAlignment = String(Moogle_X.AFS.parameters.nextLevelTextAlignment || 'left');
	Moogle_X.AFS.nextLevelTextOffsetX = Number(Moogle_X.AFS.parameters.nextLevelTextOffsetX || 0);
	Moogle_X.AFS.nextLevelTextOffsetY = Number(Moogle_X.AFS.parameters.nextLevelTextOffsetY || 0);
	Moogle_X.AFS.showNextLevelNumber = JSON.parse(Moogle_X.AFS.parameters.showNextLevelNumber);
	Moogle_X.AFS.nextLevelNumberColor = Number(Moogle_X.AFS.parameters.nextLevelNumberColor || 0);
	Moogle_X.AFS.nextLevelNumberWidth = Number(Moogle_X.AFS.parameters.nextLevelNumberWidth || 200);
	Moogle_X.AFS.nextLevelNumberAlignment = String(Moogle_X.AFS.parameters.nextLevelNumberAlignment || 'right');
	Moogle_X.AFS.nextLevelNumberOffsetX = Number(Moogle_X.AFS.parameters.nextLevelNumberOffsetX || 0);
	Moogle_X.AFS.nextLevelNumberOffsetY = Number(Moogle_X.AFS.parameters.nextLevelNumberOffsetY || 0);
	Moogle_X.AFS.fpIconsOffsetX = Number(Moogle_X.AFS.parameters.fpIconsOffsetX || 0);
	Moogle_X.AFS.fpIconsOffsetY = Number(Moogle_X.AFS.parameters.fpIconsOffsetY || 0);
	Moogle_X.AFS.defLockIcon = Number(Moogle_X.AFS.parameters.defLockIcon || 0);
	Moogle_X.AFS.fpLockOffsetX = Number(Moogle_X.AFS.parameters.fpLockOffsetX || 0);
	Moogle_X.AFS.fpLockOffsetY = Number(Moogle_X.AFS.parameters.fpLockOffsetX || 0);
	Moogle_X.AFS.customFpIconOffsetX = Number(Moogle_X.AFS.parameters.customFpIconOffsetX || 0);
	Moogle_X.AFS.customFpIconOffsetY = Number(Moogle_X.AFS.parameters.customFpIconOffsetY || 0);
	Moogle_X.AFS.usePrettyGauges = JSON.parse(Moogle_X.AFS.parameters.usePrettyGauges);
	Moogle_X.AFS.onMapItemFpGain = JSON.parse(Moogle_X.AFS.parameters.onMapItemFpGain);
	Moogle_X.AFS.singleLeaderIdOnMap = Number(Moogle_X.AFS.parameters.singleLeaderIdOnMap);
	Moogle_X.AFS.allowNegLevel = JSON.parse(Moogle_X.AFS.parameters.allowNegLevel);
	
	Moogle_X.AFS.shouldShowFpMenu = function() {
		if(Moogle_X.AFS.showFpMenu) {
			if(Moogle_X.AFS.fpMenuSwitch === 0) {
				return true;
			} else if(Moogle_X.AFS.fpMenuSwitch > 0 && $gameSwitches.value(Moogle_X.AFS.fpMenuSwitch)) {
				return true;
			}
		}
		return false;
	};
	
	Moogle_X.AFS.shouldEnableFpMenu = function() {
		if(Moogle_X.AFS.fpEnableSwitch === 0) {
			return true;
		} else if(Moogle_X.AFS.fpEnableSwitch > 0 && $gameSwitches.value(Moogle_X.AFS.fpEnableSwitch)) {
			return true;
		}
		return false;
	};

	//=============================================================================
	// DataManager
	//=============================================================================

	Moogle_X.AFS.DatabaseLoaded = false;
	Moogle_X.AFS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
		if(!Moogle_X.AFS.DataManager_isDatabaseLoaded.call(this)) return false;
		if(!Moogle_X.AFS.DatabaseLoaded) {
			DataManager.readNotetags_AFS1($dataActors);
			DataManager.readNotetags_AFS2($dataItems);
			DataManager.readNotetags_AFS2($dataSkills);
			Moogle_X.AFS.DatabaseLoaded = true;
		}
		return true;
	};
	
	const ensurePathExists = function(obj, ...args) {
		if(args.length == 0) return;
		var prop = args[0];
		obj[prop] = obj[prop] || {};
		ensurePathExists(obj[prop], ...args.slice(1));
	};

	DataManager.readNotetags_AFS1 = function(group) {
		for(var n = 1; n < group.length; n++) {
			var obj = group[n];

			obj.isAfsLeader = Moogle_X.AFS.defAllLeaders;
			obj.isAfsFriend = Moogle_X.AFS.defAllFriends;
			obj.afsExpChart = [];
			obj.afsMaxLevel =
				Moogle_X.AFS.defMaxLevel > 0 ? Moogle_X.AFS.defMaxLevel : 1;
			obj.afsMaxSkills = {};
			obj.afsLockIcon = Moogle_X.AFS.defLockIcon;
			obj.afsLeaderStates = [];
			obj.afsFriendStates = [];

			for(var [note, value] of Object.entries(obj.meta || {})) {
				let parts = note.toUpperCase().split(/\s+/);
				if(parts[0] !== 'AFS') continue;

				if(parts[1] === 'LEADER') {
					obj.isAfsLeader = true;
				} else if(parts[1] === 'FRIEND') {
					obj.isAfsFriend = true;
				} else if(parts[1] == 'EXP') {
					var array = JSON.parse('[' + value + ']');
					obj.afsExpChart = obj.afsExpChart.concat(array);

				} else if(parts[1] === 'MAX' && parts[2] === 'LEVEL') {
					var maxLevel = Number(value);
					obj.afsMaxLevel = maxLevel > 0 ? maxLevel : 1;

				} else if(parts[1] === 'SKILL' && parts[3] === 'LEADER') {
					var level = Number(parts[2]);
					var leader = Number(parts[4]);
					var list = JSON.parse('[' + value + ']');
					ensurePathExists(obj, 'afsSkills', leader);
					obj.afsSkills[leader][level] = list;

				} else if(parts[1] === 'MAX' && parts[2] === 'SKILL' && parts[3] === 'LEADER') {
					var bestFriend = Number(parts[4]);
					var maxList = JSON.parse('[' + value + ']');
					obj.afsMaxSkills[bestFriend] = maxList;

				} else if(parts[1] === 'ICON' && parts[2] === 'LEVEL' && parts[4] === 'LEADER') {
					var iconLevel = Number(parts[3]);
					var iconLeader = Number(parts[5]);
					var iconList = JSON.parse('[' + value + ']');
					ensurePathExists(obj, 'afsIcons', iconLeader);
					obj.afsIcons[iconLeader][iconLevel] = iconList;

				} else if(parts[1] === 'LOCK' && parts[2] === 'ICON') {
					var lockIconId = Number(value);
					obj.afsLockIcon = lockIconId;

				} else if(parts[1] === 'EVENT' && parts[2] === 'LEVEL' && parts[4] === 'LEADER') {
					var ceLevel = Number(parts[3]);
					var ceLeaderId = Number(parts[5]);
					var ceId = Number(value);
					ensurePathExists(obj, 'afsCommonEvents', ceLeaderId);
					obj.afsCommonEvents[ceLeaderId][ceLevel] = ceId;
					
				} else if(parts[1] === 'STATE' && parts[2] === 'LEVEL' && parts[4] === 'LEADER') {
					obj.afsFriendStates.push({
						state: Number(value),
						level: Number(parts[3]),
						leader: Number(parts[5]),
					});
					
				} else if(parts[1] === 'STATE' && parts[2] === 'LEVEL' && parts[4] === 'FRIEND') {
					obj.afsLeaderStates.push({
						state: Number(value),
						level: Number(parts[3]),
						friend: Number(parts[5]),
					});
				}
			}
			
			if(obj.isAfsLeader) {
				for(var i = 1; i < group.length; i++) {
					ensurePathExists(group[i], 'afsSkills', n);
					ensurePathExists(group[i], 'afsIcons', n);
					ensurePathExists(group[i], 'afsCommonEvents', n);
				}
			}
		}
	};

	DataManager.readNotetags_AFS2 = function(group) {
		for(var n = 1; n < group.length; n++) {
			var obj = group[n];

			obj.afsGain = {};

			if(!obj.meta) continue;
			for(var [note, value] of Object.entries(obj.meta)) {
				let parts = note.toUpperCase().split(/\s+/);
				if(parts[0] !== 'AFS') continue;

				if(parts[1] === 'GAIN' && parts[2] !== 'DEFAULT') {
					var actorId = Number(parts[2]);
					var gain = Number(value);
					obj.afsGain[actorId] = gain;
				} else if(parts[1] === 'GAIN' && parts[2] === 'DEFAULT') {
					var defaultGain = Number(value);
					obj.afsGain["default"] = defaultGain;
				}
			}
		}
	};

	//=============================================================================
	// SceneManager
	//=============================================================================

	Moogle_X.AFS.SceneManager_updateScene = SceneManager.updateScene;
	SceneManager.updateScene = function() {
		Moogle_X.AFS.SceneManager_updateScene.call(this);
		if(this._scene) {
			if(this.isCurrentSceneStarted()) {
				if($gameTemp) {
					$gameTemp.afsCeUpdate();
				}
			}
		}
	};

	//=============================================================================
	// Game_Temp
	//=============================================================================

	Moogle_X.AFS.Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		Moogle_X.AFS.Game_Temp_initialize.call(this);
		this._afsCommonEvent = [];
	};

	Game_Temp.prototype.afsCeUpdate = function() {
		if(!this.isCommonEventReserved() && this._afsCommonEvent.length > 0) {
			this.reserveCommonEvent(this._afsCommonEvent.shift());
		}
	};

	Game_Temp.prototype.afsReserveCommonEvent = function(commonEventId) {
		this._afsCommonEvent.push(commonEventId);
	};

	//=============================================================================
	// Game_BattlerBase
	//=============================================================================

	Game_BattlerBase.prototype.isAfsLeader = function() {
		return false; // Initialize value for Game_Enemy.
	};

	//=============================================================================
	// Game_Actor
	//=============================================================================

	Moogle_X.AFS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		Moogle_X.AFS.Game_Actor_initMembers.call(this);
		this._isAfsFriend = false;
		this._isAfsLeader = false;
	};

	Moogle_X.AFS.Game_Actor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function(actorId) {
		Moogle_X.AFS.Game_Actor_setup.call(this, actorId);
		this.initAfsLeaderSetup();
		this.initAfsExpSetup();
		this.initAfsSkills();
	};
	
	Moogle_X.AFS.Game_Actor_isStateAffected = Game_Actor.prototype.isStateAffected
	const call_super_isStateAffected = Game_Actor.prototype.isStateAffected == Game_Battler.prototype.isStateAffected;
	Game_Actor.prototype.isStateAffected = function(stateId) {
		var affected = (call_super_isStateAffected ? Moogle_X.AFS.Game_Actor_isStateAffected : Game_Battler.prototype.isStateAffected).call(this, stateId);
		if(!this._isAfsFriend && !this._isAfsLeader) return affected;
		return affected || this.isAfsStateActiveForFriendship(stateId);
	};
	
	var recursion_guard = false;
	Moogle_X.AFS.Game_Actor_states = Game_Actor.prototype.states;
	var call_super_getStates = Game_Actor.prototype.states == Game_BattlerBase.prototype.states;
	Game_Actor.prototype.states = function() {
		var affected = call_super_getStates ? Game_Battler.prototype.states.call(this) : Moogle_X.AFS.Game_Actor_states.call(this);
		if(recursion_guard || (!this._isAfsFriend && !this._isAfsLeader)) return affected;
		for(let stateId of this.afsActiveStates()) {
			recursion_guard = true;
			try {
				if(!this.isStateResist(stateId)) {
					affected.push($dataStates[stateId]);
				}
			} finally {
				recursion_guard = false;
			}
		}
		return affected;
	};
	
	
	Game_Actor.prototype.isAfsStateActiveForFriendship = function(stateId) {
		if(this.isStateResist(stateId) || (!this._isAfsFriend && !this._isAfsLeader)) return false;
		return this.afsActiveStates().includes(stateId);
	};
	
	Game_Actor.prototype.afsActiveStates = function() {
		if(!this._isAfsFriend && !this._isAfsLeader) return [];
		var activeStates = this.actor().afsFriendStates.filter(function({level, leader}) {
			let fpLevel = this.afsLevel(leader);
			if(Math.sign(fpLevel) !== Math.sign(level)) return false;
			return Math.abs(fpLevel) >= Math.abs(level);
		}.bind(this)).map(info => info.state)
		if(this.isAfsLeader()) {
			activeStates = activeStates.concat(this.actor().afsLeaderStates.filter(function({level, friend}) {
				let fpLevel = 0, leader = this.actorId();
				if($gameActors._data[friend]) {
					fpLevel = $gameActors.actor(friend).afsLevel(leader);
				}
				if(Math.sign(fpLevel) !== Math.sign(level)) return false;
				return Math.abs(fpLevel) >= Math.abs(level);
			}.bind(this)).map(info => info.state));
		}
		return activeStates;
	};

	Game_Actor.prototype.initAfsLeaderSetup = function() {
		this._isAfsLeader = this.actor().isAfsLeader;
		this._isAfsFriend = this.actor().isAfsFriend;
		if(this.isAfsLeader()) {
			this._afsLeaderShow = false;      // Show in leader menu.
			this._afsFriendList = [];         // List of actors show up in the scene.
			this._afsGlobalCap = 0;
			this._afsCustomLeaderIcon = 0;
		}
		if(this.isAfsFriend()) {
			this._afsLock = {};
			this._afsCustomFpIcon = {};
		}
	};

	Game_Actor.prototype.applyAfsGlobalCap = function(levelCap) {
		this._afsGlobalCap = levelCap;
	};

	Game_Actor.prototype.removeAfsGlobalCap = function() {
		this._afsGlobalCap = 0;
	};

	Game_Actor.prototype.isAfsGlobalCap = function() {
		return this._afsGlobalCap !== 0;
	};

	Game_Actor.prototype.afsGlobalCap = function() {
		return this._afsGlobalCap;
	};

	Game_Actor.prototype.isAfsLock = function(leaderId) {
		if(!this.isAfsFriend()) return false;
		return !!this._afsLock[leaderId];
	};

	Game_Actor.prototype.applyAfsLock = function(leaderId) {
		if(!this.isAfsFriend()) return false;
		this._afsLock[leaderId] = true;
	};

	Game_Actor.prototype.removeAfsLock = function(leaderId) {
		if(!this.isAfsFriend()) return false;
		this._afsLock[leaderId] = false;
	};

	Game_Actor.prototype.afsShowLeader = function() {
		if(this.isAfsLeader()) {
			this._afsLeaderShow = true;
		}
	};

	Game_Actor.prototype.afsHideLeader = function() {
		this._afsLeaderShow = false;
	};

	Game_Actor.prototype.initAfsExpSetup = function() {
		if(!this.isAfsFriend()) return;

		this._afsExp = {};
		this._afsLevel = {};
		this._afsMaxLevel = this.actor().afsMaxLevel;
	};

	Game_Actor.prototype.isAfsLeader = function() {
		return this._isAfsLeader;
	};

	Game_Actor.prototype.isAfsFriend = function() {
		return this._isAfsFriend;
	};
	
	Game_Actor.prototype.isAfsLeaderVisible = function() {
		return this.isAfsLeader() && this._afsLeaderShow;
	};

	Game_Actor.prototype.afsExp = function(leaderId) {
		if(!this.isAfsFriend()) return 0;
		return this._afsExp[leaderId] || 0;
	};
	
	Game_Actor.prototype.afsExpChart = function() {
		var expChart = this.actor().afsExpChart;
		for(var i = expChart.length; i < this._afsMaxLevel; i++) {
			expChart.push(Moogle_X.AFS.defExp);
		}
		return expChart;
	};

	Game_Actor.prototype.afsLevel = function(leaderId) {
		if(!this.isAfsFriend()) return 0;
		return this._afsLevel[leaderId] || 0;
	};
	
	Game_Actor.prototype.afsSkills = function(leaderId, level) {
		return this.actor().afsSkills[leaderId][level] || [];
	};
	
	Game_Actor.prototype.afsMaxSkills = function(leaderId) {
		return this.actor().afsMaxSkills[leaderId] || [];
	};

	Game_Actor.prototype.initAfsSkills = function() {
		if(!this._isAfsFriend) return;

		for(var i = 1; i < $dataActors.length; i++) {
			if($dataActors[i].isAfsLeader)
				this.learnAfsSkill(0, i);
		}
	};

	Game_Actor.prototype.learnAfsSkill = function(level, leaderId) {
		if(!this.isAfsFriend()) return;
		this.afsSkills(leaderId, level).forEach(function(skillId) {
			this.learnSkill(skillId);
		}, this);
	};

	Game_Actor.prototype.forgetAfsSkill = function(level, leaderId) {
		if(!this.isAfsFriend()) return;
		this.afsSkills(leaderId, level).forEach(function(skillId) {
			this.forgetSkill(skillId);
		}, this);
	};

	Game_Actor.prototype.isMaxAfsLevel = function(leaderId) {
		if(!this.isAfsFriend()) return true;
		return this.afsLevel(leaderId) >= this._afsMaxLevel;
	};

	Game_Actor.prototype.isMinAfsLevel = function(leaderId) {
		if(!this.isAfsFriend()) return true;
		return  this.afsLevel(leaderId) <= (Moogle_X.AFS.allowNegLevel ? -this._afsMaxLevel : 0);
	};

	Game_Actor.prototype.afsLevelUp = function(leaderId) {
		if(!this.isAfsFriend()) return;
		this._afsLevel[leaderId] = this._afsLevel[leaderId] || 0;
		if(!this.isMaxAfsLevel(leaderId)) {
			this._afsLevel[leaderId]++;
			if(this.afsLevel(leaderId) >= 0) {
				this.learnAfsSkill(this.afsLevel(leaderId), leaderId);
				this.learnAfsMaxSkill(leaderId);
			} else {
				this.forgetAfsSkill(this.afsLevel(leaderId), leaderId);
			}
			this.refresh();
			if(this._afsLevel[leaderId] > 0)
				this.afsRunCommonEvent(leaderId, this._afsLevel[leaderId]);
		}
	};

	Game_Actor.prototype.afsLevelDown = function(leaderId) {
		if(!this.isAfsFriend()) return;
		this._afsLevel[leaderId] = this._afsLevel[leaderId] || 0;
		if(!this.isMinAfsLevel(leaderId) && Moogle_X.AFS.canLevelDown) {
			this._afsLevel[leaderId]--;
			if(this.afsLevel(leaderId) >= 0) {
				this.forgetAfsSkill(this.afsLevel(leaderId) + 1, leaderId);
				this.forgetAfsMaxSkill(leaderId);
			} else {
				this.learnAfsSkill(this.afsLevel(leaderId), leaderId);
			}
			if(this._afsLevel[leaderId] < 0)
				this.afsRunCommonEvent(leaderId, this._afsLevel[leaderId]);
		}
		this.refresh();
	};

	Game_Actor.prototype.learnAfsMaxSkill = function(leaderId) {
		if(!this.isAfsFriend()) return;
		var bestFriend = $gameActors.actor(leaderId);
		if(this.isAfsLeader() && bestFriend.isAfsLeader()) {
			if(this.isMaxAfsLevel(leaderId) &&
				bestFriend.isMaxAfsLevel(this.actorId())) {
				this.learnBestFriendSkill(leaderId);
				$gameActors.actor(leaderId).learnBestFriendSkill(this.actorId());
			}
		}
	};

	Game_Actor.prototype.forgetAfsMaxSkill = function(leaderId) {
		if(!this.isAfsFriend()) return;
		var bestFriend = $gameActors.actor(leaderId);
		if(this.isAfsLeader() && bestFriend.isAfsLeader()) {
			if(!this.isMaxAfsLevel(leaderId) ||
				!bestFriend.isMaxAfsLevel(this.actorId())) {
				this.forgetBestFriendSkill(leaderId);
				$gameActors.actor(leaderId).forgetBestFriendSkill(this.actorId());
			}
		}
	};

	Game_Actor.prototype.learnBestFriendSkill = function(leaderId) {
		if(!this.isAfsFriend()) return;
		this.afsMaxSkills(leaderId).forEach(function(skillId) {
			this.learnSkill(skillId);
		}, this);
	};

	Game_Actor.prototype.forgetBestFriendSkill = function(leaderId) {
		if(!this.isAfsFriend()) return;
		this.afsMaxSkills(leaderId).forEach(function(skillId) {
			this.forgetSkill(skillId);
		}, this);
	};

	// Plugin Command <AFS Level Up Friend x Leader y>
	Game_Actor.prototype.autoAfsLevelUp = function(leaderId) {
		if(!this.isAfsFriend()) return;
		if(!$gameActors.actor(leaderId).isAfsLeader()) return;
		if(this.isAfsLock(leaderId)) return; // FP Lock effect.
		if($gameActors.actor(leaderId).isAfsGlobalCap()) {
			var levelCap = $gameActors.actor(leaderId).afsGlobalCap();
			if(this.afsLevel(leaderId) === levelCap) return;
		}

		this.afsLevelUp(leaderId);
		this._afsExp[leaderId] = this.afsNeedForLevel(this.afsLevel(leaderId));
	};

	// Plugin Command <AFS Level Down Friend x Leader y>
	Game_Actor.prototype.autoAfsLevelDown = function(leaderId) {
		if(!this.isAfsFriend()) return 0;
		if(!$gameActors.actor(leaderId).isAfsLeader()) return;
		if(this.isAfsLock(leaderId)) return; // FP Lock effect.

		if(Moogle_X.AFS.canLevelDown) {
			this.afsLevelDown(leaderId);
			this._afsExp[leaderId] = this.afsNeedForLevel(this.afsLevel(leaderId) - 1);
		}
	};

	Game_Actor.prototype.gainAfs = function(exp, leaderId) {
		if(!this.isAfsFriend()) return;
		if(!$gameActors.actor(leaderId).isAfsLeader()) return;
		if(this.isAfsLock(leaderId)) return; // FP Lock effect.

		var newExp = this.afsExp(leaderId) + Math.round(exp);
		if(!Moogle_X.AFS.allowNegLevel) {
			newExp = Math.max(newExp, 0);
		}

		// Global Level Cap Effect part.
		if($gameActors.actor(leaderId).isAfsGlobalCap()) {
			var levelCap = $gameActors.actor(leaderId).afsGlobalCap();
			if(this.afsLevel(leaderId) === levelCap) {
				return;
			} else if(this.afsLevel(leaderId) < levelCap) {
				newExp = Math.min(newExp, this.afsNeedForLevel(levelCap));
			}
		}

		this._afsExp[leaderId] = Math.min(newExp || 0, this.afsNeedForLevel(this._afsMaxLevel));
		while(!this.isMaxAfsLevel(leaderId) && this.afsExp(leaderId) >=
			this.nextAfsLevelExp(leaderId)) {
			this.afsLevelUp(leaderId);
		}
		this.refresh();
	};

	Game_Actor.prototype.loseAfs = function(exp, leaderId) {
		if(!this.isAfsFriend()) return;
		if(!$gameActors.actor(leaderId).isAfsLeader()) return;
		if(this.isAfsLock(leaderId)) return; // FP Lock effect.

		var newExp = this.afsExp(leaderId) - Math.round(exp);
		if(Moogle_X.AFS.canLevelDown) {
			if(!Moogle_X.AFS.allowNegLevel) {
				newExp = Math.max(newExp, 0);
			}
			this._afsExp[leaderId] = newExp;
		} else {
			this._afsExp[leaderId] = Math.max(newExp,
				this.afsNeedForLevel(this.afsLevel(leaderId)));
		}

		while(!this.isMinAfsLevel(leaderId) && this.afsExp(leaderId) <=
			this.afsNeedForLevel(this.afsLevel(leaderId)) && Moogle_X.AFS.canLevelDown) {
			this.afsLevelDown(leaderId);
		}
	};

	Game_Actor.prototype.nextAfsLevelExp = function(leaderId) {
		if(!this.isAfsFriend()) return 0;
		return this.afsNeedForLevel(this.afsLevel(leaderId) + 1);
	};

	Game_Actor.prototype.afsNeedForLevel = function(level) {
		if(!this.isAfsFriend()) return 0;
		var level = level;
		if(level > this._afsMaxLevel) {
			level = this._afsMaxLevel; // Safety measure. Just in case.
		}
		if(level < -this._afsMaxLevel) {
			level = -this._afsMaxLevel; // Safety measure. Just in case.
		}
		var expChart = this.afsExpChart();
		var totalFp = 0;
		for(var i = 0; i < Math.abs(level); i++) {
			totalFp += expChart[i];
		}
		return totalFp * Math.sign(level);
	};

	Game_Actor.prototype.nextRequiredAfs = function(leaderId) {
		return this.nextAfsLevelExp(leaderId) - this.afsExp(leaderId);
	};

	Game_Actor.prototype.afsRate = function(leaderId) {
		if(!this.isAfsFriend()) return 0;
		if(this.isMaxAfsLevel(leaderId)) {
			return 1;
		}
		if(this.isMinAfsLevel(leaderId)) {
			return -1;
		}
		var exp = this.afsExp(leaderId);
		var level = this.afsLevel(leaderId);
		var expBefore = this.afsNeedForLevel(level);
		var range = this.afsExpChart()[Math.abs(level)];
		if(level != 0) range *= Math.sign(level);
		return (exp - expBefore) / range;
	}

	Game_Actor.prototype.afsShowFriendship = function(friendId) {
		if(!this.isAfsLeader()) return;
		if(!$gameActors.actor(friendId).isAfsFriend()) return 0;
		if(!this._afsFriendList.contains(friendId)) {
			// Show this actor in Scene_ActorsFriendship.
			this._afsFriendList.push(friendId);
			this._afsFriendList.sort(function(a, b) {
				return a - b;
			});
		}
	};

	Game_Actor.prototype.afsHideFriendship = function(friendId) {
		if(!this.isAfsLeader()) return;
		if(!$gameActors.actor(friendId).isAfsFriend()) return 0;
		var index = this._afsFriendList.indexOf(friendId);
		if(index >= 0) {
			// Hide this actor in Scene_ActorsFriendship.
			this._afsFriendList.splice(index, 1);
		}
	};

	Game_Actor.prototype.afsIcons = function(level, leaderId) {
		if(!this.isAfsFriend()) return [];
		return this.actor().afsIcons[leaderId][level];
	};

	Game_Actor.prototype.afsLockIcon = function() {
		if(!this.isAfsFriend()) return 0;
		return this.actor().afsLockIcon;
	};

	Game_Actor.prototype.afsCustomFpIcon = function(leaderId) {
		if(!this.isAfsFriend()) return 0;
		return this._afsCustomFpIcon[leaderId] || 0;
	};

	Game_Actor.prototype.afsCustomLeaderIcon = function() {
		if(!this.isAfsLeader()) return 0;
		return this._afsCustomLeaderIcon;
	};

	Game_Actor.prototype.changeAfsCustomLeaderIcon = function(icon) {
		this._afsCustomLeaderIcon = icon;
	};

	Game_Actor.prototype.removeAfsCustomLeaderIcon = function() {
		this._afsCustomLeaderIcon = 0;
	};

	Game_Actor.prototype.changeAfsCustomFpIcon = function(leaderId, icon) {
		if(!this.isAfsFriend()) return;
		this._afsCustomFpIcon[leaderId] = icon;
	};

	Game_Actor.prototype.removeAfsCustomFpIcon = function(leaderId) {
		if(!this.isAfsFriend()) return;
		this._afsCustomFpIcon[leaderId] = 0;
	};

	Game_Actor.prototype.afsGetBestFp = function() {
		if(!this.isAfsLeader()) return 0;
		var friendList = this._afsFriendList;
		if(friendList.length > 0) {
			var fpList = friendList.map(function(friendId) {
				return $gameActors.actor(friendId).afsExp(this.actorId());
			}, this);
			var bestFp = Math.max.apply(null, fpList);
			return bestFp;
		}
		return 0;
	};

	Game_Actor.prototype.afsGetBestLevel = function() {
		if(!this.isAfsLeader()) return 0;
		var friendList = this._afsFriendList;
		if(friendList.length > 0) {
			var levelList = friendList.map(function(friendId) {
				return $gameActors.actor(friendId).afsLevel(this.actorId());
			}, this);
			var bestLevel = Math.max.apply(null, levelList);
			return bestLevel;
		}
		return 0;
	};

	Game_Actor.prototype.afsGetBestFpFriend = function() {
		if(!this.isAfsLeader()) return 0;
		var friendList = this._afsFriendList;
		if(friendList.length > 0) {
			var fpList = friendList.map(function(friendId) {
				return $gameActors.actor(friendId).afsExp(this.actorId());
			}, this);
			var bestFp = Math.max.apply(null, fpList);
			var index = fpList.indexOf(bestFp);
			if(index >= 0) {
				return friendList[index];
			}
		}
		return 0;
	};

	Game_Actor.prototype.afsGetBestLevelFriend = function() {
		if(!this.isAfsLeader()) return 0;
		var friendList = this._afsFriendList;
		if(friendList.length > 0) {
			var levelList = friendList.map(function(friendId) {
				return $gameActors.actor(friendId).afsLevel(this.actorId());
			}, this);
			var bestLevel = Math.max.apply(null, levelList);
			var index = levelList.indexOf(bestLevel);
			if(index >= 0) {
				return friendList[index];
			}
		}
		return 0;
	};

	// Friendship Commont Event feature.
	Game_Actor.prototype.afsRunCommonEvent = function(leaderId, level) {
		if(!this.isAfsFriend()) return;
		if(this.actor().afsCommonEvents[leaderId]) {
			if(this.actor().afsCommonEvents[leaderId][level]) {
				$gameTemp.afsReserveCommonEvent(this.actor().afsCommonEvents[leaderId][level]);
			}
		}
	};

	//=============================================================================
	// Game_Action
	//=============================================================================

	Game_Action.prototype.getAfsValue = function(target) {
		var fpTotal = 0;

		if(target.isActor() && target.isAfsFriend()) {
			var actorId = target.actorId();
			if(this.item().afsGain[actorId]) {
				fpTotal += this.item().afsGain[actorId];
			} else if(this.item().afsGain["default"]) {
				fpTotal += this.item().afsGain["default"];
			}
		}

		return fpTotal;
	};

	Moogle_X.AFS.Game_Action_applyItemUserEffect =
		Game_Action.prototype.applyItemUserEffect;
	Game_Action.prototype.applyItemUserEffect = function(target) {
		Moogle_X.AFS.Game_Action_applyItemUserEffect.call(this, target);
		this.preApplyAfsGain(target);
	};

	Game_Action.prototype.preApplyAfsGain = function(target) {
		if(!this.subject().isAfsLeader() || !target.isActor() || !target.isAfsFriend()) return;

		// In battle scenario...
		if($gameParty.inBattle()) {
			this.applyAfsGain(target);

			// On map scenario...
		} else {
			// Using item...
			if(this.isItem() && Moogle_X.AFS.onMapItemFpGain) {
				// Nothing. Because of multiple leaders, this part is no
				// longer functional. Bye bye!
				var fp = this.getAfsValue(target);
				if (fp > 0) {
					target.gainAfs(fp, Moogle_X.AFS.singleLeaderIdOnMap);
				} else if (fp < 0) {
					target.loseAfs(fp * -1, Moogle_X.AFS.singleLeaderIdOnMap);
				}

				// Using skill...
			} else if(this.isSkill()) {
				this.applyAfsGain(target);
			}
		}
	};

	Game_Action.prototype.applyAfsGain = function(target) {
		if(target.isActor() && target.isAfsFriend()) {
			var fp = this.getAfsValue(target);
			if(fp > 0) {
				target.gainAfs(fp, this.subject().actorId());
			} else if(fp < 0) {
				target.loseAfs(fp * -1, this.subject().actorId());
			}
		}
	};

	//=============================================================================
	// Game_Party
	//=============================================================================

	Game_Party.prototype.getBattleAfsLeaders = function() {
		var array = [];
		this.battleMembers().forEach(function(actor) {
			if(actor.isAfsLeader()) {
				array.push(actor);
			}
		});
		return array;
	};

	//=============================================================================
	// BattleManager
	//=============================================================================

	Moogle_X.AFS.BattleManager_endBattle = BattleManager.endBattle;
	BattleManager.endBattle = function(result) {
		if(Moogle_X.AFS.battleFp > 0 && result > 0) {
			var list = $gameParty.getBattleAfsLeaders();
			if (list.length > 0) {
				$gameParty.battleMembers().forEach(function(actor) {
					if(!actor.isAfsFriend()) return;
					for (var i = 0; i < list.length; i++) {
						let fp = Math.floor(Moogle_X.AFS.battleFp * Moogle_X.AFS.battleLossMult);
						if(fp > 0) {
							actor.gainAfs(fp, list[i].actorId());
						} else if(fp < 0) {
							actor.loseAfs(-fp, list[i].actorId());
						}
					}
				}, this);
			}
		}
		Moogle_X.AFS.BattleManager_endBattle.call(this, result);
	};

	Moogle_X.AFS.BattleManager_makeRewards = BattleManager.makeRewards;
	BattleManager.makeRewards = function() {
		Moogle_X.AFS.BattleManager_makeRewards.call(this);
		var list = $gameParty.getBattleAfsLeaders();
		if(list.length > 0) {
			$gameParty.battleMembers().forEach(function(actor) {
				if(!actor.isAfsFriend()) return;
				for(var i = 0; i < list.length; i++) {
					actor.gainAfs(Moogle_X.AFS.battleFp, list[i].actorId());
				}
			}, this);
		}
	};

})(); // IIFE

//=============================================================================
// Scene_ActorsFriendship
//=============================================================================

function Scene_ActorsFriendship() {
	this.initialize.apply(this, arguments);
}

Scene_ActorsFriendship.prototype =
	Object.create(Scene_MenuBase.prototype);
Scene_ActorsFriendship.prototype.constructor = Scene_ActorsFriendship;

Scene_ActorsFriendship.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ActorsFriendship.prototype.start = function() {
	Scene_MenuBase.prototype.start.call(this);
	this._afsLeaderWindow.refresh();
	this._friendListWindow.refresh();
};

Scene_ActorsFriendship.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.reserveLeaderImages();
	this.reserveFriendImages();
	this.createHelpWindow();
	this.createAllAfsWindows();
};

Scene_ActorsFriendship.prototype.createAllAfsWindows = function() {
	this.createLeaderWindow();
	if(Moogle_X.AFS.singleLeaderScene) {
		this.createSingleFriendListWindow();
	} else { // Multiple Leaders version.
		this.createFriendListWindow();
	}
};

Scene_ActorsFriendship.prototype.reserveLeaderImages = function() {
	if(Moogle_X.AFS.singleLeaderScene) return;
	for(var i = 0; i < $gameActors._data.length; i++) {
		var actor = $gameActors._data[i];
		if(actor && actor.isAfsLeaderVisible()) {
			ImageManager.reserveCharacter(actor.characterName());
		}
	}
};

Scene_ActorsFriendship.prototype.reserveFriendImages = function() {
	for(var i = 0; i < $gameActors._data.length; i++) {
		var actor = $gameActors._data[i];
		if(actor && actor.isAfsLeaderVisible()) {
			for(let j = 0; j < actor._afsFriendList; j++) {
				let friend = $gameActors.actor(actor._afsFriendList[j]);
				ImageManager.reserveFace(friend.faceName());
			}
			if(Moogle_X.AFS.singleLeaderScene) return;
		}
	}
};

Scene_ActorsFriendship.prototype.update = function() {
	Scene_MenuBase.prototype.update.call(this);
};

Scene_ActorsFriendship.prototype.createHelpWindow = function() {
	Scene_MenuBase.prototype.createHelpWindow.call(this);
	this._helpWindow.setText(Moogle_X.AFS.helpText);
};

Scene_ActorsFriendship.prototype.createLeaderWindow = function() {
	var wy = this._helpWindow.height;
	var ww = 240;
	var wh = Graphics.boxHeight - wy;
	this._afsLeaderWindow = new Window_FriendshipLeaders(0, wy, ww, wh);
	this._afsLeaderWindow.setHandler('ok', this.onAfsSlotOk.bind(this));
	this._afsLeaderWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._afsLeaderWindow);
};

Scene_ActorsFriendship.prototype.createFriendListWindow = function() {
	var wx = this._afsLeaderWindow.width;
	var wy = this._helpWindow.height;
	var ww = Graphics.boxWidth - wx;
	var wh = Graphics.boxHeight - wy;
	this._friendListWindow = new Window_ActorsFriendship(wx, wy, ww, wh);
	this._friendListWindow.setHandler('cancel', this.onAfsFriendCancel.bind(this));
	this._friendListWindow.setHandler('ok', this.onAfsFriendSelect.bind(this));
	this._afsLeaderWindow.setFriendListWindow(this._friendListWindow);
	this.addWindow(this._friendListWindow);
	this._afsLeaderWindow.activate();
	this._afsLeaderWindow.select(0);
};

Scene_ActorsFriendship.prototype.createSingleFriendListWindow = function() {
	var wy = this._helpWindow.height;
	var ww = Graphics.boxWidth;
	var wh = Graphics.boxHeight - wy;
	this._friendListWindow = new Window_ActorsFriendship(0, wy, ww, wh);
	this._friendListWindow.setHandler('cancel', this.popScene.bind(this));
	this._friendListWindow.setHandler('ok', this.onAfsFriendSelect.bind(this));
	this._afsLeaderWindow.setFriendListWindow(this._friendListWindow);
	this.addWindow(this._friendListWindow);
	this._afsLeaderWindow.hide();
	this._afsLeaderWindow.select(0);
	this._friendListWindow.activate();
	this._friendListWindow.select(0);
};

Scene_ActorsFriendship.prototype.onAfsSlotOk = function() {
	if(this._afsLeaderWindow.item() !== 0) {
		this._friendListWindow.activate();
		this._friendListWindow.select(0);
	} else {
		SoundManager.playCancel();
		this.popScene();
	}
};

Scene_ActorsFriendship.prototype.onAfsFriendCancel = function() {
	this._afsLeaderWindow.activate();
	this._friendListWindow.deselect();
};

Scene_ActorsFriendship.prototype.onAfsFriendSelect = function() {
	var actor = this._friendListWindow.item().actorId();
	eval(Moogle_X.AFS.onSelect);
	this._friendListWindow.activate();
};

//=============================================================================
// Window_FriendshipLeaders
//=============================================================================

function Window_FriendshipLeaders() {
	this.initialize.apply(this, arguments);
}

Window_FriendshipLeaders.prototype = Object.create(Window_Selectable.prototype);
Window_FriendshipLeaders.prototype.constructor = Window_FriendshipLeaders;

Window_FriendshipLeaders.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._actor = null;
	this.refresh();
};

Window_FriendshipLeaders.prototype.setFriendListWindow = function(friendWindow) {
	this._friendListWindow = friendWindow;
	this.update();
};

Window_FriendshipLeaders.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	this._friendListWindow.setLeader(this.item());
};

Window_FriendshipLeaders.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};

Window_FriendshipLeaders.prototype.refresh = function() {
	this.makeItemList();
	this.createContents();
	this.drawAllItems();
};

Window_FriendshipLeaders.prototype.item = function() {
	return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_FriendshipLeaders.prototype.makeItemList = function() {
	var list = [], first;
	for(var n = 1; n < $gameActors._data.length; n++) {
		var actor = $gameActors._data[n];
		if(actor && actor.isAfsLeaderVisible()) {
			list.push(actor);
		}
		if(actor && actor.isAfsLeader() && !first)
			first = actor;
	}

	this._data = [];

	if(Moogle_X.AFS.singleLeaderScene) {
		this._data.push(list[0] || first);

	} else {
		this._data = list;
		if(Moogle_X.AFS.showBackButton) {
			this._data.push(0);
		}
	}
};

Window_FriendshipLeaders.prototype.drawItem = function(index) {
	this.clearItem(index);
	var rect = this.itemRect(index);
	var wx = Window_Base._iconWidth / 2 + this.textPadding() / 2;
	var wy = rect.y + rect.height + 16;
	this.changePaintOpacity(true);
	var headWidth = $gameMap.tileWidth();
	if(this._data[index] !== 0) {
		var actor = this._data[index];
		this.drawActorCharacter(actor, wx, wy);
		this.changeTextColor(this.textColor(Moogle_X.AFS.leaderNameColor));
		this.drawText(actor.name(), rect.x + headWidth, rect.y, rect.width - headWidth);
		this.drawIcon(actor.afsCustomLeaderIcon(), rect.width - 34, rect.y + 2);
	} else {
		this.drawIcon(Moogle_X.AFS.backIcon, rect.x + 2, rect.y + 2);
		this.changeTextColor(this.textColor(Moogle_X.AFS.backTextColor));
		this.drawText(Moogle_X.AFS.backText, rect.x + headWidth, rect.y, rect.width - headWidth);
	}
	this.resetTextColor();
};

Window_FriendshipLeaders.prototype.drawActorCharacter = function(actor, x, y) {
	var characterName = actor.characterName(), characterIndex = actor.characterIndex()
	var bitmap = ImageManager.loadCharacter(characterName);
	var big = ImageManager.isBigCharacter(characterName);
	var pw = bitmap.width / (big ? 3 : 12);
	var ph = bitmap.height / (big ? 4 : 8);
	var n = characterIndex;
	var sx = (n % 4 * 3 + 1) * pw;
	var sy = (Math.floor(n / 4) * 4) * ph;
	this.contents.blt(bitmap, sx, sy, pw, 32, x - pw / 2, y - pw, pw, 32);
};

//=============================================================================
// Window_ActorsFriendship
//=============================================================================

function Window_ActorsFriendship() {
	this.initialize.apply(this, arguments);
}

Window_ActorsFriendship.prototype = Object.create(Window_Selectable.prototype);
Window_ActorsFriendship.prototype.constructor = Window_ActorsFriendship;

Window_ActorsFriendship.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._leader = null;
};

Window_ActorsFriendship.prototype.setLeader = function(leader) {
	if(this._leader !== leader) { // Shaz's fix for memory leak.
		this._leader = leader;
		this.refresh();
	}
};

Window_ActorsFriendship.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};

Window_ActorsFriendship.prototype.itemHeight = function() {
	var clientHeight = this.height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
};

Window_ActorsFriendship.prototype.numVisibleRows = function() {
	return Moogle_X.AFS.maxRows;
};

Window_ActorsFriendship.prototype.maxCols = function() {
	return Moogle_X.AFS.maxCols;
};

Window_ActorsFriendship.prototype.refresh = function() {
	this.makeItemList();
	this.createContents();
	this.drawAllItems();
};

Window_ActorsFriendship.prototype.makeItemList = function() {
	this._data = [];
	if(this._leader) {
		this._data = this._leader._afsFriendList.map(function(id) {
			return $gameActors.actor(id);
		});
	}
};

Window_ActorsFriendship.prototype.item = function() {
	return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_ActorsFriendship.prototype.drawItem = function(index) {
	if(this._leader) {
		this.drawItemImage(index);
		this.drawFriendName(index);
		this.drawFriendshipLevel(index);
		this.drawFriendshipGauge(index);
		this.drawCurrentFp(index);
		this.drawNextLevel(index);
		this.drawAfsIcons(index);
		this.drawFpLock(index);
		this.drawCustomFpIcon(index);
	}
};

Window_ActorsFriendship.prototype.drawItemImage = function(index) {
	if(!Moogle_X.AFS.showFace) return;
	var rect = this.itemRect(index);
	this.drawActorFace(this._data[index], rect.x + 1 + Moogle_X.AFS.faceOffsetX,
		rect.y + 1 + Moogle_X.AFS.faceOffsetY, 144, rect.height - 2);
	this.changePaintOpacity(true);
};

Window_ActorsFriendship.prototype.drawFriendName = function(index) {
	if(!Moogle_X.AFS.showName) return;
	var rect = this.itemRect(index);
	var wx = rect.x + 162 + Moogle_X.AFS.friendNameOffsetX;
	var wy = rect.y + Moogle_X.AFS.friendNameOffsetY;
	var width = Moogle_X.AFS.friendNameWidth || 168;
	var alignment = Moogle_X.AFS.friendNameAlignment;
	this.changePaintOpacity(true);
	this.changeTextColor(this.textColor(Moogle_X.AFS.friendNameColor));
	this.drawText(this._data[index].name(), wx, wy, width, alignment);
	this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawFriendshipLevel = function(index) {
	var baseOffset = 300;
	if(Moogle_X.AFS.showLevelText) {
		var rect = this.itemRect(index);
		var wx = rect.x + baseOffset + Moogle_X.AFS.fpLvlTextOffsetX;
		var wy = rect.y + Moogle_X.AFS.fpLvlTextOffsetY;
		var width = Moogle_X.AFS.fpLvlTextWidth || 200;
		var alignment = Moogle_X.AFS.fpLvlTextAlignment;
		var text = Moogle_X.AFS.fpLvlText;
		this.changePaintOpacity(true);
		this.changeTextColor(this.textColor(Moogle_X.AFS.fpLvlTextColor));
		this.drawText(text, wx, wy, width, alignment);
		this.resetTextColor();
	}
	if(Moogle_X.AFS.showLevelNumber) {
		var rect = this.itemRect(index);
		var wx = rect.x + baseOffset + Moogle_X.AFS.fpLvlNumberOffsetX;
		var wy = rect.y + Moogle_X.AFS.fpLvlNumberOffsetY;
		var width = Moogle_X.AFS.fpLvlNumberWidth || 40;
		var alignment = Moogle_X.AFS.fpLvlNumberAlignment;
		var text = this._data[index].afsLevel(this._leader.actorId());
		this.changePaintOpacity(true);
		this.changeTextColor(this.textColor(Moogle_X.AFS.fpLvlNumberColor));
		this.drawText(text, wx, wy, width, alignment);
		this.resetTextColor();
	}
};

Window_ActorsFriendship.prototype.drawFriendshipGauge = function(index) {
	if(!Moogle_X.AFS.showGauge) return;
	var rect = this.itemRect(index);
	var wx = rect.x + 162 + Moogle_X.AFS.fpGaugeOffsetX;
	var wy = rect.y + 55 + Moogle_X.AFS.fpGaugeOffsetY;
	var width = Moogle_X.AFS.fpGaugeWidth || 382;
	var rate = this._data[index].afsRate(this._leader.actorId());
	var color1 = rate >= 0 ? this.textColor(Moogle_X.AFS.fpGaugeColor1) : this.textColor(Moogle_X.AFS.fpNegGaugeColor1);
	var color2 = rate >= 0 ? this.textColor(Moogle_X.AFS.fpGaugeColor2) : this.textColor(Moogle_X.AFS.fpNegGaugeColor2);
	this.drawGauge(wx, wy, width, rate, color1, color2);
};

Window_ActorsFriendship.prototype.drawCurrentFp = function(index) {
	var baseOffset = 600;
	if(Moogle_X.AFS.showCurrentFpText) {
		var rect = this.itemRect(index);
		var wx = rect.x + baseOffset + Moogle_X.AFS.currentFpTextOffsetX;
		var wy = rect.y + Moogle_X.AFS.currentFpTextOffsetY;
		var width = Moogle_X.AFS.currentFpTextWidth || 200;
		var alignment = Moogle_X.AFS.currentFpTextAlignment;
		var text = Moogle_X.AFS.currentFpText;
		this.changePaintOpacity(true);
		this.changeTextColor(this.textColor(Moogle_X.AFS.currentFpTextColor));
		this.drawText(text, wx, wy, width, alignment);
		this.resetTextColor();
	}
	if(Moogle_X.AFS.showCurrentFpNumber) {
		var rect = this.itemRect(index);
		var wx = rect.x + baseOffset + Moogle_X.AFS.currentFpNumberOffsetX;
		var wy = rect.y + this.lineHeight() + Moogle_X.AFS.currentFpNumberOffsetY;
		var width = Moogle_X.AFS.currentFpNumberWidth || 200;
		var alignment = Moogle_X.AFS.currentFpNumberAlignment;
		var text = this._data[index].afsExp(this._leader.actorId());
		this.changePaintOpacity(true);
		this.changeTextColor(this.textColor(Moogle_X.AFS.currentFpNumberColor));
		this.drawText(text, wx, wy, width, alignment);
		this.resetTextColor();
	}
};

Window_ActorsFriendship.prototype.drawNextLevel = function(index) {
	var baseOffset = 600;
	if(Moogle_X.AFS.showNextLevelText) {
		var rect = this.itemRect(index);
		var wx = rect.x + baseOffset + Moogle_X.AFS.nextLevelTextOffsetX;
		var wy = rect.y + this.lineHeight() * 2 + Moogle_X.AFS.nextLevelTextOffsetY;
		var width = Moogle_X.AFS.nextLevelTextWidth || 200;
		var alignment = Moogle_X.AFS.nextLevelTextAlignment;
		var text = Moogle_X.AFS.nextLevelText;
		this.changePaintOpacity(true);
		this.changeTextColor(this.textColor(Moogle_X.AFS.nextLevelTextColor));
		this.drawText(text, wx, wy, width, alignment);
		this.resetTextColor();
	}
	if(Moogle_X.AFS.showNextLevelNumber) {
		var rect = this.itemRect(index);
		var wx = rect.x + baseOffset + Moogle_X.AFS.nextLevelNumberOffsetX;
		var wy = rect.y + 96 + Moogle_X.AFS.nextLevelNumberOffsetY;
		var width = Moogle_X.AFS.nextLevelNumberWidth || 200;
		var alignment = Moogle_X.AFS.nextLevelNumberAlignment;
		if(this._data[index].isMaxAfsLevel(this._leader.actorId())) {
			var text = "---";
		} else {
			var text = this._data[index].nextRequiredAfs(this._leader.actorId());
		}
		this.changePaintOpacity(true);
		this.changeTextColor(this.textColor(Moogle_X.AFS.nextLevelNumberColor));
		this.drawText(text, wx, wy, width, alignment);
		this.resetTextColor();
	}
};

Window_ActorsFriendship.prototype.drawAfsIcons = function(index) {
	var leaderId = this._leader.actorId();
	var actor = this._data[index];
	var level = actor.afsLevel(leaderId);
	if(actor.afsIcons(level, leaderId)) {
		var rect = this.itemRect(index);
		var wx = rect.x + 162 + Moogle_X.AFS.fpIconsOffsetX;
		var wy = rect.y + this.lineHeight() + Moogle_X.AFS.fpIconsOffsetY;
		var icons = actor.afsIcons(level, leaderId);
		for(var i = 0; i < icons.length; i++) {
			this.drawIcon(icons[i], wx + 32 * i, wy);
		}
	}
};

Window_ActorsFriendship.prototype.drawFpLock = function(index) {
	var leaderId = this._leader.actorId();
	var actor = this._data[index];
	if(actor.isAfsLock(leaderId)) {
		var rect = this.itemRect(index);
		var wx = rect.x + 262 + Moogle_X.AFS.fpLockOffsetX;
		var wy = rect.y + Moogle_X.AFS.fpLockOffsetY;
		var icon = actor.afsLockIcon();
		this.drawIcon(icon, wx, wy);
	}
};

Window_ActorsFriendship.prototype.drawCustomFpIcon = function(index) {
	var leaderId = this._leader.actorId();
	var actor = this._data[index];
	if(actor.afsCustomFpIcon(leaderId) !== 0) {
		var rect = this.itemRect(index);
		var wx = rect.x + 512 + Moogle_X.AFS.customFpIconOffsetX;
		var wy = rect.y + 34 + Moogle_X.AFS.customFpIconOffsetY;
		var icon = actor.afsCustomFpIcon(leaderId);
		this.drawIcon(icon, wx, wy);
	}
};

Window_ActorsFriendship.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
	if(Moogle_X.AFS.usePrettyGauges) {
		Window_Base.prototype.drawGauge.call(this, x, y, width, rate, color1, color2);
	} else {
		var fillW = Math.floor(width * rate);
		var gaugeY = y + this.lineHeight() - 8;
		this.contents.fillRect(x, gaugeY, width, Moogle_X.AFS.fpGaugeHeight, this.gaugeBackColor());
		if(rate < 0) x += width;
		this.contents.gradientFillRect(x, gaugeY, fillW,
			Moogle_X.AFS.fpGaugeHeight, color1, color2);
	}
};

Window_ActorsFriendship.prototype.lineHeight = function() {
	return Window_Selectable.prototype.lineHeight.call(this) - 2;
};

//=============================================================================
// Scene_Menu
//=============================================================================

Moogle_X.AFS.Scene_Menu_createCommandWindow =
	Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	Moogle_X.AFS.Scene_Menu_createCommandWindow.call(this);
	if(Moogle_X.AFS.shouldShowFpMenu()) {
		this._commandWindow.setHandler('friendship', this.commandFriendship.bind(this));
	}
};

Scene_Menu.prototype.commandFriendship = function() {
	SceneManager.push(Scene_ActorsFriendship);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Moogle_X.AFS.Window_MenuCommand_addOriginalCommands =
	Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	Moogle_X.AFS.Window_MenuCommand_addOriginalCommands.call(this);
	if(Moogle_X.AFS.shouldShowFpMenu()) {
		this.addCommand(Moogle_X.AFS.fpTitle, 'friendship', Moogle_X.AFS.shouldEnableFpMenu());
	}
};

(function() { // IIFE

	//=============================================================================
	// Game_Interpreter
	//=============================================================================

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if(command.toUpperCase() === 'AFS') {
			args = args.map(s => s.toUpperCase());
			switch(args[0]) {
				case 'OPEN':
					SceneManager.push(Scene_ActorsFriendship);
					break;
				case 'SET':
					if(args[1] === "MODE" && args[2] === "SINGLE" && args[3] === "LEADER") {
						Moogle_X.AFS.singleLeaderScene = true;
					} else if(args[1] === "MODE" && args[2] === "MULTIPLE" && args[3] === "LEADERS") {
						Moogle_X.AFS.singleLeaderScene = false;
					}
				case 'SHOW':
					if(args[1] === "LEADER" && Number(args[2])) {
						$gameActors.actor(Number(args[2])).afsShowLeader();
					} else if(args[1] === "FRIEND" && Number(args[2]) && args[3] === "LEADER" && Number(args[4])) {
						$gameActors.actor(Number(args[4])).afsShowFriendship(Number(args[2]));
					}
					break;
				case 'HIDE':
					if(args[1] === "LEADER" && Number(args[2])) {
						$gameActors.actor(Number(args[2])).afsHideLeader();
					} else if(args[1] === "FRIEND" && Number(args[2]) && args[3] === "LEADER" && Number(args[4])) {
						$gameActors.actor(Number(args[4])).afsHideFriendship(Number(args[2]));
					}
					break;
				case 'GAIN':
					if(Number(args[1]) && args[2] === "FRIEND" && Number(args[3]) && args[4] === "LEADER" && Number(args[5])) {
						$gameActors.actor(Number(args[3])).gainAfs(Number(args[1]), Number(args[5]));
					}
					break;
				case 'LOSE':
					if(Number(args[1]) && args[2] === "FRIEND" && Number(args[3]) && args[4] === "LEADER" && Number(args[5])) {
						$gameActors.actor(Number(args[3])).loseAfs(Number(args[1]), Number(args[5]));
					}
					break;
				case 'LEVEL':
					if(args[1] === "UP" && args[2] === "FRIEND" && Number(args[3]) && args[4] === "LEADER" && Number(args[5])) {
						$gameActors.actor(Number(args[3])).autoAfsLevelUp(Number(args[5]));
					} else if(args[1] === "DOWN" && args[2] === "FRIEND" && Number(args[3]) && args[4] === "LEADER" && Number(args[5])) {
						$gameActors.actor(Number(args[3])).autoAfsLevelDown(Number(args[5]));
					} else if(args[1] === "SET" && Number(args[2]) && args[3] === "FRIEND" && Number(args[4]) && args[5] === "LEADER" && Number(args[6])) {
						let actor = $gameActors.actor(Number(args[4]));
						let leaderId = Number(args[6]);
						let targetLevel = Number(args[2]), sourceLevel = actor.afsLevel(leaderId);
						while(targetLevel > actor.afsLevel(leaderId)) {
							actor.autoAfsLevelUp(leaderId);
						}
						while(targetLevel < sourceLevel) {
							actor.autoAfsLevelDown(leaderId);
						}
					}
					break;
				case 'LOCK':
					if(args[1] === "FRIEND" && Number(args[2]) && args[3] === "LEADER" && Number(args[4])) {
						$gameActors.actor(Number(args[2])).applyAfsLock(Number(args[4]));
					}
					break;
				case 'UNLOCK':
					if(args[1] === "FRIEND" && Number(args[2]) && args[3] === "LEADER" && Number(args[4])) {
						$gameActors.actor(Number(args[2])).removeAfsLock(Number(args[4]));
					}
					break;
				case 'CAP':
					if(args[1] === "LEADER" && Number(args[2]) && args[3] === "LEVEL" && Number(args[4])) {
						$gameActors.actor(Number(args[2])).applyAfsGlobalCap(Number(args[4]));
					}
					break;
				case 'UNCAP':
					if(args[1] === "LEADER" && Number(args[2])) {
						$gameActors.actor(Number(args[2])).removeAfsGlobalCap();
					}
					break;
				case 'CLI':
					if(Number(args[1]) && args[2] === "LEADER" && Number(args[3])) {
						$gameActors.actor(Number(args[3])).changeAfsCustomLeaderIcon(Number(args[1]));
					} else if(args[1] === "REMOVE" && args[2] === "LEADER" && Number(args[3])) {
						$gameActors.actor(Number(args[3])).removeAfsCustomLeaderIcon();
					}
					break;
				case 'CFI':
					if(Number(args[1]) && args[2] === "FRIEND" && Number(args[3]) && args[4] === "LEADER" && Number(args[5])) {
						$gameActors.actor(Number(args[3])).changeAfsCustomFpIcon(Number(args[5]), Number(args[1]));
					} else if(args[1] === "REMOVE" && args[2] === "FRIEND" && Number(args[3]) && args[4] === "LEADER" && Number(args[5])) {
						$gameActors.actor(Number(args[3])).removeAfsCustomFpIcon(Number(args[5]));
					}
					break;
				case 'VAR':
					if(Number(args[1]) && args[2] === "FP" && args[3] === "FRIEND" && Number(args[4]) && args[5] === "LEADER" && Number(args[6])) {
						var fp = $gameActors.actor(Number(args[4])).afsExp(Number(args[6])) || 0;
						$gameVariables.setValue(Number(args[1]), fp);
					} else if(Number(args[1]) && args[2] === "LEVEL" && args[3] === "FRIEND" && Number(args[4]) && args[5] === "LEADER" && Number(args[6])) {
						var fpLevel = $gameActors.actor(Number(args[4])).afsLevel(Number(args[6])) || 0;
						$gameVariables.setValue(Number(args[1]), fpLevel);
					} else if(Number(args[1]) && args[2] === "BEST" && args[3] === "FP" && args[4] === "LEADER" && Number(args[5])) {
						var bestFp = $gameActors.actor(args[5]).afsGetBestFp();
						$gameVariables.setValue(Number(args[1]), bestFp);
					} else if(Number(args[1]) && args[2] === "BEST" && args[3] === "LEVEL" && args[4] === "LEADER" && Number(args[5])) {
						var bestFpLevel = $gameActors.actor(args[5]).afsGetBestLevel();
						$gameVariables.setValue(Number(args[1]), bestFpLevel);
					} else if(Number(args[1]) && args[2] === "BEST" && args[3] === "FP" && args[4] === "FRIEND" && args[5] === "LEADER") {
						var bestFp = $gameActors.actor(args[6]).afsGetBestFpFriend();
						$gameVariables.setValue(Number(args[1]), bestFp);
					} else if(Number(args[1]) && args[2] === "BEST" && args[3] === "LEVEL" && args[4] === "FRIEND" && args[5] === "LEADER" && Number(args[6])) {
						var bestFpLevel = $gameActors.actor(args[6]).afsGetBestLevelFriend();
						$gameVariables.setValue(Number(args[1]), bestFpLevel);
					}
					break;
			}
		}
	};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
