#[allow(unaligned_references)]
use anchor_lang::prelude::*;
use std::convert::TryInto;
pub use switchboard_v2::AggregatorAccountData;

declare_id!("5eXF5XFaQSffW8JiCR2T5rPvuHjaMx5rjTvsgYmxQDvr");

#[program]
pub mod lendoor {
    use super::*;

    pub fn gimme_loan(ctx: Context<GimmeLoan>, _params: ReadResultParams) -> Result<()> {
        let aggregator = &ctx.accounts.aggregator;

        msg!(
            "GM and Welcome to LENDOOR Inc. Aggregator: {}",
            aggregator.key()
        );

        let val: f64 = AggregatorAccountData::new(aggregator)?
            .get_result()?
            .try_into()?;

        msg!("Hm, looks like this NFT is worth {}.", val);
        msg!("I'd be prepared to give you a loan of {}!", val / 2.0);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(params: ReadResultParams)]
pub struct GimmeLoan<'info> {
    /// CHECK:
    pub aggregator: AccountInfo<'info>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ReadResultParams {}
