RegisterServerEvent("lg-identification:identify")
AddEventHandler("lg-identification:identify", function(identity)
    local src = source
    TriggerClientEvent("lg-identification:identify", -1, identity, GetEntityCoords(GetPlayerPed(src)))
end)

function SetIdentification(source, identity)
    if (source == -1) then return end
    TriggerEvent("lg-identification:set", source, identity)
end

exports("SetIdentification", SetIdentification)

--- Item based
local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateUseableItem("pdbadge", function(source, item)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    TriggerClientEvent("showpdbage", src, item.name)
end)
