using QoudaApp.Domain.Events.Common;
using QoudaApp.Domain.Interfaces.Common;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace QoudaApp.Domain.Entities.Common;

public abstract class BaseEntity<TId>(TId id) : IEntity<TId>
{
    public TId Id { get; protected init; } = id;

    [NotMapped]
    public Collection<DomainEvent> DomainEvents { get; } = [];
    public void QueueDomainEvent(DomainEvent @event)
    {
        if (!DomainEvents.Contains(@event))
            DomainEvents.Add(@event);
    }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? ModifiedDate { get; set; }
}

