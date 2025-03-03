﻿using QoudaApp.Domain.Events.Common;
using System.Collections.ObjectModel;

namespace QoudaApp.Domain.Interfaces.Common;

public interface IEntity
{
    Collection<DomainEvent> DomainEvents { get; }
}

public interface IEntity<out TId> : IEntity
{
    TId Id { get; }
}

