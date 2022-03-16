#[allow(unaligned_references)]
use anchor_lang::prelude::*;
use std::convert::TryInto;
pub use switchboard_v2::AggregatorAccountData;

declare_id!("5eXF5XFaQSffW8JiCR2T5rPvuHjaMx5rjTvsgYmxQDvr");

#[program]
pub mod lendoor {
    use super::*;
    use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;

    pub fn gimme_loan(ctx: Context<GimmeLoan>, _params: ReadResultParams) -> Result<()> {
        let aggregator = &ctx.accounts.aggregator;

        msg!("GM and Welcome to LENDOOR Inc.",);

        let val: f64 = AggregatorAccountData::new(aggregator)?
            .get_result()?
            .try_into()?;

        msg!("Hm, looks like you want a loan against your SMB!");
        msg!("Let's see what the big brains at Tensor are saying re SMB prices...!");
        msg!(
            "They claim the SMB Smart Floor is at {} SOL.",
            val / LAMPORTS_PER_SOL as f64
        );
        msg!(
            "Smart floor is a robust version of normal floor prices, designed specifically \
            for financial use-cases like NFT lending and NFT derivatives. So we can trust it."
        );

        msg!(
            "I'd be prepared to give you a loan at 75% LTV, making it {} SOL!",
            val * 0.75 / LAMPORTS_PER_SOL as f64
        );
        msg!("Whacha say, ser?");

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
